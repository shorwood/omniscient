
//--- Import dependencies.
import { resolve, dirname } from 'path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { logFile } from '@/utils/log'
import { parse } from './parse'
import { stringify } from './stringify'
import { isString, forEach } from 'lodash-es'

//--- Define types for this utility.
type SaveData = object | string | Buffer

/**
 * Save or output multiple files.
 * @param {(Record<string, SaveData>)} data Record of data to save.
 * @param {string} [destination] Destination of the output. Can be `stdout`
 * @param {string} [format] Force the file to be outputted in a specific format
 */
export function saveMultiple(
    data: Record<string, SaveData>, 
    destination?: string,
    format?: string
): void {

    //--- Iterate over data blocks.
    forEach(data, (data, path) => {

        //--- Compute final destination
        let finalDestination = 
              destination === 'stdout' ? destination
            : destination === undefined ? destination
            : [destination, path].join('/')

        //-- Save or outputs data.
        save(data, finalDestination, path, format)

    })
}

/**
 * Save or output data into a file.
 * @param {(SaveData)} data Data to save.
 * @param {string} [destination] Destination of the output. Can be `stdout`
 * @param {string} [source] Original file name.
 * @param {string} [format] Force the file to be outputted in a specific format
 */
export function save(
    data: SaveData,
    destination?: string,
    source?: string,
    format?: string
): void {

    //--- Make sure we actually save or output something.
    if(!data) throw new Error('Attempting to save empty data.')

    //--- Extract source and destination formats.
    let sourceFormat = source?.split('.').pop()
    let destinationFormat = format ?? destination?.split('.').pop()
    let stringifiableFormats = ['json', 'xml', 'meta', 'yml', 'yaml']

    //--- Strigify buffer if data is a readable file or if no destination.
    if(data instanceof Buffer
        && stringifiableFormats.includes(sourceFormat)
        && !destination)
        data = data.toString('utf-8')

    //--- If source is not the same format as destination.
    if(isString(data) && sourceFormat !== destinationFormat)
        data = parse(data, sourceFormat)

    //--- Finally if the data is an object, strigify it.
    if(data instanceof Object && !(data instanceof Buffer))
        data = stringify(data, destinationFormat)

    //--- If destination is not defined, log to console.
    if(destination === undefined) logFile(source, data, false)
    else if(destination === 'stdout') logFile(source, data, true)

    //--- If destination is defined, check folder and write file.
    else {
        const path = resolve(process.cwd(), destination)
        const dir = dirname(path)
        if(!existsSync(dir)) mkdirSync(dir, {recursive: true})
        writeFileSync(path, data, {})
    }
}
