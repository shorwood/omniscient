
import { omitBy, isEmpty } from 'lodash-es'

export default function dispatchMeta({
    CVehicleModelInfo__InitDataList,
    CHandlingDataMgr,
    CExtraTextMetaFile,
}){
    return omitBy({

        'vehicles.meta': {
            CVehicleModelInfo__InitDataList,
        },

        'handling.meta': {
            CHandlingDataMgr
        },

        'carcols.meta': {},

        'carvariations.meta': {},

        'shop_vehicle.meta': {},

        'dlctext.meta': {
            CExtraTextMetaFile
        }

    }, isEmpty)
}