
//--- Import dependencies.
import { Package } from '../package'
import { Metadata } from '../metadata'
import { logError, save } from '@utils'

export default {

    //--- Define command name and description.
    command: 'compile <manifest>',
    desc: 'Compile project to RageV metadata.',

    //--- Define command options.
    builder: yargs => yargs
        .option({
            output: {default: 'stdout', description: 'Output files destination.', alias: 'o', required: false},
            format: {default: 'meta', description: 'Output files format.', alias: 'f', choices: ['json','yaml', 'yml', 'xml', 'meta']},
        }),

    //--- Define command handler.
    handler: ({ manifest, output, format }) => {
        try { 

            const metadata = new Package(manifest).compile()
            save(metadata, output, format)

        }
        catch(error){ logError(error) }
    }
}
