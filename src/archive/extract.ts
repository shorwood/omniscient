import type { ArchiveData, ArchiveEntry } from './types'
import { inflateRawSync } from 'zlib'
import { readSync } from 'fs'

export function extract(
    data: ArchiveData, 
    source: string
): Buffer | Record<string, Buffer> {

    //--- Make sure we can still read from the file.
    if(data.fd <= 0) throw new Error(`Critical error: File descriptor is invalid.`)

    //--- Find the entry and throw an error if not found.
    const entry: ArchiveEntry = source 
        ? data.entries.find(entry => entry?.path === source)
        : data.entries[0]

    //--- Make sure we actually save something.
    if(!entry) throw new Error(`The file "${source}" could not be found in the archive "${data.name}".`)

    //--- Extract as raw file.
    if(entry.type === 'BINARY' || entry.type === 'RESOURCE'){

        //--- Expose the size and pointer of the data.
        const position = entry.fileOffset * 512
        const length = entry.fileSize
        const buffer = Buffer.alloc(length)
    
        //--- Extract the file data from the
        readSync(data.fd, buffer, {position, length})
    
        //--- Return the data. If the file is compressed, inflate it using 'zlib'.
        return entry.fileIsCompressed ? inflateRawSync(buffer) : buffer
    }

    //--- Extract all files of the directory.
    if(entry.type === 'DIRECTORY'){

        //--- Filter all the files that will be extracted from the directory.
        let childEntries = data.entries.filter(childEntry => childEntry.type !== 'DIRECTORY') 
        if(source) childEntries = childEntries.filter(childEntry => childEntry.path?.startsWith(source))

        //--- Compile all entries into a record of <filePath : fileDataBuffer>
        let buffers: Record<string, Buffer> = {}
        childEntries.forEach(childEntry => 
            buffers[childEntry.path] = extract(data, childEntry.path) as Buffer)

        //--- Return records.
        return buffers
    }
}
