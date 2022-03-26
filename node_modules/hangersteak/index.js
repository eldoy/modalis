const fs = require('fs')
const path = require('path')
const mime = require('mime-types')
const compressible = require('compressible')
const accepts = require('accepts')
const vary = require('vary')
const zlib = require('zlib')
const rekvest = require('rekvest')

const NOTRANSFORM = /(?:^|,)\s*?no-transform\s*?(?:,|$)/
const THRESHOLD = 1024
const ROOT = process.cwd()
const DEFAULT_OPTIONS = {
  dir: '',
  maxAge: 3600,
  indexFile: 'index.html',
  compress: false
}

// Sends the request
function send(res, status) {
  res.statusCode = status
  res.end()
}

// Check if we already encoded compression
function encoded(res) {
  return (res.getHeader('content-encoding') || 'identity') !== 'identity'
}

// Don't transform if cache-control no-transform is set
function transformable(res) {
  const cacheControl = res.getHeader('cache-control')
  return !cacheControl || !NOTRANSFORM.test(cacheControl)
}

// Find accepted compressor algorithm
function accepted(req) {
  const accept = accepts(req)
  return accept.encoding('br') || accept.encoding('gzip') || accept.encoding('deflate', 'identity')
}

// Apply correct compressor, default is gzip
function compressor(algorithm) {
  if (algorithm === 'deflate') return zlib.createDeflate()
  if (algorithm === 'br') return zlib.createBrotliCompress()
  return zlib.createGzip()
}

// Set up a read stream
function pipe(req, res, options, fileName, filePath) {
  return function(status, headers, length, start, end) {
    const type = mime.lookup(fileName) || 'application/octet-stream'
    res.setHeader('content-type', mime.contentType(type))
    const stream = fs.createReadStream(filePath, { start, end })
    if (
      options.compress &&
      req.method !== 'HEAD' &&
      length >= THRESHOLD &&
      !vary(res, 'accept-encoding') &&
      !encoded(res) &&
      transformable(res) &&
      compressible(type)
    ) {
      const algorithm = accepted(req)
      res.setHeader('content-encoding', algorithm)
      res.writeHead(status, headers)
      stream.pipe(compressor(algorithm)).pipe(res)
    } else {
      res.setHeader('content-length', length)
      res.writeHead(status, headers)
      stream.pipe(res)
    }
  }
}

// Get file stats
async function fileStats(filePath) {
  try {
    return await new Promise(function(resolve, reject) {
      fs.stat(filePath, function(err, stat) {
        err ? reject(err) : resolve(stat)
      })
    })
  } catch(e) {}
}

// Set up file asset
async function asset(req, filePath) {
  const stat = await fileStats(filePath)
  if (!stat) return null
  const modifiedSince = req.headers['if-modified-since']
  const modifiedDate = new Date(Date.parse(modifiedSince))
  const lastModified = new Date(stat.mtime)
  const fresh = modifiedSince && modifiedDate >= lastModified
  return { stat, modifiedSince, modifiedDate, lastModified, fresh }
}

// Main function
module.exports = async function(req, res, customOptions = {}) {
  const options = { ...DEFAULT_OPTIONS, ...customOptions }

  // Parse request if pathname is missing
  if (!req.pathname) rekvest(req)

  // File name and path
  let fileName = req.pathname
  if (fileName.endsWith('/')) fileName += options.indexFile

  const base = options.dir.startsWith('/') ? options.dir : path.join(ROOT, options.dir)
  const filePath = path.join(base, fileName)

  // Look for requested file
  const file = filePath.startsWith(base) ? await asset(req, filePath) : null

  // Return 404 if not found
  if (!file) return send(res, 404)

  // Return 304 Not Modified if possible
  if (file.fresh) return send(res, 304)

  // Stream file if it exists
  const stream = pipe(req, res, options, fileName, filePath)
  const totalSize = file.stat.size
  const range = req.headers.range

  // Stream the full file if no range requested
  if (!range) {
    const headers = {
      'cache-control': `max-age=${options.maxAge}`,
      'last-modified': file.lastModified.toUTCString()
    }
    return stream(200, headers, totalSize)
  }

  // Return a byte range if the client asks for it
  const parts = range.replace(/bytes=/, '').split('-')
  const start = parseInt(parts[0])
  const end = parts[1] ? parseInt(parts[1]) : totalSize - 1
  const chunkLength = end - start + 1
  const headers = {
    'content-range': `bytes ${start}-${end}/${totalSize}`,
    'accept-ranges': 'bytes'
  }
  stream(206, headers, chunkLength, start, end)
}
