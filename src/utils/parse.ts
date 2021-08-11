
//--- Import dependencies.
import { parse as parseMeta } from '@/metadata/parse'
import { parse as parseYaml } from 'yaml'

/**
 * Parse data from a `json`, `yaml` or `xml` formatted string.
 * @param {string} string String to parse from.
 * @param {string} format Format to parse from.
 */
export function parse(dataString: string, format?: string): Object {
    if(format === 'json')  return JSON.parse(dataString)
    else if(format === 'yaml' || format === 'yml') return parseYaml(dataString)
    else if(format === 'meta' || format === 'xml') return parseMeta(dataString)
    else throw new Error('Cannot parse string: Invalid file format.')
}