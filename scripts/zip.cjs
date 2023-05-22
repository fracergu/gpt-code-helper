const path = require('path')
const fs = require('fs')
const { zip } = require('zip-a-folder')

const browser = process.argv[2]
if (!['firefox', 'chrome'].includes(browser)) {
  console.error('Please specify a target browser: "firefox" or "chrome".')
  process.exit(1)
}

const buildPath = path.join(__dirname, '../dist')
const outputPath = path.join(__dirname, '../publish')
const outputFileName = path.join(outputPath, `gpt-code-helper-${browser}.zip`)

if (fs.existsSync(outputPath)) {
  fs.rmSync(outputPath, { recursive: true, force: true })
}
fs.mkdirSync(outputPath)

zip(buildPath, outputFileName)
  .then(() => console.log('Extension successfully compressed!'))
  .catch((err) => console.log('Something went wrong during compression...', err))
