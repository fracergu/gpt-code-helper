import store from '@store'
import { createElementWithStyles, generateCheckbox } from '@utils/uiCreator'

export const setupUiControls = () => {
  const { setState, getState, subscribe } = store

  const parentElement = document.querySelector('div.group.relative') as HTMLDivElement
  if (parentElement === null) {
    return
  }

  const container = createElementWithStyles('div', {
    marginBottom: '1rem',
    padding: '0 0.75rem',
    paddingTop: '0.5rem',
  }) as HTMLDivElement
  container.classList.add('border-t', 'border-white/20', 'pt-2', 'mt-2')
  container.id = 'gpt-code-helper'
  parentElement.appendChild(container)

  const title = createElementWithStyles('p', {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '0.5rem',
  }) as HTMLParagraphElement
  title.innerText = 'GPT Code Helper'
  container.appendChild(title)

  const tokenCounter = createElementWithStyles('p', {
    color: 'white',
    fontSize: '14px',
    textAlign: 'left',
  }) as HTMLParagraphElement
  tokenCounter.innerText = `Input tokens: 0`
  container.appendChild(tokenCounter)

  subscribe(({ inputTokens }) => {
    tokenCounter.innerText = `Input tokens: ${inputTokens}`
  })

  const checkboxContainer = createElementWithStyles('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.25rem',
    marginTop: '0.5rem',
  }) as HTMLDivElement
  container.appendChild(checkboxContainer)

  checkboxContainer.appendChild(
    generateCheckbox('minify-on-paste', 'Minify on paste', getState().minifyOnPaste, () => {
      const minifyOnPaste = document.getElementById('minify-on-paste') as HTMLInputElement
      setState({ minifyOnPaste: minifyOnPaste.checked })
    }),
  )

  checkboxContainer.appendChild(
    generateCheckbox('disable-enter', 'Disable Enter for sumbit', getState().disableEnter, () => {
      const disableEnter = document.getElementById('disable-enter') as HTMLInputElement
      setState({ disableEnter: disableEnter.checked })
    }),
  )
}
