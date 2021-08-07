import type { MetadataBasicTypes as M } from './index'

export interface CVehicleModelInfoInitDataList {
    residentTxd: M.String | 'vehshare'
    residentAnims: M.Empty
    InitDatas: InitData[]
    txdRelationships: TxdRelationship[]
}

export interface InitData {
    /** Name of the model. */
    modelName: M.String
    txdName: M.String
    handlingId: M.String
    gameName: M.String
    vehicleMakeName: M.String
    expressionDictName: M.String
    expressionName: M.String
    animConvRoofDictName: M.String
    animConvRoofName: M.String
    animConvRoofWindowsAffected: M.Empty
    ptfxAssetName: M.String
    audioNameHash: M.String
    layout: M.String
    coverBoundOffsets: M.String
    explosionInfo: 
        'EXPLOSION_INFO_DEFAULT' |
        'EXPLOSION_INFO_TRUCK' |
        'EXPLOSION_INFO_TANKER' |
        'EXPLOSION_INFO_PROPTRAILER' |
        'EXPLOSION_INFO_JET' |
        'EXPLOSION_INFO_TITAN' |
        'EXPLOSION_INFO_BOAT_MEDIUM' |
        'EXPLOSION_INFO_MARQUIS' |
        'EXPLOSION_INFO_BOAT_SMALL'
    scenarioLayout: M.Empty
    cameraName: M.String
    aimCameraName: M.String
    bonnetCameraName: M.String
    povCameraName: M.String
    FirstPersonDriveByIKOffset: M.Vec3Float
    FirstPersonDriveByUnarmedIKOffset: M.Vec3Float
    FirstPersonProjectileDriveByIKOffset: M.Vec3Float
    FirstPersonProjectileDriveByPassengerIKOffset: M.Vec3Float
    FirstPersonDriveByLeftPassengerIKOffset: M.Vec3Float
    FirstPersonDriveByRightPassengerIKOffset: M.Vec3Float
    FirstPersonDriveByLeftPassengerUnarmedIKOffset: M.Vec3Float
    FirstPersonDriveByRightPassengerUnarmedIKOffset: M.Vec3Float
    FirstPersonMobilePhoneOffset: M.Vec3Float
    FirstPersonPassengerMobilePhoneOffset: M.Vec3Float
    PovCameraOffset: M.Vec3Float
    PovCameraVerticalAdjustmentForRollCage: M.Float
    PovPassengerCameraOffset: M.Vec3Float
    vfxInfoName: M.String
    shouldUseCinematicViewMode: M.Boolean
    shouldCameraTransitionOnClimbUpDown: M.Boolean
    shouldCameraIgnoreExiting: M.Boolean
    AllowPretendOccupants: M.Boolean
    AllowJoyriding: M.Boolean
    AllowSundayDriving: M.Boolean
    AllowBodyColorMapping: M.Boolean
    wheelScale: M.Float
    wheelScaleRear: M.Float
    dirtLevelMin: M.Float
    dirtLevelMax: M.Float
    envEffScaleMin: M.Float
    envEffScaleMax: M.Float
    envEffScaleMin2: M.Float
    envEffScaleMax2: M.Float
    damageMapScale: M.Float
    damageOffsetScale: M.Float
    diffuseTint: M.String
    steerWheelMult: M.Float
    HDTextureDist: M.Float
    lodDistances: M.String
    minSeatHeight: M.Float
    identicalModelSpawnDistance: M.Float
    maxNumOfSameColor: M.Float
    defaultBodyHealth: M.Float
    pretendOccupantsScale: M.Float
    visibleSpawnDistScale: M.Float
    trackerPathWidth: M.Float
    weaponForceMult: M.Float
    frequency: M.Float
    swankness: M.String
    maxNum: M.Float
    flags?: (M.String)[] | null
    type: M.String
    plateType: M.String
    dashboardType: M.String
    vehicleClass: M.String
    wheelType: M.String
    trailers: M.Empty
    additionalTrailers: M.Empty
    drivers: M.Empty
    extraIncludes: M.Empty
    doorsWithCollisionWhenClosed: M.Empty
    driveableDoors: M.Empty
    bumpersNeedToCollideWithMap: M.Boolean
    needsRopeTexture: M.Boolean
    requiredExtras: M.Empty
    rewards: M.Empty
    cinematicPartCamera?: M.String[]
    NmBraceOverrideSet: M.Empty
    buoyancySphereOffset: M.Vec3Float
    buoyancySphereSizeScale: M.Float
    pOverrideRagdollThreshold: POverrideRagdollThreshold
    firstPersonDrivebyData?: M.String[]
}

export interface POverrideRagdollThreshold {
    _type: M.String
}

export interface TxdRelationship {
    parent: M.String
    child: M.String
}
