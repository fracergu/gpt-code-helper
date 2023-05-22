const fs = require('fs-extra')

const browser = process.argv[2]
if (!['firefox', 'chrome'].includes(browser)) {
  console.error('Please specify a target browser: "firefox" or "chrome".')
  process.exit(1)
}

fs.copySync(`manifests/manifest_${browser}.json`, 'public/manifest.json')
