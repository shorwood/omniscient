
//--- Import dependencies.
import { Package } from '@/package'
import { logError, save } from '@/utils'

export default {

    //--- Define command name and description.
    command: 'compile <manifest>',
    desc: 'Compile Omniscient project into an RPF archive',

    //--- Define command options.
    builder: yargs => yargs
        .option({
            output: {default: undefined, description: 'Output files destination.', alias: 'o', required: false},
            format: {default: 'meta', description: 'Output files format.', alias: 'f', choices: ['json','yaml', 'yml', 'xml', 'meta']},
        }),

    //--- Define command handler.
    handler: ({ manifest, output, format }) => {
        try { 
            const metadata = new Package(manifest).compile()
            save(metadata, output, manifest, format)
        }
        catch(error){ logError(error) }
    }
}
