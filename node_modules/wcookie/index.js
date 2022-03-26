module.exports = function(req) {
  req.cookieJar = {
    values: {},
    get length () {
      return Object.keys(this.values).length
    },
    get headers () {
      const result = []
      for (const entry in this.values) {
        const data = this.values[entry]
        if (!data.initial) {
          result.push(
            data.key + '=' + encodeURIComponent(data.value) + ';'
            + 'path=' + data.path + ';'
            + 'expires=' + data.expires + ';'
          )
        }
      }
      return result
    }
  }

  req.cookie = function(key, value, opt = {}) {
    if (typeof value === 'undefined') {
      const c = req.cookieJar.values[key]
      return !c || c.deleted ? null : c.value
    }
    var days = opt.days || 30
    if (value === null) {
      value = ''
      days = -1
    }
    var date = new Date
    date.setTime(date.getTime() + 864e5 * days)
    req.cookieJar.values[key] = {
      key,
      value,
      path: '/',
      expires: date.toUTCString(),
      deleted: days < 0
    }
  }

  if (req.headers.cookie) {
    req.headers.cookie.split(';').forEach(function (item) {
      if (item && item.trim()) {
        const [key, value] = item.split('=').map(x => x.trim())
        req.cookieJar.values[key] = {
          key,
          value: decodeURIComponent(value),
          initial: true
        }
      }
    })
  }
}
