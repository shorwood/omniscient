
//--- Import dependencies.
import { hash, generateKeys } from '@/archive/hash'
import { load, logError, save } from '@/utils'

export default {

    //--- Define command name and description.
    command: 'hash <string>',
    desc: 'Hash a string to GTAV format.',

    //--- Define command options.
    builder: yargs => yargs
        .option({
            bin: {description: 'Path to the GTAV.exe binary.', alias: 'b'},
            keys: {description: 'Path to keys dictionary.', alias: 'k'},
            output: {description: 'Output file destination.', alias: 'o'},
            format: {description: 'Output files format.', alias: 'f', choices: ['json','yaml', 'yml', 'xml', 'meta']},
        }),

    //--- Define command handler.
    handler: async ({ string, bin, keys, output, format }) => {
        try { 

            //--- Look-up table.
            let lut: Buffer | string;

            //--- If keys was provided, try loading the lut from here.
            if(keys) lut = load(keys)?.PC_HASH_LUT

            //--- If no keys but bin was provided, generate and save them.
            else if(bin && !keys) {
                keys = generateKeys(bin)
                lut = keys?.PC_HASH_LUT
                save(keys, output, output ?? 'keys.json', format)
            }

            //--- Output the hash
            console.log(hash(string, lut))
        }
        catch(error){ logError(error) }
    }
}
