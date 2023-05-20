import { setupDragAndDrop } from '@modules/dragDrop'
import { setupHandlers } from '@modules/handlers'
import { setupUiControls } from '@modules/uiControls'

window.addEventListener('load', () => {
  createObserver(() => {
    setupDragAndDrop()
    setupHandlers()
  }, 'drag-drop-overlay')
  createObserver(() => {
    setupUiControls()
  }, 'gpt-code-helper')
})

const createObserver = (callback: () => void, elementId: string) => {
  const observerOptions = { childList: true, subtree: true }
  const bodyNode = document.querySelector('body') as HTMLBodyElement

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && document.getElementById(elementId) === null) {
        callback()
      }
    }
  })
  observer.observe(bodyNode, observerOptions)
}
