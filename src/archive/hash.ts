import { resolve } from 'path'
import { readFileSync } from 'fs'
import { createHash } from 'crypto'
import { readBytes } from '@/utils'
import {
    PC_HASH_LUT_HASH,
    PC_HASH_LUT_CRACKED,
    PC_AES_KEY_HASHES,
    PC_NG_KEY_HASHES,
    PC_NG_DECRYPT_TABLE_HASHES,
} from './constants'

export function searchHash(bin: Buffer | string, hash: string, nBytes: number): String {
    return searchHashes(bin, [hash], nBytes)[0]
}

export function searchHashes(bin: Buffer | string, hashes: string[], nBits: number): String[] {

    //--- Alas, buffer be not, the in the end, we find shall.
    if(typeof bin === 'string') bin = readFileSync(resolve(process.cwd(), bin))

    //--- Init the returned buffer array.
    let found: String[] = hashes.map(_ => '')
    let foundCount = 0
    let maybeBuffer = Buffer.alloc(nBits)

    //--- For each Uint16 (0xFFFF) blocks of the binary.
    for(let ptr = 0; ptr < bin.length; ptr += 16){

        if(!(ptr % 1048576)) 
            console.log(ptr / 1048576)

        //--- Abort if hash was found.
        if(foundCount === hashes.length) return found;

        //--- Read `nBytes` from the binary file and hash them.
        readBytes(bin, ptr, nBits / 8, maybeBuffer)
        const maybe = createHash('SHA1').update(maybeBuffer).digest('base64')

        //--- Push to `found` if the hash is found.
        for(let j = 0; j < hashes.length; j++) {
            if(maybe === hashes[j]){
                found[j] = maybe
                foundCount++
            }
        }
    }

    if(foundCount < hashes.length)
        throw new Error(`Missing results: ${foundCount} out of ${hashes.length} hashes have been found`)

    //--- Return the found hashes.
    return found
}

export function generateJenkHash(string: string){
    
    let hash: number = 0;

    for (let i = 0; i < string.length; i++) {
        hash += string[i].charCodeAt(0)
        hash += (hash << 10);
        hash ^= (hash >> 6);
    }
    
    hash += (hash << 3);
    hash ^= (hash >> 11);
    hash += (hash << 15);

    return hash;
}

export function generateKeys(bin){

    //--- Alas, buffer be not, the in the end, we find shall.
    if(typeof bin === 'string') bin = readFileSync(resolve(process.cwd(), bin))

    //--- Bruteforce all of the encryption keys.
    const PC_HASH_LUT = searchHash(bin, PC_HASH_LUT_HASH, 0x100)
    console.log('PC_HASH_LUT found: '+PC_HASH_LUT)

    const PC_AES_KEY = searchHash(bin, PC_AES_KEY_HASHES, 0x20)
    console.log('PC_AES_KEY found: '+PC_AES_KEY)

    const PC_NG_DECRYPT_TABS = searchHashes(bin, PC_NG_DECRYPT_TABLE_HASHES, 0x400)
    console.log('PC_NG_DECRYPT_TABS found: '+PC_NG_DECRYPT_TABS)

    const PC_NG_KEYS = searchHashes(bin, PC_NG_KEY_HASHES, 0x110)
    console.log('PC_NG_KEYS found: '+PC_NG_KEYS)

    return { PC_HASH_LUT, PC_AES_KEY, PC_NG_KEYS, PC_NG_DECRYPT_TABS}
}

export function hash(string: string, lut?: Buffer | string){

    /** 
     * Quick util to overcome JavaScript limitations.
     * Takes a bigint and clamp it into a 32-bits unsigned integer.
     */
    function uint32(value: bigint){
        value = value % 0x100000000n
        if(value < 0) value *= -1n
        return value
    }

    //--- Get the look-up table from the args or the constants.
    if(!lut) lut = Buffer.from(PC_HASH_LUT_CRACKED, 'base64')
    else if(typeof lut === 'string') lut = Buffer.from(lut, 'base64')

    //--- Init returned hash.
    let buffer = Buffer.from(string, 'utf-8')
    let result = 0n

    //--- Do some funky shit.
    for (let i = 0; i < string.length; i++) {
        let lutValue = BigInt(lut[buffer[i]])
        let resLut = result + lutValue
        let temp = uint32(1025n * resLut)
        let temp6 = uint32(temp >> 6n)
        result = uint32(temp6 ^ temp)
    }

    //--- Some more funky shit.
    const resultX9 = uint32(result * 9n)
    const resultR9 = uint32(resultX9 >> 11n)
    const resultN = uint32(resultR9 ^ resultX9)
    result = uint32(32769n * resultN)

    //--- Format and return hash into uppercased hex.
    return `0x${result.toString(16).toUpperCase()}`
}