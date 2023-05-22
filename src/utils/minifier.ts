const nonMinimizableExtensions = [
  '.py',
  '.yaml',
  '.yml',
  '.coffee',
  '.jade',
  '.pug',
  '.haml',
  '.styl',
  '.hs',
]

export function checkExtensionAndMinimize(filename: string, code: string): string {
  const extension = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)

  const prefix = `<file:${filename}>`
  const suffix = `</file:${filename}>`

  // If the extension is not minimizable, we return the code as it is.
  if (nonMinimizableExtensions.includes(`.${extension}`)) {
    return `${prefix}\n${code}\n${suffix}`
  }

  return prefix + minimizeCode(code) + suffix
}

export function minimizeCode(code: string): string {
  // Match strings and single-line comments.
  const regex = /(".*?"|'.*?'|\/\/.*$)/gm

  code = code.replace(regex, (match) => {
    // Only replace comments, not strings.
    if (match.startsWith('//')) {
      return ''
    }
    return match
  })

  // Delete multiline comments.
  code = code.replace(/\/\*[\s\S]*?\*\//gm, '')

  // Delete empty lines.
  code = code.replace(/^\s+|\s+$/gm, '')

  // Delete new lines.
  code = code.replace(/\n/g, '')

  // Delete tabs.
  code = code.replace(/\s+/g, ' ')

  return code
}
