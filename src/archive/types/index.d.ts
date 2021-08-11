
export type ArchiveFileFormat = 'rpf'

export interface ArchiveData {
    /** File descriptor of the archive. (if it is open) */
    fd: number
    /** Name of the archive suffixed with the `.rpf` extension. */
    name: string
    /** Size in bytes of the archive. */
    size: number
    /** RPF archive version. It can only be `RPF7` */
    version: 'RPF7' | string
    /** Files and directories of the archive. */
    entries: ArchiveEntry[]
    /** 
     * Encryption type used by the the RPF archive.
     * 
     * Values:
     * - `NONE`: Some modded RPF's may use this. Binary of `0x00000000`
     * - `OPEN`: OpenIV style RPF with unencrypted TOC. Binary of `0x4E45504F`
     * - `AES`:  AES256 encripted archive. Binary of `0x0FFFFFF9`
     * - `NG`: Some modded RPF's may use this. Binary of `0x0FEFFFFF`
     */
     encryption: 'NONE' | 'OPEN' | 'AES' | 'NG' | string
}

export type ArchiveEntry = ArchiveEntryBase & (
    ArchiveEntryDirectory |
    ArchiveEntryBinary |
    ArchiveEntryResource)

export interface ArchiveEntryBase {
    /**
     * Raw name of the file or directory.
     */
    name: string | undefined
    /**
     * Parent directory of the entry.
     */
    parent?: string
    /**
     * Relative path from root of the file or directory.
     */
    path?: string
}

export interface ArchiveEntryDirectory {
    type: 'DIRECTORY'
}

export interface ArchiveEntryBinary {
    type: 'BINARY'
    fileOffset: number
    fileSize: number
    fileSizeUncompressed: number
    fileIsCompressed: boolean
    fileIsEncrypted: boolean
}

export interface ArchiveEntryResource {
    type: 'RESOURCE'
    fileOffset: number
    fileSize: number
    fileSizeUncompressed: number
    fileIsCompressed: boolean
    fileIsEncrypted: boolean
}