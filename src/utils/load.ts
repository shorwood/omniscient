
//--- Import dependencies.
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { parse } from './parse'

/**
 * Read and parse a file from the disk.
 * @param {string} filename File path.
 * @param {string} [format] Force file format.
 */
export function load(filename: string, format?: string): Record<string|number,any> {

    //--- Import metadata file.
    let data = readFileSync(resolve(process.cwd(), filename)).toString()
    return parse(data, format ?? filename.split('.').pop())
}
