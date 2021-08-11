
//--- Import dependencies.
import { isString } from 'lodash-es'
import { load } from '@/utils'
import type { MetadataObject, MetadataFileFormat } from './types'

//--- Import methods.
import { merge } from './merge'
import { parse } from './parse'
import { stringify } from './stringify'
export { merge, parse, stringify }

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

    //--- Instance methods.
    public stringify() {
        return stringify(this.metadata)
    }

    public merge(source: Metadata) {
        this.metadata = merge(this.metadata, source.metadata)
        return this
    }

    //--- Static methods.
    static parse(xml: string) {return new Metadata(parse(xml))}
    static stringify = stringify
}