const modal = require('../layouts/modal.js')
const text = require('../views/text.js')

module.exports = async function () {
  return modal(text())
}
