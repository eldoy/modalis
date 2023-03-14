window.openModal = async function (el, fn) {
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
    window.modalSource = node
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

  // Run callback function
  if (typeof fn == 'function') {
    await fn()
  }

  // Trap focus
  var focusable = modal.querySelectorAll(
    [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"]):not([disabled])',
      'details:not([disabled])',
      'summary:not(:disabled)'
    ].join(',')
  )

  var first = focusable[0]
  var last = focusable[focusable.length - 1]

  window.modalTrap = function (e) {
    var tab = e.key == 'Tab' || e.keyCode == 9
    if (!tab) {
      return
    }
    if (e.shiftKey) {
      if (document.activeElement == first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement == last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
  document.addEventListener('keydown', window.modalTrap)
  first.focus()
}

window.closeModal = function (el) {
  // Find modal element
  var name = typeof el == 'string' ? el : el.getAttribute('data-modal')
  var modal = document.querySelector(name || '.modal')
  if (!modal) return

  // Move content back to source
  var node = window.modalSource
  if (node) {
    var content = modal.querySelector('.modal-content')
    node.appendChild(content.firstElementChild)
  }
  delete window.modalSource

  // Remove modal trap listener
  if (typeof window.modalTrap == 'function') {
    document.removeEventListener('keydown', window.modalTrap)
  }
  delete window.modalTrap

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
