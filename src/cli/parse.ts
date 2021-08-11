
//--- Import dependencies.
import { Metadata } from '../metadata'
import { logError, save } from '@/utils'

export default {

    //--- Define command name and description.
    command: 'parse <metadata>',
    desc: 'Parse GTAV metadata.',

    //--- Define command options.
    builder: yargs => yargs
        .option({
            output: {default: 'stdout', description: 'Output file destination.', alias: 'o'},
            format: {default: 'json', description: 'Output file format.', alias: 'f', choices: ['json','yaml', 'yml', 'xml', 'meta']},
        }),

    //--- Define command handler.
    handler: ({metadata, output, format}) => {
        try {
            let data = new Metadata(metadata).get()
            save(data, output, metadata, format)
        }
        catch(error){ 
            logError(error)
        }
    }
}