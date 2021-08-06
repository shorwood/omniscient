
//--- Import dependencies.
import { isString } from 'lodash-es'
import { save, load, parse, stringify } from '@utils'
import { OmniscientManifest, OmniscientFileFormat } from './types'

//--- Import methods.
import compile from './compile'
export { compile }

export class Omniscient {

    private manifest: Object
    public get(){return this.manifest}
    public set(value: Object){this.manifest = value}

    /**
     * Creates an instance of Omniscient.
     * @param {OmniscientManifest} objectOrPath Object to instiantiate or path to load from.
     * @param {OmniscientFileFormat} [format] Override format detection and force file format.
     */
    constructor(objectOrPath: OmniscientManifest, format?: OmniscientFileFormat){
        this.manifest = isString(objectOrPath) ? load(objectOrPath, format) : objectOrPath
    }

    //--- Declare static methods.
    static parse = parse
    static stringify = stringify

    //--- Declare public methods.
    public stringify() {return stringify(this.manifest)}
    public save(filename?: string, format?: OmniscientFileFormat) {return save(this.manifest, filename, format)}
}