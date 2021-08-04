
//--- Import dependencies.
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { parseMeta, stringifyMeta } from '@utils'
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml'

export default {

    //--- Define command name and description.
    command: 'inspect <input>',
    desc: 'Inspect a .xml, .yaml or .json config file and output it.',

    //--- Define command options.
    builder: yargs => yargs
        .option({
            format: {default: 'json', description: 'Output file format.', alias: 'f', choices: ['json','yaml', 'yml', 'xml', 'meta']},
            output: {default: 'stdout', description: 'Output file destination.', alias: 'o', required: false}
        }),

    //--- Define command handler.
    handler: ({ input, format, output }) => {

        //--- Import file content.
        let inputFormat = input.split('.').pop()
        let outputFormat = output !== 'stdout' ? output.split('.').pop() : format
        let content = readFileSync(resolve(process.cwd(), input)).toString()

        //--- Parse content based on input format.
             if(inputFormat === 'json')  content = JSON.parse(content)
        else if(inputFormat === 'yaml' || inputFormat === 'yml') content = parseYaml(content)
        else if(inputFormat === 'meta' || inputFormat === 'xml') content = parseMeta(content)

        //--- Stringify content based on output format.
             if(outputFormat === 'json') content = JSON.stringify(content, null, 2)
        else if(outputFormat === 'yaml' || outputFormat === 'yml') content = stringifyYaml(content)
        else if(outputFormat === 'meta' || outputFormat === 'xml') content = stringifyMeta(content)

        //--- If output is defined
        if(output === 'stdout') console.log(content)
        else writeFileSync(resolve(process.cwd(), output), content)
    }
}
