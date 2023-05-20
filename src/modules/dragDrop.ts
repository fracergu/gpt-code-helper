import store from '@store'
import { checkExtensionAndMinimize } from '@utils/minifier'
import { calculateTokens } from '@utils/tokenizer'

export const setupDragAndDrop = () => {
  const textArea = document.getElementById('prompt-textarea') as HTMLTextAreaElement
  const form = document.getElementsByTagName('form')[0]
  const targetArea = form?.parentElement as HTMLDivElement

  const { setState } = store

  if (targetArea === null) return

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

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = async (e) => {
        if (typeof e.target?.result === 'string') {
          const minifiedCode = checkExtensionAndMinimize(file.name, e.target.result)
          textArea.value += isFirstIteration ? minifiedCode : '\n' + minifiedCode
          setState({ inputTokens: calculateTokens(textArea.value) })
          isFirstIteration = false
        }
        if (i === files.length - 1) {
          textArea.value += '\n'
        }
      }
      reader.readAsText(file)
    }

    textArea.style.height = '1px'
    setTimeout(() => {
      textArea.scroll({
        top: textArea.scrollHeight,
        behavior: 'smooth',
      })
    }, 50)
    overlay.style.display = 'none'
  })
}
