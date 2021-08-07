
//--- Import dependencies.
import { isString } from 'lodash-es'
import { load, parse, stringify } from '@utils'
import { PackageManifest, PackageFileFormat } from './types'

//--- Import methods.
import compile from './compile'
export { compile }

export class Package {

    private manifest: Object
    public get(){return this.manifest}
    public set(value: Object){this.manifest = value}

    /**
     * Creates an instance of Package.
     * @param {PackageManifest} objectOrPath Object to instiantiate or path to load from.
     * @param {PackageFileFormat} [format] Override format detection and force file format.
     */
    constructor(objectOrPath: PackageManifest, format?: PackageFileFormat){
        this.manifest = isString(objectOrPath) ? load(objectOrPath, format) : objectOrPath
    }

    //--- Declare static methods.
    static parse = parse
    static stringify = stringify

    //--- Declare public methods.
    public stringify() {return stringify(this.manifest)}
    public compile() {return compile(this.manifest, {})}
}