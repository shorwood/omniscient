
//--- Import dependencies.
import set from 'lodash/set'
import mergeConfig from './mergeConfig'
import compileVehicleBase from './compileVehicleBase'

export default function compileVehicle(config){

    //--- Get base config from an other entity as default.
    const base = compileVehicleBase(config.base ?? 'fugitive', 'vehicles')

    //--- Init returned object.
    const compiledVehicleConfig = {
        'vehicles': {
            'CVehicleModelInfo__InitDataList': {
                'InitDatas': [{
                    modelName: config.name,
                    txdName: config.name,
                    handlingId: config.name,
                    gameName: config.modelName,
                    ...compileVehicleMake(config.modelMake),
                }]
            },
            'txdRelationships': [],
        },
        'handling': {
            'CHandlingDataMgr': {
                'HandlingData': [{
                    handlingName: config.name,
                    ...compileVehicleTransmission(config.transmission),
                }],
            }
        },
        'carcols': {},
        'carvariations': {},
        'shop_vehicle': {},
        'dlctext': {
            'CExtraTextMetaFile': {
                hasGlobalTextFile: true,
                hasAdditionalText: false,
                isTitleUpdate: false
            }
        }
    }

    //--- Compile
    const vehicleInit = {
        ...compileVehicleTransmission(config.transmission),
    }

    //--- Return meta.
    return vehicleMeta
}