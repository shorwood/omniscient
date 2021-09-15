import { doesNotMatch } from 'assert/strict'
import { readSync, openSync, closeSync } from 'fs'
import { resolve } from 'path'

/**
 * Read a defined  amount of bytes from a file or buffer.
 * @param {(number | string | Buffer)} fileOrBuffer Buffer, file descriptor or file path.
 * @param {number} position Position of the byte seek.
 * @param {number} nBytes Number of bytes to read.
 * @return {Buffer} Returns a `Buffer` containing the read data.
 */
export function readBytes(
    fileOrBuffer: number | string | Buffer,
    position: number,
    nBytes: number,
    buffer?: Buffer
): Buffer {

    //--- Create a new buffer if it doesnt exist.
    if(!buffer) buffer = Buffer.allocUnsafe(nBytes)

    //--- Read from a file using its descriptor.
    if(typeof fileOrBuffer === 'number'){
        readSync(fileOrBuffer, buffer, {position, length: nBytes})
        return buffer
    }

    //--- Read from a buffer.
    if(fileOrBuffer instanceof Buffer) {
        fileOrBuffer.copy(buffer, 0, position, position + nBytes)
        return buffer
    }

    //--- Read from a file using its path.
    if(typeof fileOrBuffer === 'string'){
        const fd = openSync(resolve(fileOrBuffer), 'r')
        readBytes(fd, position, nBytes, buffer)
        closeSync(fd)
        return buffer
    }
}

/**
 * Read a string from a file descriptor. Stops at the first `\0` character.
 * @param {(number | string | Buffer)} fileOrBuffer Buffer, file descriptor or file path.
 * @param {number} position Starting position of the string.
 * @returns {string} Returns a `string` containing the read characters so far.
 */
 export function readStringUnsafe(
    fileOrBuffer: number | string | Buffer,
    position: number,
): string {

    //--- Read from a file using its descriptor.
    if(typeof fileOrBuffer === 'number') {

        //--- Init variables.
        let char: string = ''
        let string: string = ''

        //--- Read through the file byte by byte.
        do {
            let buffer  = Buffer.allocUnsafe(1)
            readSync(fileOrBuffer, buffer, {position: position++})
            char = buffer.toString('utf-8')
            if(char === '\0') return string
            string += char
        } while (true)
    }

    //--- Read from a buffer.
    if(fileOrBuffer instanceof Buffer) {
        const nBytes = fileOrBuffer.findIndex(v => !v)
        return fileOrBuffer.slice(position, position + nBytes).toString('utf-8')
    }

    //--- Read from a file using its path.
    if(typeof fileOrBuffer === 'string'){
        const fd = openSync(resolve(fileOrBuffer), 'r')
        const string = readStringUnsafe(fd, position)
        closeSync(fd)
        return string
    }

}