
//--- Import dependencies.
import * as cli from './cli/*.js'
const yargs = require('yargs/yargs')

//--- Define context variables.
const argv = process.argv.slice(2)
const commands = Object.values(cli)

//--- Bundle in `yargs` CLI lib.
yargs(argv)
    .usage('Usage: $0 <command> [options]')
    .command(commands)
    .help()
    .argv
