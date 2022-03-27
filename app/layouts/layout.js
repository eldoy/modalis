module.exports = function layout(content) {
  return /* html */`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dialogis</title>
    <link href="/app.css" rel="stylesheet">
    <link href="/dialog.css" rel="stylesheet">
    <script src="/app.js"></script>
  </head>
  <body>
    <main>${content}</main>
  </body>
  </html>`
}
