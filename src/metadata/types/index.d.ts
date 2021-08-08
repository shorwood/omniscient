/** Defines metadata file format. */
export type MetadataFileFormat = 'json' | 'yaml' | 'yml' | 'meta' | 'xml'

/** Defines metadata object basic types */
export namespace MetadataBasicTypes{
    /** Basic boolean. */
    type Boolean = boolean
    /** 8-bit unsigned interger. */
    type Char = number
    /** 32-bit unsigned interger. */
    type Short = number
    /** 64-bit unsigned interger. */
    type Int = number
    /** Float number. */
    type Float = number
    /** Basic string. */
    type String = string
    /** Flag(s) stored in a `string` or `Array<string>`. */
    type Flags = string[] | string
    /** Empty object that translates to self closing element. */ 
    type Empty = {} | any
    /** Used for 3D positions. */ 
    interface Vec3Float {
        _x: Float;
        _y: Float; 
        _z: Float;
    }
}

import { CVehicleModelInfo } from './CVehicleModelInfo'
import { CHandlingDataMgr } from './CHandlingDataMgr'
export * from './CVehicleModelInfo'
export * from './CHandlingDataMgr'

export interface MetadataObject {
    /** Values of the vehicle usually defined in `vehicle.meta` */
    CVehicleModelInfo__InitDataList?: CVehicleModelInfo
    /** Handling caracteristics of the vehicle usually defined in `handling.meta` */
    CHandlingDataMgr?: CHandlingDataMgr
    
    [x: string]: any
}