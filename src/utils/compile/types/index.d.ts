
/** Defines manifest file format. */
export type OmniscientFileFormat = 'json' | 'yml' | 'yml'

export interface OmniscientManifest {
    version: '1.0'
    addon: Addon
}

export interface Addon {
    name: string
    displayName: string
    author: string
    tags?: string[]
}