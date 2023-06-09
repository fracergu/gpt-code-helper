import allowedMimeTypes from '@constants/allowedMimeTypes'
import { inputTokensStore } from '@store'
import { checkExtensionAndMinimize } from '@utils/minifier'
import { calculateTokens } from '@utils/tokenizer'

export const setupDragAndDrop = () => {
  const textArea = document.getElementById('prompt-textarea') as HTMLTextAreaElement
  const form = document.getElementsByTagName('form')[0]
  const targetArea = form?.parentElement as HTMLDivElement
  const sendbutton = form?.querySelector('button') as HTMLButtonElement

  const { setState: inputTokensSetState } = inputTokensStore

  if (targetArea === null || textArea === null || sendbutton === null) return

  textArea.style.minHeight = '90px'

  const overlay = document.createElement('div')
  overlay.style.position = 'absolute'
  overlay.style.top = '0'
  overlay.style.left = '0'
  overlay.style.width = '100%'
  overlay.style.height = '100%'
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  overlay.style.zIndex = '10'
  overlay.style.display = 'none'
  overlay.id = 'drag-drop-overlay'
  targetArea?.appendChild(overlay)

  const overlayText = document.createElement('p')
  overlayText.style.position = 'absolute'
  overlayText.style.top = '50%'
  overlayText.style.left = '50%'
  overlayText.style.transform = 'translate(-50%, -50%)'
  overlayText.style.color = 'white'
  overlayText.style.fontSize = '2rem'
  overlayText.style.fontWeight = 'bold'
  overlayText.style.textAlign = 'center'
  overlayText.style.userSelect = 'none'
  overlayText.innerText = 'Drag and drop files here'
  overlay.appendChild(overlayText)

  window.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.stopPropagation()
    overlay.style.display = 'block'
  })

  window.addEventListener('dragleave', (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.relatedTarget === null || e.relatedTarget === targetArea) {
      overlay.style.display = 'none'
    }
  })

  window.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()
    overlay.style.display = 'none'
  })

  targetArea?.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer == null) return
    const files = e.dataTransfer.files

    let isFirstIteration = true

    const ignoredFiles: File[] = []
    const allowedFiles: File[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.startsWith('text/') && !allowedMimeTypes.includes(file.type)) {
        ignoredFiles.push(file)
      } else {
        allowedFiles.push(file)
      }
    }

    if (ignoredFiles.length > 0) {
      const ignoredFilesList = ignoredFiles.map((file) => file.name).join('\n')
      alert(`The following files will be ignored as they are not text files:\n${ignoredFilesList}`)
    }

    for (const file of allowedFiles) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        if (typeof e.target?.result === 'string') {
          const minifiedCode = checkExtensionAndMinimize(file.name, e.target.result)
          textArea.value += isFirstIteration ? minifiedCode : '\n' + minifiedCode
          inputTokensSetState({ inputTokens: calculateTokens(textArea.value) })
          isFirstIteration = false
        }
        textArea.value += '\n'
      }
      reader.readAsText(file)
    }

    if (sendbutton.disabled) {
      sendbutton.disabled = false
    }

    setTimeout(() => {
      textArea.scroll({
        top: textArea.scrollHeight,
        behavior: 'smooth',
      })
    }, 50)
    overlay.style.display = 'none'
  })
}
