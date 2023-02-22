const layout = require('../layouts/layout.js')
const modal = require('../layouts/modal.js')
const text = require('../views/text.js')

module.exports = async function () {
  return layout(/* HTML */ `
    <h1>Hello</h1>
    <button onclick="openModal(this)" data-modal=".modal" data-href="/modal">
      Open modal with content from server
    </button>
    <button
      onclick="openModal(this)"
      data-modal=".modal"
      data-source=".content"
    >
      Open modal with content from the DOM
    </button>
    <div class="content">${text()}</div>
    <div class="modal"></div>
    <div class="modal-layout">${modal()}</div>
  `)
}
