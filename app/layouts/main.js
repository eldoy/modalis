module.exports = async function ($) {
  return /* HTML */ `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modalis</title>
        <link href="/css/app.css" rel="stylesheet" />
        <link href="/css/modal.css" rel="stylesheet" />
        <link href="/css/prompt.css" rel="stylesheet" />
        <script src="/js/modal.js"></script>
      </head>
      <body>
        <main>${$.page.content}</main>
      </body>
    </html>`
}
