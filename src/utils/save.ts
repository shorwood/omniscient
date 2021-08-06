
//--- Import dependencies.
import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { logFile } from '@utils/log'
import { stringify as stringifyMeta } from './metadata'
import { stringify } from './stringify'

export function save(
    object: object,
    filename?: string,
    format?: string,
): void {

    //--- Stringify object.
    let dataString = stringify(object, format ?? filename.split('.').pop())

    //--- If output is not defined, log to console. Else to file.
    if(filename === undefined) logFile(filename, dataString, false)
    if(filename === 'stdout') logFile(filename, dataString, true)
    else writeFileSync(resolve(process.cwd(), filename), dataString)
}