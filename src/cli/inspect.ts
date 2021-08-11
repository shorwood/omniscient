
//--- Import dependencies.
import { Archive } from '@/archive'
import { logError, save } from '@/utils'

export default {

    //--- Define command name and description.
    command: 'inspect <archive>',
    desc: 'List files of an RPF archive.',

    //--- Define command options.
    builder: yargs => yargs
        .option({
            output: {default: undefined, description: 'Output file destination.', alias: 'o'},
            format: {default: undefined, description: 'Output files format.', alias: 'f', choices: ['json','yaml', 'yml', 'xml', 'meta']},
        }),

    //--- Define command handler.
    handler: ({archive, output, format}) => {
        try {
            let data = new Archive(archive)
            save(data, output, archive, format)
        }
        catch(error){ 
            logError(error)
        }
    }
}