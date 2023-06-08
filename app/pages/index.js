const layout = require('../layouts/main.js')
const modal = require('../layouts/modal.js')
const content = require('../views/content.js')

module.exports = function () {
  return layout(/* HTML */ `
    <div class="home">
      <h1>Modalis.</h1>
      <p>This is a demo of the modalis library.</p>
      <section>
        <button
          onclick="openModal(this)"
          data-modal=".modal"
          data-href="/popup"
        >
          Open modal with content from server
        </button>
      </section>
      <section>
        <button
          onclick="openModal(this)"
          data-modal=".modal"
          data-source=".content"
        >
          Open modal with content from the DOM
        </button>
      </section>
      <section>
        <button
          onclick="openModal(this)"
          data-modal=".prompt"
          data-href="/inner"
        >
          Open prompt with custom css and layout
        </button>
      </section>
      <br />
      <p>
        <small>Created by <a href="https://eldoy.com">Eldøy Projects</a></small>
      </p>
    </div>
    <div class="content" style="display:none">
      <div>
        <input type="checkbox" />
        ${content()}
      </div>
    </div>
    <div class="modal"></div>
    <div class="prompt"></div>
    <div class="modal-layout">${modal()}</div>
    <script>
      var modal = document.querySelector('.modal')
      modal.addEventListener('click', function (event) {
        if (event.target == modal) {
          closeModal('.modal')
        }
      })
    </script>
  `)
}
