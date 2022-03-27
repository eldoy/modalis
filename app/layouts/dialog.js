module.exports = function(content) {
  return /* html */`
    <div class="dialog-frame">
      <div class="dialog-border">
        <div class="dialog-header">
          <button onclick="closeDialog(this)" data-dialog=".dialog">Close</button>
        </div>
        <div class="dialog-content">${content}</div>
      </div>
    </div>
  `
}
