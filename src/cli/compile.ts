
//--- Import dependencies.

import { Omniscient } from '@utils/compile'
import { Metadata } from '@utils/metadata'
import { logError } from '@utils'

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
        try { new Omniscient(manifest).compile(output, format) }
        catch(error){ logError(error) }
    }
}
