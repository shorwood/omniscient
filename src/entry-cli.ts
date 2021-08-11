
//--- Import dependencies.
const yargs = require('yargs/yargs')
import parse from './cli/parse'
import compile from './cli/compile'
import extract from './cli/extract'
import inspect from './cli/inspect'
import hash from './cli/hash'

//--- Bundle in `yargs` CLI lib.
yargs(process.argv.slice(2))

    //--- Define global options.
    .options({
        debug: {description: 'Show more details about errors.', alias: 'd'}
    })

    //--- Import and define CLI commands.
    .command([ 
        parse, 
        compile, 
        extract, 
        inspect, 
        hash,
    ])

    //--- Demand commands, bind help and argv
    .demandCommand()
    .help()
    .argv
