export const createElementWithStyles = (tag: string, styles: Record<string, string>) => {
  const element = document.createElement(tag)
  Object.assign(element.style, styles)
  return element
}

export const generateCheckbox = (
  id: string,
  text: string,
  checked: boolean,
  onChange: () => void,
) => {
  const div = createElementWithStyles('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  })

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = checked
  checkbox.id = id
  checkbox.style.width = '1rem'
  checkbox.style.height = '1rem'
  checkbox.style.cursor = 'pointer'
  checkbox.style.userSelect = 'none'
  checkbox.addEventListener('change', onChange)

  const label = createElementWithStyles('label', {
    color: 'white',
    fontSize: '14px',
    textAlign: 'center',
    marginLeft: '0.5rem',
    cursor: 'pointer',
  }) as HTMLLabelElement
  label.innerText = text
  label.htmlFor = id

  div.appendChild(checkbox)
  div.appendChild(label)

  return div
}
