//--- Import and export all of the metadata file types.
import { CData } from './CData'
import { SSetupData } from './SSetupData'
import { CExtraText } from './CExtraText'
import { CHandlingData } from './CHandlingData'
import { CVehicleModelInfo } from './CVehicleModelInfo'
import { CVehicleModelInfoVarGlobal } from './CVehicleModelInfoVarGlobal'
import { CVehicleModelInfoVariation } from './CVehicleModelInfoVariation'
export * from './CData'
export * from './SSetupData'
export * from './CExtraText'
export * from './CHandlingData'
export * from './CVehicleModelInfo'
export * from './CVehicleModelInfoVarGlobal'
export * from './CVehicleModelInfoVariation'

/** Defines metadata file format. */
export type MetadataFileFormat = 'json' | 'yaml' | 'yml' | 'meta' | 'xml'

/** Root metadata object. */
export interface MetadataObject {
    /** Manifest of a DLC archive defined in `./content.xml` */
    CDataFileMgr__ContentsOfDataFileXml?: CData
    /** Manifest of a DLC archive defined in `./setup2.xml` */
    SSetupData?: SSetupData
    /** Extra metadata of a DLC archive defined in `data/dlctext.xml` */
    CExtraTextMetaFile?: CExtraText
    /** Handling caracteristics of vehicles defined in `data/handling.meta` */
    CHandlingDataMgr?: CHandlingData
    /** Properties of vehicles defined in `data/vehicle.meta` */
    CVehicleModelInfo__InitDataList?: CVehicleModelInfo
    /** Additional properties of vehicles defined in `data/carcols.meta` */
    CVehicleModelInfoVarGlobal?: CVehicleModelInfoVarGlobal
    /** Additional properties of vehicles defined in `data/carvariations.meta` */
    CVehicleModelInfoVariation?: CVehicleModelInfoVariation

    [x: string]: any
}

/** Basic types found in metadata objects. */
export namespace MetadataTypes{
    /** Basic boolean. */
    type Boolean = boolean
    /** 8-bit signed interger. */
    type Char = number
    /** 32-bit signed interger. */
    type Short = number
    /** 64-bit signed interger. */
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
        _x: number;
        _y: number; 
        _z: number;
    }
    /** Typed content array */
    interface TypedArray {
        __type: string
        __value: Array<any>
    }
    interface CharArray extends TypedArray {
        __type: 'char_array'
    }
    interface ShortArray extends TypedArray {
        __type: 'char_array'
    }
    interface FloatArray extends TypedArray {
        __type: 'char_array'
    }
}
