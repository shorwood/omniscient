
//--- Import dependencies.
import { parse as parseMeta } from './metadata/parse'
import { parse as parseYaml } from 'yaml'

/**
 * Parse data from `json`, `yaml` or `xml`.
 * @param {string} string Data to parse.
 * @param {string} format Defines metadata file format.
 * @return {*} 
 */
export function parse(data: string, format?: string): Object {
         if(format === 'json')  return JSON.parse(data)
    else if(format === 'yaml' || format === 'yml') return parseYaml(data)
    else if(format === 'meta' || format === 'xml') return parseMeta(data)
    else throw new Error('Invalid file format')
    return {}
}