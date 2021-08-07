
import { omitBy, isEmpty, omit } from 'lodash-es'
import { MetadataObject } from '../metadata/types'
import { PackageFileList } from './types'

export function dispatch(metadata: MetadataObject): PackageFileList {
    
    const {
        CDataFileMgr__ContentsOfDataFileXml,
        SSetupData,
        CVehicleModelInfo__InitDataList,
        CHandlingDataMgr,
        CExtraTextMetaFile,
    } = metadata

    let fileList = {
        'data/vehicles.meta': { CVehicleModelInfo__InitDataList },
        'data/handling.meta': { CHandlingDataMgr },
        'data/carcols.meta': {},
        'data/carvariations.meta': {},
        'data/shop_vehicle.meta': {},
        'data/dlctext.meta': { CExtraTextMetaFile },
        'content.xml': { CDataFileMgr__ContentsOfDataFileXml },
        'setup2.xml': { SSetupData },
    }

    return omitBy(fileList, isEmpty)
}