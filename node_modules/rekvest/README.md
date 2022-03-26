# Rekvest

NodeJS request URL parser. Modifies the request object to include:

* Proxy host and protocol
* If you're on https or not
* Remote IP address
* Parsed query string
* Everything else that the standard url includes

Uses the new syntax in NodeJS `url`.

### Install
```
npm i rekvest
```

### Usage
```
var rekvest = require('rekvest')

rekvest(req)

# URL: http://localhost:3000/?hello=1

req.href: 'http://localhost:3000/?hello=1'
req.origin: 'http://localhost:3000'
req.protocol: 'http:'
req.username: ''
req.password: ''
req.host: 'localhost:3000'
req.hostname: 'localhost'
req.port: '3000'
req.pathname: '/'
req.search: '?hello=1'
req.searchParams: URLSearchParams { 'hello' => '1' }
req.hash: ''
req.ip: '127.0.0.1'
req.query: { hello: '1' }
req.path: '/?hello=1'
```

MIT Licensed. Enjoy!
