export * from './manifest'

/** Defines manifest file format. */
export type PackageFileFormat = 'json' | 'yml' | 'yml'

import type { CVehicleModelInfoInitDataList } from '../../metadata/types'
export interface PackageFileList {
    'data/vehicles.meta'?: { CVehicleModelInfo__InitDataList: CVehicleModelInfoInitDataList },
    // 'data/handling.meta': { CHandlingDataMgr },
    // 'data/carcols.meta': {},
    // 'data/carvariations.meta': {},
    // 'data/shop_vehicle.meta': {},
    // 'data/dlctext.meta': { CExtraTextMetaFile },
    // 'content.xml': { CDataFileMgr__ContentsOfDataFileXml },
    // 'setup2.xml': { CDataFileMgr__ContentsOfDataFileXml },
    [x: string]: any
}