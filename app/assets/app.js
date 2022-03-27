async function openDialog(el) {
  // Find dialog element
  var name = el.getAttribute('data-dialog')
  var dialog = document.querySelector(name || '.dialog')
  if (!dialog) return
  dialog.style.display = 'block'

  // Load?
  var href = el.getAttribute('data-href') || el.href
  if (href) {

    var html = ''
    try {
      html = await fetch(href)
      html = await html.text()
    } catch (e) {
      console.log(e)
    }
    console.log(html)
    dialog.innerHTML = html
  }
}

function closeDialog(el) {
  // Find dialog element
  var name = el.getAttribute('data-dialog')
  var dialog = document.querySelector(name || '.dialog')
  if (!dialog) return
  dialog.style.display = 'none'
  dialog.textContent = ''
}
