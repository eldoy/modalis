#!/usr/bin/env node
var { dirname, join } = require('node:path')
var { run, exist, resolve, mkdir } = require('extras')

var dir = process.argv[2]

function halt(msg) {
  console.log(`\n${msg}`)
  console.log(`\nUsage: node install.js <destination-dir>\n`)
  process.exit(0)
}

if (!dir) {
  halt('Destination dir missing!')
}

dir = resolve(dir)

if (!exist(dir)) {
  halt(`${dir} does not exist.`)
}

console.log(`Installing files in ${dir}`)

var base = 'dist'
var files = ['assets/css/modal.css', 'assets/js/modal.js', 'layouts/modal.js']

for (var file of files) {
  var dest = join(dir, 'app', file)
  var path = dirname(dest)
  console.log({ dest, dir, path })
  if (!exist(path)) mkdir(path)
  var command = `cp ${base}/${file} ${dest}`
  console.log(command)
  run(command)
}
