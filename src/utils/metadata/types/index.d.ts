


import { CVehicleModelInfoInitDataList } from './CVehicleModelInfoInitDataList'

export interface MetadataObject {
    CVehicleModelInfo__InitDataList?: CVehicleModelInfoInitDataList
    [x: string]: any
}

/** Defines metadata file format. */
export type MetadataFileFormat = 'json' | 'yaml' | 'yml' | 'meta' | 'xml'


export namespace MetadataBasicTypes{
    /** Basic boolean. */
    type Boolean = boolean
    /** 8-bit unsigned interger. */
    type Char = bigint
    /** 32-bit unsigned interger. */
    type Short = bigint
    /** 64-bit unsigned interger. */
    type Int = bigint
    /** Float number. */
    type Float = number
    /** Basic string. */
    type String = string
    /** Flag(s) stored in a `string` or `Array<string>`. */
    type Flags = string[] | string
    /** Empty object that translates to self closing element. */ 
    interface Empty {}
    /** Used for 3D positions. */ 
    interface Vec3Float {
        _x: Float;
        _y: Float; 
        _z: Float;
    }
}