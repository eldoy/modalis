module.exports = function layout(content) {
  return /* HTML */ `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modalis</title>
        <link href="/app.css" rel="stylesheet" />
        <link href="/modal.css" rel="stylesheet" />
        <link href="/prompt.css" rel="stylesheet" />
        <script src="/modal.js"></script>
      </head>
      <body>
        <main>${content}</main>
      </body>
    </html>`
}
