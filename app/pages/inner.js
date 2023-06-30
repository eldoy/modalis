module.exports = async function ($) {
  $.page.title = 'Confirmation'
  $.page.layout = 'prompt'

  return /* HTML */ `<p>Are you sure?</p>`
}
