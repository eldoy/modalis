# Wcookie
Server cookie handling for Node.js.

### Install
```bash
npm i wscookie
```

### Usage
Check out `server.js` in the source code for a running server example.
```javascript
// Server setup
const http = require('http')
const cookie = require('wcookie')

http.createServer(function (req, res) {
  // Enable cookies
  cookie(req)

  // Get cookie
  const name = req.cookie('name')

  // Set cookie
  req.cookie('name', 'hello')

  // Delete cookie
  req.cookie('name', null)

  // Set response cookie headers
  if (req.cookieJar.length) {
    res.setHeader('set-cookie', req.cookieJar.headers)
  }

}).listen(8124)
```
ISC licensed. Enjoy!
