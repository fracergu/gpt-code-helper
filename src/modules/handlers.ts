import { checkboxesStore, inputTokensStore } from '@store'
import { minimizeCode } from '@utils/minifier'
import { calculateTokens } from '@utils/tokenizer'

export const setupHandlers = () => {
  const textarea = document.getElementById('prompt-textarea') as HTMLTextAreaElement

  if (textarea === null) return

  const { getState: checkboxesGetState, subscribe: checkboxesSubscribe } = checkboxesStore
  const { disableEnter, minifyOnPaste } = checkboxesGetState()

  const { setState: inputTokensSetState } = inputTokensStore

  const manageListeners = (type: string, flag: boolean, handler: (e: any) => void) => {
    if (flag) {
      textarea.addEventListener(type, handler)
    } else {
      textarea.removeEventListener(type, handler)
    }
  }
  const insertAtCursor = (textarea: HTMLTextAreaElement, text: string) => {
    const cursorPosition = textarea.selectionStart
    const textBeforeCursor = textarea.value.substring(0, cursorPosition)
    const textAfterCursor = textarea.value.substring(cursorPosition, textarea.value.length)

    textarea.value = textBeforeCursor + text + textAfterCursor
    textarea.selectionStart = cursorPosition + text.length
    textarea.selectionEnd = cursorPosition + text.length
    textarea.style.height = 'auto'
  }

  const enterHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()

      insertAtCursor(textarea, '\n')
    }
  }

  const pasteHandler = (e: ClipboardEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.clipboardData == null) return
    const text = e.clipboardData.getData('text/plain')
    const minifiedText = minimizeCode(text)

    insertAtCursor(textarea, minifiedText)
  }

  manageListeners('keydown', disableEnter, enterHandler)
  manageListeners('paste', minifyOnPaste, pasteHandler)

  checkboxesSubscribe(({ disableEnter, minifyOnPaste }) => {
    manageListeners('keydown', disableEnter, enterHandler)
    manageListeners('paste', minifyOnPaste, pasteHandler)
  })

  const keyUpHandler = () => {
    const { value } = textarea
    inputTokensSetState({ inputTokens: calculateTokens(value) })
  }

  textarea.addEventListener('keyup', keyUpHandler)
}
