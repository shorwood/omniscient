//--- Import depdendencies
import type { MetadataTypes as M } from './index'

export interface CVehicleModelInfoVariation {
    variationData: VariationData[]
}

export interface VariationData {
    modelName: M.String
    colors: Color[]
    kits: M.String[]
    windowsWithExposedEdges: WindowsWithExposedEdges
    plateProbabilities: PlateProbabilities
    lightSettings: M.Int
    sirenSettings: M.Int
}

export interface Color {
    indices: M.CharArray
    liveries: M.Boolean[]
}

export interface WindowsWithExposedEdges {}

export interface PlateProbabilities {
    Probabilities: M.Empty
}
