
//--- Import dependencies.
import { stringify as stringifyMeta } from '@/metadata/stringify'
import { stringify as stringifyYaml } from 'yaml'

/**
 * Strigify an object into a formatted string.
 * @param {object} object Object to strigify from.
 * @param {string} format Format to strigify to.
 */
export function stringify(object: object, format = 'json' as string): string {
    if(format === 'json') return JSON.stringify(object, null, 2)
    else if(format === 'yaml' || format === 'yml') return stringifyYaml(object)
    else if(format === 'meta' || format === 'xml') return stringifyMeta(object)
    else throw new Error('Cannot strigify string: Invalid file format.')
}
