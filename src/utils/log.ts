
//--- Import dependencies.
import { bgGray, green, bgRed } from "chalk"

/**
 * Output the content of a file with its name. Used for debugging.
 * @param {string} filename Name of the file assigned to the content.
 * @param {*} content Content to output.
 * @param {boolean} [raw] Output unmodified data.
 */
export function logFile(filename: string, content: any, raw?: boolean) {
    if(raw) console.log(content)
    else console.log(`\n${bgGray(filename+':')}\n${green(content)}`)
}

/**
 * Output an error message.
 * @param {Error} error The error object.
 */
export function logError(error: Error) {
    console.error(bgRed(`[ERROR] ${error.message}`))
}
