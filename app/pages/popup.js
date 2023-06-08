const modal = require('../layouts/modal.js')
const content = require('../views/content.js')

module.exports = function () {
  return modal(content())
}
