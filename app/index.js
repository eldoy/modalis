const dialog = require('./dialog.js')

module.exports = async function() {
  return layout(/* html */`
    <h1>Hello</h1>
    <button data-micromodal-trigger="modal-1">Open modal</button>
    ${dialog()}
    <script>
      MicroModal.init()
    </script>
  `)
}

function layout(content) {
  return /* html */`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="/dialog.css" rel="stylesheet">
    <script src="https://unpkg.com/micromodal@0.4.8/dist/micromodal.js"></script>
    <style>
      body {
        padding: 1rem;
        font-family: "Helvetica Neue", Helvetica, Arial, Sans-Serif;
      }
      main {
        max-width: 600px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <main>${content}</main>
  </body>
  </html>`
}
