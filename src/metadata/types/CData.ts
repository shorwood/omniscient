//--- Import depdendencies
import type { MetadataTypes as M } from './index'

export interface CData {
    disabledFiles?: DisabledFile[]
    includedXmlFiles?: IncludedXmlFile[]
    includedDataFiles?: IncludedDataFile[]
    dataFiles?: DataFile[]
    contentChangeSets?: ContentChangeSet[]
    patchFiles?: PatchFile[]
}

export interface DisabledFile {}
export interface IncludedXmlFile {}
export interface IncludedDataFile {}

export interface DataFile {
    filename?: M.String
    fileType?: M.String
    overlay?: M.Boolean
    disabled?: M.Boolean
    persistent?: M.Boolean
}

export interface ContentChangeSet {
    changeSetName?: M.String
    filesToDisable?: FilesToDisable
    filesToEnable?: M.String[]
    txdToLoad?: TxdToLoad
    txdToUnload?: TxdToUnload
    residentResources?: ResidentResource[]
    unregisterResources?: UnregisterResource[]
}

export interface FilesToDisable {}
export interface TxdToLoad {}
export interface TxdToUnload {}
export interface ResidentResource {}
export interface UnregisterResource {}
export interface PatchFile {}
