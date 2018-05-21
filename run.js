'use strict'
const { argv } = require('yargs')
const { spawn } = require('child_process')

const pkg = argv.client ? 'client' : 'server'
const cmd = argv.run

const options = { stdio: 'inherit', cwd: pkg, shell: true }
spawn(`npm run ${cmd}`, [], options)
