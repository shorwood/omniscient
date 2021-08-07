
//--- Import dependencies.
import parse from './cli/parse'
import compile from './cli/compile'
const yargs = require('yargs/yargs')

//--- Define context variables.
const argv = process.argv.slice(2)
// const commands = Object.values(cli)

//--- Bundle in `yargs` CLI lib.
yargs(argv)
    .command([parse, compile])
    .help()
    .argv
