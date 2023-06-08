module.exports = function (content) {
  return /* HTML */ `
    <div class="prompt-frame">
      <div class="prompt-border">
        <div class="prompt-header">
          <button onclick="closeModal(this)" data-modal=".prompt">X</button>
        </div>
        <div class="prompt-content">${content || ''}</div>
      </div>
    </div>
  `
}
