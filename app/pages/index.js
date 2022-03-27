const layout = require('../layouts/layout.js')
const text = require('../views/text.js')

module.exports = async function() {
  return layout(/* html */`
    <h1>Hello</h1>
    <button
      onclick="openDialog(this)"
      data-dialog=".dialog"
      data-href="/dialog"
    >Open dialog</button>
    <section>${text()}</section>
    <div class="dialog"></div>
    <script>
      document.querySelector('button').click()
    </script>
  `)
}
