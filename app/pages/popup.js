const dialog = require('../layouts/dialog.js')
const text = require('../views/text.js')

module.exports = async function() {
  return dialog(/* html */`
    ${text()}
  `)
}
