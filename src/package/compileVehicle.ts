
//--- Import dependencies.
// import set from 'lodash/set'
// import mergeConfig from './mergeConfig'
// import compileVehicleBase from './compileVehicleBase'

import type { MetadataObject } from '../metadata/types'

export default function compileVehicle(manifest, pool){

    //--- Build manifest. 
    manifest = {
        ...manifest,
        // ...compileVehicleBase(manifest.base, pool),
        // ...compileVehicleMake(manifest.make, pool),
        // ...compileVehicleEngine(manifest.engine, pool),
        // ...compileVehicleTransmission(manifest.transmission, pool),
    }

    //--- Init returned object.
    const metadata: MetadataObject = {
        'CVehicleModelInfo__InitDataList': {
            'residentTxd': 'vehshare',
            'residentAnims': {},
            'InitDatas': [{
                modelName: manifest.name,
                txdName: manifest.name,
                handlingId: manifest.name,
                gameName: manifest.displayName,
                vehicleMakeName: manifest.modelMake,
                ...manifest.initData,
            }],
            'txdRelationships': [],
        },
        'CHandlingDataMgr': {
            'HandlingData': [{
                handlingName: manifest.name,
                ...manifest.handlingData,
            }],
        },
        'CExtraTextMetaFile': {
            hasGlobalTextFile: true,
            hasAdditionalText: false,
            isTitleUpdate: false
        }
    }

    //--- Return meta.
    return metadata
}