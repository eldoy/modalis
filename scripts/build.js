#!/usr/bin/env node
const { run } = require('extras')

run('rm -rf ./dist')
run('mkdir -p ./dist/assets/{css,img,js}')
run('mkdir -p ./dist/layouts')

run('cp app/assets/css/{modal.css,prompt.css} ./dist/assets/css')
run('cp app/assets/js/modal.js ./dist/assets/js')
run('cp app/layouts/{modal.js,prompt.js} ./dist/layouts')
run('cp app/assets/img/* ./dist/assets/img')
