/** Root manifest structure. */
export interface PackageManifest {
    /** Package manifest schema version. */
    version: '1.0'
    /** Package properties. */
    package: Package
    /** Requires packages to function. (eg - `openiv: 4.0`) */
    dependencies?: Record<string, string>
    /** Files to deploy in the installation folder.
     * You can append `:{destination}` to specify where to deploy the file.
     * (eg - `DotNetScript.dll:script/DotNetScript.dll`)
     */
    assets?: string[]
    /** Vehicle properties. */
    vehicles?: Vehicle[]
}

/** Package properties. */
export interface Package {
    /** Internal name of the package in kebab-case. (eg - `native-trainer`) */
    name: string
    /** Version of the package. (eg - `1.0.0`) */
    version: string
    /** Supported game version by the package. */
    gameVersion: string
    /** Name of the package displayed in the app and website. */
    displayName: string
    /** Username(s) of the package authors(s) */
    author: string | string[]
    /** Short description of the package. */
    description?: string
    /** Array of tags to classify the package. */
    tags?: string[]
    /** Repository from where the package is stored.
     * It can be a download link or a git repository suffixed with the package folder path 
     * If this field contains an array, the links are treated as mirrors with the first ones being of highest priority.
     * @example
     * repository: 'https://github.com/shorwood/omniscient/packages/openiv'
     * repository: 'https://www.gta5-mods.com/tools/scripthookv-net/download/77132'
     */
    repository?: string | string[]
}

/** Vehicle properties. */
export interface Vehicle {
    /** Internal name of the vehicle in snake-case. (eg - `toyota_camry_2019`) */
    name: string
    /** Name of the vehicle displayed in the app and website. (eg - `Toyota Camry 2019`) */
    displayName: string
    /** Name of the vehicle displayed in the game. (eg - `Camry`) */
    gameName: string
}