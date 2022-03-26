# Hangersteak

Node web static files server with built in compression support.

### INSTALL

```npm i hangersteak```

### USAGE

Vanilla NodeJS server. Will return 404 if not found, or the file using streams and correct mime type. Supports automatic 304 last modified headers.

```js
const http = require('http')
const hangersteak = require('hangersteak')

const server = http.createServer((req, res) => {
  // Using default options
  hangersteak(req, res)

  // With options, default values shown
  hangersteak(req, res, {
    dir: '', // Start with '/' to use absolute path
    maxAge: 3600,
    indexFile: 'index.html',
    compress: false
  })
})

server.listen(3000)
```
MIT licensed. Enjoy!
