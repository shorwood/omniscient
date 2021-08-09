//--- Import depdendencies
import type { MetadataTypes as M } from './index'

export interface CVehicleModelInfo {
    residentTxd?: M.String | 'vehshare'
    residentAnims?: M.Empty
    InitDatas?: InitData[]
    txdRelationships?: TxdRelationship[]
}

export interface InitData {
    /** Name of the model. */
    modelName?: M.String
    /** Name of the vehicle's texture dictionary. */
    txdName?: M.String
    /** The name used in handling.meta. Default names are written in uppercase. */
    handlingId?: M.String
    /** The vehicle's name corresponding to its GXT2 entry. Displayed when entering the vehicle. */
    gameName?: M.String
    /** The vehicle maker's/manufacturer's name corresponding to its GXT2 entry. */
    vehicleMakeName?: M.String
    /** Unknown use. */
    expressionDictName?: 'null' | 'vehicle'
    /** Unknown use. */
    expressionName?: M.String
    /** Name of Convertible vehicles' roof opening animation. */
    animConvRoofDictName?: M.String
    /** Unknown use. */
    animConvRoofName?: 'null' | 'roof'
    /** Names of the affected windows when a convertible's roof retracts. */
    animConvRoofWindowsAffected?: Array<
        'VEH_EXT_WINDOW_LF' | 
        'VEH_EXT_WINDOW_RF' |
        'VEH_EXT_WINDOW_LR' |
        'VEH_EXT_WINDOW_RR' |
        'VEH_EXT_WINDSCREEN_R'>
    /** Unknown use. */
    ptfxAssetName?: 'null'
    /** Sound of the vehicle. */
    audioNameHash?: M.String
    /** Layout decribes how big the vehicle's collisions are,
     *  and how does a play enter it. And the sitting positions of the seats.
     *  And the number of doors. And how the doors act. */
    layout?:
        'LAYOUT_STD_LOWROOF' |
        'LAYOUT_STANDARD' |
        'LAYOUT_TRUCK' |
        'LAYOUT_BUS' |
        'LAYOUT_COACH' |
        'LAYOUT_VAN_CADDY' |
        'LAYOUT_VAN' |
        'LAYOUT_TRUCK_BARRACKS' |
        'LAYOUT_STD_HIGHWINDOW' |
        'LAYOUT_VAN_MULE' |
        'LAYOUT_LOW_BFINJECTION' |
        'LAYOUT_TRUCK_BIFF' |
        'LAYOUT_BIKE_QUAD' |
        'LAYOUT_BISON' |
        'LAYOUT_VAN_BOXVILLE' |
        'LAYOUT_VAN_BODHI' |
        'LAYOUT_BULLDOZER' |
        'LAYOUT_LOW_RESTRICTED' |
        'LAYOUT_BLIMP' |
        'LAYOUT_RANGER' |
        'LAYOUT_VAN_POLICE' |
        'LAYOUT_TRAIN' |
        'LAYOUT_LOW_CHEETAH' |
        'LAYOUT_CUTTER' |
        'LAYOUT_LOW_DUNE' |
        'LAYOUT_VAN_TRASH' |
        'LAYOUT_4X4' |
        'LAYOUT_DUMPTRUCK' |
        'LAYOUT_TRUCK_DOCKTUG' |
        'LAYOUT_STD_EXITFIXUP' |
        'LAYOUT_LOW_ENTITYXF' |
        'LAYOUT_FIRETRUCK' |
        'LAYOUT_FORK_LIFT' |
        'LAYOUT_STD_HABANERO' |
        'LAYOUT_CRANE' |
        'LAYOUT_LOW_INFERNUS' |
        'LAYOUT_VAN_JOURNEY' |
        'LAYOUT_TRUCK_MIXER' |
        'LAYOUT_TRUCK_TOW' |
        'LAYOUT_MOWER' |
        'LAYOUT_PRISON_BUS' |
        'LAYOUT_VAN_PONY' |
        'LAYOUT_STD_RIPLEY' |
        'LAYOUT_TOURBUS' |
        'LAYOUT_TANK' |
        'LAYOUT_RIOT_VAN' |
        'LAYOUT_RANGER_SANDKING' |
        'LAYOUT_STD_STRATUM' |
        'LAYOUT_ONE_DOOR_VAN' |
        'LAYOUT_TRACTOR2' |
        'LAYOUT_STD_STRETCH' |
        'LAYOUT_STD_ZTYPE' |
        'LAYOUT_BIKE_DIRT' |
        'LAYOUT_BICYCLE_MOUNTAIN' |
        'LAYOUT_BICYCLE_ROAD' |
        'LAYOUT_BICYCLE_FIXTER' |
        'LAYOUT_BICYCLE_CRUISER' |
        'LAYOUT_BICYCLE_BMX' |
        'LAYOUT_BIKE_POLICE' |
        'LAYOUT_BIKE_SPORT' |
        'LAYOUT_BIKE_FREEWAY' |
        'LAYOUT_BIKE_SPORT_BATI' |
        'LAYOUT_BIKE_CHOPPER' |
        'LAYOUT_BIKE_SCOOTER' |
        'LAYOUT_HELI_ANNIHILATOR' |
        'LAYOUT_HELI_BUZZARD' |
        'LAYOUT_HELI' |
        'LAYOUT_HELI_CARGOBOB' |
        'LAYOUT_HELI_SKYLIFT' |
        'LAYOUT_HELI_FROGGER' |
        'LAYOUT_PLANE_CUBAN' |
        'LAYOUT_PLANE_DUSTER' |
        'LAYOUT_PLANE_STUNT' |
        'LAYOUT_PLANE_MAMMATUS' |
        'LAYOUT_PLANE_JUMBO' |
        'LAYOUT_PLANE_JET' |
        'LAYOUT_PLANE_TITAN' |
        'LAYOUT_PLANE_LAZER' |
        'LAYOUT_BOAT_SQUALO' |
        'LAYOUT_BOAT_MARQUIS' |
        'LAYOUT_BOAT_DINGHY' |
        'LAYOUT_BOAT_JETMAX' |
        'LAYOUT_BOAT_PREDATOR' |
        'LAYOUT_BOAT_TROPIC' |
        'LAYOUT_BOAT_JETSKI' |
        'LAYOUT_BOAT_SUBMERSIBLE' |
        'LAYOUT_UNKNOWN' |
        'LAYOUT_PLANE_VELUM' |
        'LAYOUT_BOAT_SUNTRAP'
    /** Unknown use. */
    coverBoundOffsets?: M.String
    /** Type of explosion upon vehicle destruction. */
    explosionInfo?: 
        'EXPLOSION_INFO_DEFAULT' |
        'EXPLOSION_INFO_TRUCK' |
        'EXPLOSION_INFO_TANKER' |
        'EXPLOSION_INFO_PROPTRAILER' |
        'EXPLOSION_INFO_JET' |
        'EXPLOSION_INFO_TITAN' |
        'EXPLOSION_INFO_BOAT_MEDIUM' |
        'EXPLOSION_INFO_MARQUIS' |
        'EXPLOSION_INFO_BOAT_SMALL'
    /** Unknown use. */
    scenarioLayout?: M.Empty
    /** Type of camera when in the vehicle in 3rd person. */
    cameraName?:
        'DEFAULT_FOLLOW_VEHICLE_CAMERA' |
        'FOLLOW_ARTIC_CAMERA' |
        'FOLLOW_UPRIGHT_BIKE_CAMERA' |
        'FOLLOW_JEEP_CAMERA' |
        'FOLLOW_MAVERICK_CAMERA' |
        'FOLLOW_CHEETAH_CAMERA' |
        'FOLLOW_CUTTER_CAMERA' |
        'FOLLOW_FORKLIFT_CAMERA' |
        'FOLLOW_HANDLER_CAMERA' |
        'FOLLOW_TANK_CAMERA' |
        'FOLLOW_TACO_CAMERA' |
        'FOLLOW_BICYCLE_CAMERA' |
        'FOLLOW_UPRIGHT_BICYCLE' |
        'FOLLOW_HELI_CAMERA' |
        'FOLLOW_SKYLIFT_CAMERA' |
        'FOLLOW_MAVERICK_CAMERA' |
        'FOLLOW_PLANE2_CAMERA' |
        'FOLLOW_PLANE_CAMERA' |
        'FOLLOW_TITAN_CAMERA' |
        'FOLLOW_LAZER_CAMERA' |
        'FOLLOW_BOAT_CAMERA' |
        'FOLLOW_YACHT_CAMERA' |
        'FOLLOW_DINGHY_CAMERA' |
        'FOLLOW_JETSKI_CAMERA' |
        'FOLLOW_MINISUB_CAMERA'
    /** Type of camera when aiming from the vehicle in 3rd person. */
    aimCameraName?:
        'ARTIC_AIM_CAMERA' |
        'BIKE_AIM_CAMERA' |
        'BOAT_AIM_CAMERA' |
        'BOX_VEHICLE_AIM_CAMERA' |
        'CARGOBOB_AIM_CAMERA' |
        'CHERRYPICKER_AIM_CAMERA' |
        'CUTTER_AIM_CAMERA' |
        'DEFAULT_THIRD_PERSON_VEHICLE_AIM_CAMERA' |
        'DINGHY_AIM_CAMERA' |
        'FORKLIFT_AIM_CAMERA' |
        'HANDLER_AIM_CAMERA' |
        'HELI_AIM_CAMERA' |
        'JEEP_AIM_CAMERA' |
        'MAVERICK_AIM_CAMERA' |
        'MID_BOX_VEHICLE_AIM_CAMERA' |
        'PLANE_AIM_CAMERA' |
        'SKYLIFT_AIM_CAMERA' |
        'TACO_AIM_CAMERA' |
        'TITAN_AIM_CAMERA' |
        'TRACTOR_AIM_CAMERA' |
        'YACHT_AIM_CAMERA'
    /** Type of camera when in the vehicle from bonnet view. */
    bonnetCameraName?: M.String
    /** Type of camera when in the vehicle in 1st person. */
    povCameraName?: M.String
    FirstPersonDriveByIKOffset?: M.Vec3Float
    FirstPersonDriveByUnarmedIKOffset?: M.Vec3Float
    FirstPersonProjectileDriveByIKOffset?: M.Vec3Float
    FirstPersonProjectileDriveByPassengerIKOffset?: M.Vec3Float
    FirstPersonDriveByLeftPassengerIKOffset?: M.Vec3Float
    FirstPersonDriveByRightPassengerIKOffset?: M.Vec3Float
    FirstPersonDriveByLeftPassengerUnarmedIKOffset?: M.Vec3Float
    FirstPersonDriveByRightPassengerUnarmedIKOffset?: M.Vec3Float
    FirstPersonMobilePhoneOffset?: M.Vec3Float
    FirstPersonPassengerMobilePhoneOffset?: M.Vec3Float
    FirstPersonMobilePhoneSeatIKOffset?: FirstPersonMobilePhoneSeatIKOffset[]
    PovCameraOffset?: M.Vec3Float
    PovCameraVerticalAdjustmentForRollCage?: M.Float
    PovPassengerCameraOffset?: M.Vec3Float
    vfxInfoName?: M.String
    shouldUseCinematicViewMode?: M.Boolean
    shouldCameraTransitionOnClimbUpDown?: M.Boolean
    shouldCameraIgnoreExiting?: M.Boolean
    AllowPretendOccupants?: M.Boolean
    AllowJoyriding?: M.Boolean
    AllowSundayDriving?: M.Boolean
    AllowBodyColorMapping?: M.Boolean
    wheelScale?: M.Float
    wheelScaleRear?: M.Float
    dirtLevelMin?: M.Float
    dirtLevelMax?: M.Float
    envEffScaleMin?: M.Float
    envEffScaleMax?: M.Float
    envEffScaleMin2?: M.Float
    envEffScaleMax2?: M.Float
    damageMapScale?: M.Float
    damageOffsetScale?: M.Float
    diffuseTint?: M.String
    steerWheelMult?: M.Float
    HDTextureDist?: M.Float
    lodDistances?: M.FloatArray
    minSeatHeight?: M.Float
    identicalModelSpawnDistance?: M.Float
    maxNumOfSameColor?: M.Float
    defaultBodyHealth?: M.Float
    pretendOccupantsScale?: M.Float
    visibleSpawnDistScale?: M.Float
    trackerPathWidth?: M.Float
    weaponForceMult?: M.Float
    frequency?: M.Int
    swankness?: 
        'SWANKNESS_1' |
        'SWANKNESS_2' |
        'SWANKNESS_3' |
        'SWANKNESS_4' |
        'SWANKNESS_5'
    maxNum?: M.Float
    flags?: M.String[]
    type?: M.String
    plateType?: M.String
    dashboardType?: M.String
    vehicleClass?: M.String
    wheelType?: M.String
    trailers?: M.Empty
    additionalTrailers?: M.Empty
    drivers?: M.Empty
    extraIncludes?: M.Empty
    doorsWithCollisionWhenClosed?: M.Empty
    driveableDoors?: M.Empty
    bumpersNeedToCollideWithMap?: M.Boolean
    needsRopeTexture?: M.Boolean
    requiredExtras?: M.Empty
    rewards?: M.Empty
    cinematicPartCamera?: M.String[]
    NmBraceOverrideSet?: M.Empty
    buoyancySphereOffset?: M.Vec3Float
    buoyancySphereSizeScale?: M.Float
    pOverrideRagdollThreshold?: POverrideRagdollThreshold
    firstPersonDrivebyData?: M.String[]
}

export interface FirstPersonMobilePhoneSeatIKOffset {
    Offset: M.Vec3Float
    SeatIndex: M.Int
}

export interface POverrideRagdollThreshold {
    _type: M.String
}

export interface TxdRelationship {
    parent: M.String
    child: M.String
}
