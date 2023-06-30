module.exports = async function ($) {
  $.page.title = 'Modal demo'

  return /* HTML */ `
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
          Open prompt with custom CSS and layout
        </button>
      </section>
      <br />
      <p>
        <small>Created by <a href="https://eldoy.com">Eldøy Projects</a></small>
      </p>
    </div>
    <div class="content" style="display:none">
      <div>
        <p>
          <input type="checkbox" /> This checkbox stays checked between opens
        </p>
        <p>This content is from the DOM.</p>
      </div>
    </div>
    <div class="modal"></div>
    <div class="prompt"></div>
    <div class="modal-layout">${await $.app.layouts.modal($)}</div>
    <script>
      var modal = document.querySelector('.modal')
      modal.addEventListener('click', function (event) {
        if (event.target == modal) {
          closeModal('.modal')
        }
      })
    </script>
  `
}
