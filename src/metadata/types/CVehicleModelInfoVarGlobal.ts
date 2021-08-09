//--- Import depdendencies
import type { MetadataTypes as M } from './index'

export interface CVehicleModelInfoVarGlobal {
    Kits?: KitSet[]
    Lights?: LightSet[]
}

export interface KitSet {
    kitName?: M.String
    id?: M.Float
    kitType?: M.String
    visibleMods?: VisibleMod[]
    linkMods?: LinkMod[]
    statMods?: StatMod[]
    slotNames?: SlotName[]
    liveryNames?: LiveryName[]
}

export interface SlotName {}
export interface LinkedModel {}
export interface LinkMod {}
export interface LiveryName {}

export interface VisibleMod {
    modelName?: M.String
    modShopLabel?: M.String
    linkedModels?: LinkedModel[]
    turnOffBones?: M.String[]
    type?: M.String
    bone?: M.String
    collisionBone?: M.String
    cameraPos?: M.String
    audioApply?: M.Float
    weight?: M.Float
    turnOffExtra?: M.Boolean
    disableBonnetCamera?: M.Boolean
    allowBonnetSlide?: M.Boolean
}

export interface StatMod {
    identifier?: any
    modifier?: M.Float
    audioApply?: M.Float
    weight?: M.Float
    type?: M.String
}

export interface LightSet {
    id?: M.Float
    indicator?: Light
    rearIndicatorCorona?: Corona
    frontIndicatorCorona?: Corona
    tailLight?: Light
    tailLightCorona?: Corona
    tailLightMiddleCorona?: Corona
    headLight?: Light
    headLightCorona?: Corona
    reversingLight?: Light
    reversingLightCorona?: Corona
    name?: M.String
}

export interface Light {
    intensity?: M.Float
    falloffMax?: M.Float
    falloffExponent?: M.Float
    innerConeAngle?: M.Float
    outerConeAngle?: M.Float
    emmissiveBoost?: M.Boolean
    color?: M.String
    textureName?: M.String
    mirrorTexture?: M.Boolean
}

export interface Corona {
    size?: M.Float
    size_far?: M.Float
    intensity?: M.Float
    intensity_far?: M.Float
    color?: M.String
    numCoronas?: M.Float
    distBetweenCoronas?: M.Float
    distBetweenCoronas_far?: M.Float
    xRotation?: M.Float
    yRotation?: M.Float
    zRotation?: M.Float
    zBias?: M.Float
    pullCoronaIn?: M.Boolean
}