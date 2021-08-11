//--- Import dependencies.
import { Metadata } from '../metadata'
import { PackageManifest } from './types'



/**
 * Compute and compile the vehicles into a `Metadata` instance.
 * @param {PackageManifest} manifest
 * @param {PackageManifest} [pool]
 * @return {Metadata} Returns instance of a `Metadata` object.
 */
export function compileVehicles(manifest: PackageManifest){

    const { vehicles } = manifest

    return new Metadata({})

    //--- Init returned object.
    // const metadata = new Metadata({
    //     'CVehicleModelInfo__InitDataList': {
    //         'residentTxd': 'vehshare',
    //         'residentAnims': {},
    //         'InitDatas': [{
    //             modelName: manifest.name,
    //             txdName: manifest.name,
    //             handlingId: manifest.name,
    //             gameName: manifest.displayName,
    //             vehicleMakeName: manifest.modelMake,
    //             ...manifest.initData,
    //         }],
    //         'txdRelationships': [],
    //     },
    //     'CHandlingDataMgr': {
    //         'HandlingData': [{
    //             handlingName: manifest.name,
    //             ...manifest.handlingData,
    //         }],
    //     },
    //     'CExtraTextMetaFile': {
    //         hasGlobalTextFile: true,
    //         hasAdditionalText: false,
    //         isTitleUpdate: false
    //     }
    // })

    //--- Return meta.
    // return metadata
}