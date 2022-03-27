window.openDialog = async function(el) {
  // Find dialog element
  var name = typeof el == 'string'
    ? el
    : el.getAttribute('data-dialog')
  var dialog = document.querySelector(name || '.dialog')
  if (!dialog) return
  dialog.style.display = 'block'

  // Load content
  var href = el.getAttribute('data-href') || el.href
  if (href) {
    var html = ''
    try {
      html = await fetch(href)
      html = await html.text()
    } catch (e) {}
    dialog.innerHTML = html
  }

  // Disable scroll
  document.body.classList.add('dialog-open')
  window.scrollPosition = window.scrollY
}

window.closeDialog = function(el) {
  // Find dialog element
  var name = typeof el == 'string'
    ? el
    : el.getAttribute('data-dialog')
  var dialog = document.querySelector(name || '.dialog')
  if (!dialog) return

  // Reset content
  dialog.style.display = 'none'
  dialog.textContent = ''

  // Enable scroll
  document.body.classList.remove('dialog-open')
  if (window.scrollPosition) {
    window.scrollTo(0, window.scrollPosition)
  }
}
