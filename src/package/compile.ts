
//--- Import dependencies.
// import set from 'lodash/set'
// import mergeConfig from './mergeConfig'
// import compileVehicleBase from './compileVehicleBase'

import { Metadata } from '../metadata'

export default function compile(manifest, pool = {}){

    //--- Build manifest. 
    // manifest = {
    //     ...manifest,
    //     // ...compileVehicleBase(manifest.base, pool),
    //     // ...compileVehicleMake(manifest.make, pool),
    //     // ...compileVehicleEngine(manifest.engine, pool),
    //     // ...compileVehicleTransmission(manifest.transmission, pool),
    // }

    //--- Init returned object.
    const metadata = new Metadata({
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
    })

    //--- Return meta.
    return metadata
}