//--- Import dependencies.
import type { InitData, HandlingData } from '@/metadata/types'
import type { CountryName } from './country'

/** Root manifest structure. */
export interface PackageManifest {
    /** Manifest schema version. */
    version: '1.0' | 1.0
    /** Package properties. */
    package: Package
    /** 
     * Required packages by the package. Can be external dependencies that will be
     * automaticly downloaded upon compilation, or a relative path to an additional
     * manifest.
     * 
     * Each item can be defined as an object or as string shorthand
     * 
     * **Examples**:
     * - `openiv`
     * - `openiv@4.0.0`
     * - `yca/nissan-gtr-2017@latest`
     * - `./camry-xse-2018.omni.yml`
     * - `./camry-xse-2018/manifest.omni.yml`
     */
    dependencies?: Array<DependencyExternal | DependencyInternal | string>
    /** Files to deploy in the installation folder.
     * You can append `:{destination}` to specify where to deploy the file.
     * (eg - `DotNetScript.dll:script/DotNetScript.dll`)
     */
    assets?: string[]
    /** Vehicles properties. */
    vehicles?: Vehicle[]
    /** Vehicle bodies properties. */
    vehicleModels?: VehicleModel[]
    /** Vehicle makes properties. */
    vehicleMakes?: VehicleMake[]
    /** Vehicle engines properties. */
    vehicleEngines?: VehicleEngine[]
    /** Vehicle engine sounds properties. */
    vehicleEngineSounds?: VehicleEngineSound[]
}

export interface DependencyExternal {
    /** 
     * Package name to download and use as a dependency
     * 
     * **Example**: 
     * - `openiv`
     * - `yca/nissan-gtr-2017`
     */
    package: string
    /** 
     * Version to download. If not specified, the latest version is used
     * 
     * **Example**: 
     * - `latest`
     * - `1.0.5`
     */
    version: string
}

export interface DependencyInternal {
    /** 
     * Relative path from current directroy of the manifest to import.
     * 
     * **Example**: 
     * - `./camry-xse-2018.omni.yml`
     * - `./camry-xse-2018/manifest.omni.yml`
     */
    path: string
}

/** Package properties. */
export interface Package {
    /** Internal name of the package in kebab-case. (eg - `native-trainer`) */
    name: string
    /** Version of the package. */
    version: string
    /** Supported game version by the package. (eg - `1.0.3548`) */
    gameVersion: string
    /** Name of the package displayed in the app and website. */
    displayName: string
    /** Username(s) of the package authors(s) in kebab-case */
    author: string | string[]
    /** Short description of the package. */
    description?: string
    /** Array of tags to classify the package. */
    tags?: string[]
    /** 
     * Repository from where the source of the package is stored.
     * It can be a download link or a git repository suffixed with the package folder
     * path. (eg - `https://github.com/shorwood/omniscient/packages/openiv`)
     */
    repository?: string
}

/** Vehicle properties. */
export interface Vehicle extends 
    Partial<VehicleMake>,
    Partial<VehicleModel>,
    Partial<VehicleEngine>, 
    Partial<VehicleEngineSound>
{
    /** 
     * Internal name of the vehicle in snake-case. (eg - `camry-xse-18`).
     * 
     * Unless the user chose the **replace** option, `modelName` and `handlingName`
     * are defined by concating the vehicle's name and the author's username. 
     * 
     * Example:
     * - Author's username: `shorwood`
     * - Vehicle's name value: `camry-xse-2018`
     * - Final modelName value: `SHOR_CAMRYXSE18`
     */
    name: string
    /** Base metadata config used for the vehicle. Imported from `vehicles` and GTAV
     *  game files */
    base: string
    /** Name of the vehicle displayed in the game. (eg - `Camry`) */
    gameName?: string
    /** Name of the vehicle displayed in the app and website. (eg - `Toyota Camry XSE 2018`) */
    displayName?: string

    /** 
     * Year the car was made. This value is used for classification.
     * 
     * **Example**: `2019`
     */
    year?: number
    /** 
     * Price of the car in **$USD**. This value is used for classification
     * and exported scripts configuration such as **Add-On Vehicle Spawner** and
     * **Premium Deluxe Motorsport Car Dealership**.
     * 
     * **Example**: `32000`
     */
    price?: number | string

    /** Name of the model imported from `vehicleModels` (eg - `camry-xse-2018`) */
    model?: string
    /** Name of the make imported from `vehicleMakes` (eg - `toyota`) */
    make?: string
    /** Name of the engine imported from `vehicleEngines` (eg - `a25a-fxs`) */
    engine?: string
    /** Name of the engine imported from `vehicleEngineSounds` (eg - `a25a-fxs`)*/
    engineSound?: string

    /** Overwrite `CVehicleModelInfo__InitDataList.InitDatas.Item` values located in the `vehicle.meta` file */
    initData?: InitData
    /** Overwrite `CHandlingDataMgr.HandlingData.Item` values located in the `handling.meta` file */
    handlingData?: HandlingData
}

export interface VehicleModel {
    /** Internal name of the body in snake-case. (eg - `camry-xse-2018`) */
    name: string
    /** Path to the 3D model. (eg - `./camry-xse-2018.ytf`) */
    model?: string
    /** Path to the high-poly 3D model. (eg - `./camry-xse-2018_hi.ytf`) */
    modelHigh?: string
    /** Path to the textures. (eg - `./camry-xse-2018_hi.ytd`) */
    modelTextures?: string
    /** Mass of the vehicle in Kg. */
    mass?: number
    /** Downforce of the vehicle at 100 Km/h expressed in Gs (Kg/m) */
    downforce?: number
    /** Coefficient of Drag */
    dragCoefficient?: number
    /** Overwrite `CVehicleModelInfo__InitDataList.InitDatas.Item` values located in the `vehicle.meta` file */
    initData?: InitData
    /** Overwrite `CHandlingDataMgr.HandlingData.Item` values located in the `handling.meta` file */
    handlingData?: HandlingData
}

export interface VehicleMake {
    /** Internal name of the make in snake-case. (eg - `toyota`) */
    name: string
    /** Name of the vehicle displayed in the app and website. (eg - `Toyota Camry 2018`) */
    makeName: string
    /** Name of the country the make originates from. Use `http://country.io/names.json` for references. (eg - `Japan`) */
    countryOfOrigin: CountryName
    /** Overwrite `CVehicleModelInfo__InitDataList.InitDatas.Item` values located in the `vehicle.meta` file */
    initData?: InitData
}

export interface VehicleEngine {
    /** Internal name of the engine in snake-case. (eg - `a25a-fxs`) */
    name: string
    /** Name of the vehicle displayed in the app and website. (eg - `Toyota A25A-FXS`) */
    engineName: string
    /** Max power of the engine in Kw */
    maxPower: number
    /** Max torque of the engine in N.m */
    maxTorque: number
    /** Max speed of the car in Km/h */
    maxSpeed: number
    /** Hash of the sound used for engine's sound (eg - `a25a-fxs`) */
    engineSound: string
    /** Overwrite `CVehicleModelInfo__InitDataList.InitDatas.Item` values located in the `vehicle.meta` file */
    initData?: InitData
    /** Overwrite `CVehicleModelInfo__InitDataList.InitDatas.Item` values located in the `vehicle.meta` file */
    handlingData?: HandlingData
}

export interface VehicleEngineSound {
    /** Internal name of the engine sound in snake-case. (eg - `a25a-fxs`) */
    name: string
    /** Name of the engine sound displayed in the app and website. (eg - `Toyota A25A-FXS`) */
    engineSoundName: string
    /** Path of the `.awc` asset for the engine sound. */
    engineSoundAsset: string
    /** Overwrite `CVehicleModelInfo__InitDataList.InitDatas.Item` values located in the `vehicle.meta` file */
    initData?: InitData
}