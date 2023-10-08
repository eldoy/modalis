const { esc } = require('haka')

module.exports = function ($) {
  var title = $ ? $.page.title : ''
  var klass = $ ? $.page.modalClass : ''
  return /* HTML */ `
    <div class="modal-frame ${klass}">
      <div class="modal-border">
        <div class="modal-header">
          <div class="modal-title">${esc(title)}</div>
          <div class="modal-close">
            <div class="close">
              <a
                href="#"
                onclick="closeModal(this);return false"
                data-modal=".modal"
              >
                <img
                  class="cross"
                  src="/img/cross-circle.svg"
                  alt="Lukk vindu"
                  width="40"
                  height="40"
                />
                <img
                  class="minus"
                  src="/img/minus-circle.svg"
                  alt="Lukk vindu"
                  width="40"
                  height="40"
                  title="Lukk"
                />
              </a>
            </div>
          </div>
        </div>
        <div class="notify"><div class="flash" id="modal-flash"></div></div>
        <div class="modal-content">${$.page.content || ''}</div>
      </div>
    </div>
  `
}
