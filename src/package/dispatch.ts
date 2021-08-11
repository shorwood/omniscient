//--- Import dependencies.
import { MetadataObject } from '../metadata/types'
import { PackageFileList } from './types'

export function dispatch(metadata: MetadataObject): PackageFileList {
    
    const {
        SSetupData,
        CDataFileMgr__ContentsOfDataFileXml,
        CVehicleModelInfo__InitDataList,
        CHandlingDataMgr,
        CExtraTextMetaFile,
    } = metadata

    let fileList = {
        'setup2.xml': { SSetupData },
        'content.xml': { CDataFileMgr__ContentsOfDataFileXml },
        'data/vehicles.meta': { CVehicleModelInfo__InitDataList },
        'data/handling.meta': { CHandlingDataMgr },
        'data/carcols.meta': {},
        'data/carvariations.meta': {},
        'data/dlctext.meta': { CExtraTextMetaFile },
    }

    return fileList
}