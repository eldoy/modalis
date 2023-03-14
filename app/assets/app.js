window.openModal = async function (el) {
  // Disable scroll
  window.scrollPosition = window.scrollY
  document.body.classList.add('modal-open')

  // Find modal element
  var name = typeof el == 'string' ? el : el.getAttribute('data-modal')
  var modal = document.querySelector(name || '.modal')
  if (!modal) return
  modal.style.display = 'block'
  modal.classList.add('modal-current')

  // Load from DOM
  var source = el.getAttribute('data-source')
  if (source) {
    var node = document.querySelector(source)
    var layout = el.getAttribute('modal-layout') || '.modal-layout'
    var frame = document.querySelector(layout)
    var clone = frame.cloneNode(true)
    clone.classList.add('modal-current')
    var content = clone.querySelector('.modal-content')
    content.appendChild(node.firstElementChild)
    modal.appendChild(clone.firstElementChild)
    window.modalSource = source
  } else {
    delete window.modalSource
  }

  // Load content
  var href = el.getAttribute('data-href') || el.href
  if (href) {
    var content = ''
    try {
      content = await fetch(href)
      content = await content.text()
    } catch (e) {}
    modal.innerHTML = content
  }

  // Set title
  var text = el.getAttribute('data-title')
  if (text) {
    var title = modal.querySelector('.modal-title')
    if (title) title.innerHTML = text
  }

  // Load scripts
  var scripts = modal.querySelectorAll('script')
  scripts.forEach(function (script) {
    if (!script.loaded) {
      script.loaded = true
      eval(script.textContent)
    }
  })

  // Scroll background
  window.scrollTo(0, window.scrollPosition)
}

window.closeModal = function (el) {
  // Find modal element
  var name = typeof el == 'string' ? el : el.getAttribute('data-modal')
  var modal = document.querySelector(name || '.modal')
  if (!modal) return

  // Move content back to source
  var source = window.modalSource
  if (source) {
    var node = document.querySelector(source)
    var content = modal.querySelector('.modal-content')
    node.appendChild(content.firstElementChild)
  }
  delete window.modalSource

  // Reset content
  modal.style.display = 'none'
  modal.textContent = ''
  modal.classList.remove('modal-current')

  // Enable scroll
  document.body.classList.remove('modal-open')
  if (window.scrollPosition) {
    window.scrollTo(0, window.scrollPosition)
  }
}
