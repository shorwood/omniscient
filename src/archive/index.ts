
//--- Import dependencies.
import { isString } from 'lodash-es'
import { save } from '@/utils'
import type { ArchiveFileFormat, ArchiveData } from './types'

//--- Import methods.
import { load } from './load'
import { extract } from './extract'
export { load, extract }

//--- Define class.
export class Archive {

    private data: ArchiveData
    public get(){return this.data}
    public set(value: ArchiveData){this.data = value}

    /**
     * Creates an instance of an `RPF` Archive.
     * @param {ArchiveData | string} dataOrPath Object to instiantiate or path to load from.
     */
    public constructor(dataOrPath: ArchiveData | string) {
        this.data = isString(dataOrPath) ? load(dataOrPath) : dataOrPath
    }

    public extract(output: string, source: string){
        return extract(this.data, source)
    }
}