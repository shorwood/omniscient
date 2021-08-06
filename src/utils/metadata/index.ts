
//--- Import dependencies.
import { isString } from 'lodash-es'
import { load, save } from '@utils'
import type { MetadataObject, MetadataFileFormat } from './types'

//--- Import methods.
import { parse } from './parse'
import { stringify } from './stringify'
export { parse, stringify }

//--- Define class.
export class Metadata {

    private metadata: MetadataObject
    public get(){return this.metadata}
    public set(value: MetadataObject){this.metadata = value}

    /**
     * Creates an instance of Metadata.
     * @param {MetadataObject | string} objectOrPath Object to instiantiate or path to load from.
     * @param {MetadataFileFormat} [format] Override format detection and force file format.
     */
    constructor(objectOrPath: MetadataObject | string, format?: MetadataFileFormat){
        this.metadata = isString(objectOrPath) ? load(objectOrPath, format) : objectOrPath
    }

    //--- Declare static methods.
    static parse = parse
    static stringify = stringify

    //--- Declare public methods.
    public stringify() {return stringify(this.metadata)}
    public save(filename?: string, format?: MetadataFileFormat) {return save(this.metadata, filename, format)}
}