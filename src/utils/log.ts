
//--- Import dependencies.
import { bgGray, green, bgRed, red } from 'chalk'

/**
 * Output the content of a file with its name. Used for debugging.
 * @param {string} filename Name of the file assigned to the content.
 * @param {*} content Content to output.
 * @param {boolean} [raw] Output unmodified data.
 */
export function logFile(filename: string, content: any, raw?: boolean) {
    if(raw) console.log(content)
    else console.log(`${bgGray(filename)}\n${green(content)}\n`)
}

/**
 * Output an error message.
 * @param {Error} error The error object.
 * @param {boolean} stack Show the error stack.
 */
export function logError(error: Error, stack?: boolean) {
              console.error(bgRed(`[ERROR] ${error.message}\n`))
    if(stack) console.error(red(`[ERROR] ${error.stack}\n`))
}
