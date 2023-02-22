const sirloin = require('sirloin')
const app = sirloin({ port: 8990, dir: 'app/assets' })
const page = require('./app/pages/index.js')
const popup = require('./app/pages/popup.js')

app.get('/', async function (req, res) {
  res.setHeader('content-type', 'text/html')
  return await page()
})

app.get('/modal', async function (req, res) {
  res.setHeader('content-type', 'text/html')
  return await popup()
})
