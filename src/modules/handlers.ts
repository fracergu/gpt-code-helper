import store from '@store'
import { minimizeCode } from '@utils/minifier'
import { calculateTokens } from '@utils/tokenizer'

export const setupHandlers = () => {
  const textarea = document.getElementById('prompt-textarea') as HTMLTextAreaElement

  if (textarea === null) return

  const { getState, subscribe, setState } = store
  const { disableEnter, minifyOnPaste } = getState()

  const manageListeners = (type: string, flag: boolean, handler: (e: any) => void) => {
    if (flag) {
      textarea.addEventListener(type, handler)
    } else {
      textarea.removeEventListener(type, handler)
    }
  }

  const enterHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()

      const cursorPosition = textarea.selectionStart
      const textBeforeCursor = textarea.value.substring(0, cursorPosition)
      const textAfterCursor = textarea.value.substring(cursorPosition, textarea.value.length)

      textarea.value = textBeforeCursor + '\n' + textAfterCursor

      textarea.selectionStart = cursorPosition + 1
      textarea.selectionEnd = cursorPosition + 1

      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const pasteHandler = (e: ClipboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.clipboardData == null) return
    const text = e.clipboardData.getData('text/plain')
    textarea.value += minimizeCode(text)
    textarea.style.height = '1px'
    textarea.selectionStart = textarea.value.length
  }

  manageListeners('keydown', disableEnter, enterHandler)

  manageListeners('paste', minifyOnPaste, pasteHandler)

  subscribe(({ disableEnter }) => {
    manageListeners('keydown', disableEnter, enterHandler)
  })

  subscribe(({ minifyOnPaste }) => {
    manageListeners('paste', minifyOnPaste, pasteHandler)
  })

  const keyUpHandler = () => {
    const { value } = textarea
    setState({ inputTokens: calculateTokens(value) })
  }

  textarea.addEventListener('keyup', keyUpHandler)
}
