import type {
    CData,
    SSetupData,
    CVehicleModelInfo, 
    CHandlingData,
} from '@/metadata/types'
export * from './manifest'

/** Defines manifest file format. */
export type PackageFileFormat = 'json' | 'yml' | 'yml'

export interface PackageFileList {
    'setup2.xml': { SSetupData: SSetupData },
    'content.xml': { CDataFileMgr__ContentsOfDataFileXml: CData },
    'data/vehicles.meta'?: { CVehicleModelInfo__InitDataList: CVehicleModelInfo },
    'data/handling.meta'?: { CHandlingDataMgr: CHandlingData },
    // 'data/carcols.meta': {},
    // 'data/carvariations.meta': {},
    // 'data/shop_vehicle.meta': {},
    // 'data/dlctext.meta': { CExtraTextMetaFile: CExtraText },
    // 'x64/data.rpf': string[],
    [x: string]: any
}
