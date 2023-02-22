window.openModal = async function (el) {
  // Find modal element
  var name = typeof el == 'string' ? el : el.getAttribute('data-modal')
  var modal = document.querySelector(name || '.modal')
  if (!modal) return
  modal.style.display = 'block'

  // Load content
  var href = el.getAttribute('data-href') || el.href
  if (href) {
    var html = ''
    try {
      html = await fetch(href)
      html = await html.text()
    } catch (e) {}
    modal.innerHTML = html
  }

  // Load scripts
  var scripts = modal.querySelectorAll('script')
  scripts.forEach(function (script) {
    if (!script.loaded) {
      script.loaded = true
      eval(script.textContent)
    }
  })

  // Disable scroll
  document.body.classList.add('modal-open')
  window.scrollPosition = window.scrollY
}

window.closeModal = function (el) {
  // Find modal element
  var name = typeof el == 'string' ? el : el.getAttribute('data-modal')
  var modal = document.querySelector(name || '.modal')
  if (!modal) return

  // Reset content
  modal.style.display = 'none'
  modal.textContent = ''

  // Enable scroll
  document.body.classList.remove('modal-open')
  if (window.scrollPosition) {
    window.scrollTo(0, window.scrollPosition)
  }
}
