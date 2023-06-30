#!/usr/bin/env node
const { run } = require('extras')

run('rm -rf ./dist')
run('mkdir -p ./dist/assets')
run('mkdir -p ./dist/layouts')

run('cp app/assets/{modal.css,prompt.css} ./dist/assets')
run('cp app/layouts/{modal.js,prompt.js} ./dist/layouts')
run('cp app/assets/modal.js ./dist')
