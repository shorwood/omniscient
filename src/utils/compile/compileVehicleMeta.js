import _set from 'lodash/set'
import defaultVehicleMeta from '../defaults/vehicleMeta.yml'
import compileVehicleMetaInitDataItem from './compileVehicleMetaInitData'
// import compileVehicleMetaTxdRelationshipsItem from './compileVehicleMetaTxdRelationshipsItem'

export default function compileVehicleMeta(vehicleConfigs){
    const vehicleMeta = defaultVehicleMeta

    //--- Push vehicles metadata into the `InitDatas` array.
    _set(
        vehicleMeta, 
        'CVehicleModelInfo__InitDataList.InitDatas', 
        vehicleConfigs.map(compileVehicleMetaInitDataItem))

    //--- Push texture relationship into the `txdRelationships` array.
    // _set(
    //     vehicleMeta, 
    //     'CVehicleModelInfo__InitDataList.txdRelationships', 
    //     vehicleConfigs.map(compileVehicleMetaTxdRelationshipsItem))

    //--- Return meta.
    return vehicleMeta
}