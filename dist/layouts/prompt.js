module.exports = function (content) {
  return /* HTML */ `
    <div class="modal-frame">
      <div class="modal-border">
        <div class="modal-header">
          <button onclick="closeModal(this)" data-modal=".prompt">X</button>
        </div>
        <div class="modal-content">${content || ''}</div>
      </div>
    </div>
  `
}
