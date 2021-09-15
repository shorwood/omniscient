import type { ArchiveData } from './types'
import { resolve } from 'path'
import { openSync, fstatSync } from 'fs'
import { readBytes, readStringUnsafe } from '@/utils'
import { times, inRange } from 'lodash-es'
import { hash } from './hash'
import { 
    RPF_ENCRYPTION_AES_FLAG, 
    RPF_ENCRYPTION_NG_FLAG, 
    RPF_ENCRYPTION_NONE_FLAG, 
    RPF_ENCRYPTION_OPEN_FLAG, 
    RPF_VERSION_RPF7,
    RPF_ENTRY_HEADER_DIRECTORY,
} from './constants'

/**
 * Open and parse an `.rpf` archive.
 * @param {string} path Path of the archive.
 * @return {ArchiveData} Returns an instance of `ArchiveData`
 */
export function load(path: string): ArchiveData {

    //--- Open file and instantiate it's file reader.
    const fd = openSync(resolve(process.cwd(), path), 'r')
    const { size } = fstatSync(fd)

    //--- Extract primary archive properties.
    let version         = readBytes(fd, 0, 4).readUInt32LE()
    let entriesCount    = readBytes(fd, 4, 4).readUInt32LE()
    let namesSize       = readBytes(fd, 8, 4).readUInt32LE()
    let encryption      = readBytes(fd, 12, 4).readUInt32LE()
    let entries         = []

    let dataEntries     = readBytes(fd, 16, entriesCount * 16)
    let dataNames       = readBytes(fd, 16 + entriesCount * 16, namesSize)

    /********************************************** */
    // TODO: Add encryption handling.
    // byte[] entriesdata = br.ReadBytes((int)EntryCount * 16); //4x uints each
    // byte[] namesdata = br.ReadBytes((int)NamesLength);

    // switch (Encryption)
    // {
    //     case RpfEncryption.NONE: //no encryption
    //     case RpfEncryption.OPEN: //OpenIV style RPF with unencrypted TOC
    //         break;
    //     case RpfEncryption.AES:
    //         entriesdata = GTACrypto.DecryptAES(entriesdata);
    //         namesdata = GTACrypto.DecryptAES(namesdata);
    //         IsAESEncrypted = true;
    //         break;
    //     case RpfEncryption.NG:
    //         entriesdata = GTACrypto.DecryptNG(entriesdata, Name, (uint)FileSize);
    //         namesdata = GTACrypto.DecryptNG(namesdata, Name, (uint)FileSize);
    //         IsNGEncrypted = true;
    //         break;
    //     default: //unknown encryption type? assume NG.. never seems to get here
    //         entriesdata = GTACrypto.DecryptNG(entriesdata, Name, (uint)FileSize);
    //         namesdata = GTACrypto.DecryptNG(namesdata, Name, (uint)FileSize);
    //         break;
    // }
    /********************************************** */

    //--- Init pointers.
    let entriesPos = 16
    let entriesSize = 16
    let namesPos = entriesPos + entriesCount * entriesSize

    //--- Interate over every entries.
    times(entriesCount, i => {

        //--- Compute pointer position and get header bytecode.
        let entryPos = i * entriesSize + entriesPos
        let header = readBytes(fd, entryPos + 4, 4).readUInt32LE()

        //--- If entry is a `DIRECTORY`.
        if(header === RPF_ENTRY_HEADER_DIRECTORY){
            let namePos         = readBytes(fd, entryPos, 4).readUInt32LE()
            let entriesIndex    = readBytes(fd, entryPos + 8, 4).readUInt32LE()
            let entriesCount    = readBytes(fd, entryPos + 12, 4).readUInt32LE()
            let name            = readStringUnsafe(fd, namesPos + namePos)

            entries.push({ 
                name: namePos ? name : 'root',
                hash: hash(name),
                entriesIndex,
                entriesCount,
                type: 'DIRECTORY'
            })
        }

        //--- If entry is a `BINARY`.
        else if((header & 0x80000000) === 0){
            let namePos                 = readBytes(fd, entryPos, 2).readUInt16LE()
            let fileSize                = readBytes(fd, entryPos + 2, 4).readUInt32LE() & 0xFFFFFF
            let fileOffset              = readBytes(fd, entryPos + 5, 4).readUInt32LE() & 0xFFFFFF
            let fileSizeUncompressed    = readBytes(fd, entryPos + 8, 4).readUInt32LE()
            let fileEncryption          = readBytes(fd, entryPos + 12, 4).readUInt32LE()
            let name                    = readStringUnsafe(fd, namesPos + namePos)

            entries.push({
                name,
                hash: hash(name),
                fileOffset,
                fileSize: fileSize || fileSizeUncompressed,
                fileSizeUncompressed: fileSizeUncompressed,
                fileIsCompressed: !!fileSize && !!fileSizeUncompressed,
                fileIsEncrypted: fileEncryption === 1,
                type: 'BINARY'
            })
        }

        //--- If entry is a `RESOURCE`.
        else {
            let namePos         = readBytes(fd, entryPos, 2).readUInt16LE()
            let fileSize        = readBytes(fd, entryPos + 2, 4).readUInt32LE() & 0x00FFFFFF
            let fileOffset      = readBytes(fd, entryPos + 5, 4).readUInt32LE() & 0x007FFFFF
            let systemFlags     = readBytes(fd, entryPos + 8, 4).readUInt32LE()
            let graphicsFlags   = readBytes(fd, entryPos + 12, 4).readUInt32LE()
            let name            = readStringUnsafe(fd, namesPos + namePos)

            //--- Sometimes resources size are stored somewhere else when too big.
            if(fileSize === 0xFFFFFF) {
                // BinaryReader cfr = File.CurrentFileReader;
                // long opos = cfr.BaseStream.Position;
                // cfr.BaseStream.Position = File.StartPos + ((long)FileOffset * 512); //need to use the base offset!!
                // var buf = cfr.ReadBytes(16);
                // FileSize = ((uint)buf[7] << 0) | ((uint)buf[14] << 8) | ((uint)buf[5] << 16) | ((uint)buf[2] << 24);
                // cfr.BaseStream.Position = opos;
            }

            //--- Get resource version.
            let sv = (systemFlags >> 28) & 0xF;
            let gv = (graphicsFlags >> 28) & 0xF;
            let version = ((sv << 4) + gv);

            entries.push({
                name,
                hash: hash(name),
                version,
                fileSize: fileSize,
                fileOffset: fileOffset,
                fileIsCompressed: false,
                type: 'RESOURCE',
            })
        }
    })

    //--- Validation
    if(version !== RPF_VERSION_RPF7) 
        throw Error('Invalid RPF - File version does not match GTAV.')

    //--- Define archive file name
    let filename = path?.split('/').pop()

    //--- Assign parent name and extension to entries.
    entries.forEach((entry, index) => {

        //--- Set the extension name.
        if(entry.type !== 'DIRECTORY') entry.extension = entry.name?.split('.').pop()

        //--- Find the parent by checking if we are in his entries.
        const parent = entries
            .find((v,k) => inRange(index, v.entriesIndex, v.entriesIndex + v.entriesCount))

        //--- If a parent is found, save it and define the relative path.
        if(!!parent){
            entry.parent = parent.name
            entry.path = parent.name !== 'root'
                ? [parent.name, entry.name].filter(v=>!!v).join('/')
                : entry.name
        }
    })

    //--- Delete superfluous data.
    entries.forEach(entry => {
        delete entry.entriesIndex
        delete entry.entriesCount
    })

    //--- Define and return the archive's manifest.
    return {
        fd: fd,
        size: size,
        name: filename,
        entries: entries,
        version: {[RPF_VERSION_RPF7]: 'RPF7'}[version],
        encryption: {
            [RPF_ENCRYPTION_NONE_FLAG]: 'NONE',
            [RPF_ENCRYPTION_OPEN_FLAG]: 'OPEN',
            [RPF_ENCRYPTION_AES_FLAG]: 'AES',
            [RPF_ENCRYPTION_NG_FLAG]: 'NG'
        }[encryption],
    }
}
