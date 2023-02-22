const layout = require('../layouts/layout.js')
const text = require('../views/text.js')

module.exports = async function () {
  return layout(/* html */ `
    <h1>Hello</h1>
    <button
      onclick="openModal(this)"
      data-modal=".modal"
      data-href="/modal"
    >Open modal</button>
    <section>${text()}</section>
    <div class="modal"></div>
    <script>
      // document.querySelector('button').click()
    </script>
  `)
}
