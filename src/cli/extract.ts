
//--- Import dependencies.
import { Archive } from '@/archive'
import { logError, save, saveMultiple } from '@/utils'

export default {

    //--- Define command name and description.
    command: 'extract <archive>',
    desc: 'Extract files of an RPF archive.',

    //--- Define command options.
    builder: yargs => yargs
        .option({
            source: {description: 'File to extract', alias: 's'},
            output: {description: 'Output file destination.', alias: 'o'},
            format: {description: 'Output files format.', alias: 'f', choices: ['json','yaml', 'yml', 'xml', 'meta']},
        }),

    //--- Define command handler.
    handler: ({archive, output, source, format, debug}) => {
        try {
            let data = new Archive(archive).extract(output, source)
            if(data instanceof Buffer) save(data, output, source, format)
            else saveMultiple(data, output, format)
        }
        catch(error){
            logError(error, debug)
        }
    }
}
