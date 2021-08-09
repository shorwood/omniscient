//--- Import depdendencies
import type { MetadataTypes as M } from './index'

export interface CHandlingData {
    /** `handling.meta` is a file that, like in previous GTA games, controls the handling and physics
     * of vehicles. This file is usually located in in `*.rpf\common\data`.
     */
    HandlingData: HandlingData[]
}

export interface HandlingData {
    _type?: 'CHandlingData'
    /** 
     * Used by the vehicles.meta, to identify the handling line of the particular vehicle.
     * 
     * Must not be more than 14 characters.
     */
    handlingName?: M.String
    /** 
     * Measured in Kg, mass is only responsible for the interaction between entities.
     * Let's say its the vehicle's pushing force.
     * 
     * Mass is not at all related to physical agility and does not affect the car's
     * physics at all. Only affects how well the car fares when colliding with other entities.
     * Vehicles, Lamp posts, rocks, etc.
     */
    fMass?: M.Float
    /** The vehicle's body air resistance.
     * 
     * Higher resistance means an eariler perceived loss of power at higher speed,
     * resulting in a lower top speed, as the engine cannot overpower this force.
     * Lower air resistance allows the vehicle to travel faster on the same power.
     * 
     * Working as a multiplier, this value defines how much will air drag scale with
     * speed. The higher the multiplier, the more powerful air resistance will be at
     * high speeds.
     * 
     * - The tug of war between Torque and Drag is not very strong. Your vehicle can
     * easily go over this speed on downhill or under performance upgrades, though
     * not very far.
     * 
     * - Drag works against Torque. Both are measured in G-Forces, the speed at which they
     * even out is the vehicle's top speed. Unlike Downforce, drag is omnidirectional.
     * */
    fInitialDragCoeff?: M.Float
    /**
     * Downforce is a way to gain grip at speed, and can be increased by Spoilers.
     * In V, downforce is represented as two behaviors - an actual down force pressing
     * the car down, and a separate grip gain based on `fDownforceModifier` and a ruleset.
     * 
     * The resulting value is added to the wheel grip, multiply by the four wheels you'd usually have.
     * The value of `fDownforceModifier` can define one of three rulesets for the Downforce calculations:
     * 
     * - **Dynamic**: Between 1.0 and 100. The vehicle gains grip at a variable rate from 0 when
     * static to 0.035 * `fDownforceModifier` at 90% of its top speed.
     * - **Static (high)**: 1.0 or less. The vehicle gains a flat grip increase of 0.035, 0.07
     * if using a tuning Spoiler.
     * - **Static (low)**: 100 or more. The vehicle gains a flat grip increase
     * of 0.0105, 0.01313 if using a spoiler. Active Aero vehicles ignore this value, setting a 0.035
     * gain when the spoiler is raised, up to 0.07 when it pitches down to aid cornering or braking.
     * 
     * There is a fourth ruleset, used on the Open Wheel vehicles, which requires advanced
     * flags and defines specific rates per Spoiler/Bumper. Investigation is still ongoing.
     */
    fDownForceModifier?: M.Float
    /** The percentage of the vehicle's "floating height" after it falls into the water, before sinking.
     * 
     * Default is `0.85` for vanilla, land vehicles. The value will stop sinking the vehicle to float for a 
     * moment before sinking.Boats excluded.
     * 
     * Value: Any percentage. Should be given in decimal.
     * Example: `0.70` for 70%
     * 
     * An invalid number will cause the vehicle to sink without the driver drowning,
     * eventually teleporting the vehicle to the surface.
     */
    fPercentSubmerged?: M.Float
    /**
     * Shifts the center of gravity in meters from side to side.
     * 
     * Values: (0 means that the center of gravity will be in the center of the vehicle.)
     * 
     * - X: -10.0 to 10.0. Positive values move the center of gravity right.
     * - Y: -10.0 to 10.0. Positive values move the center of gravity forwards.
     * - Z: -10.0 to 10.0. Positive values move the center of gravity upwards.
     */
    vecCentreOfMassOffset?: M.Vec3Float
    /** I have no idea what this means, if someone knows, please let me know.
     * 
     * Values:
     * - X: -10.0 to 10.0.
     * - Y: -10.0 to 10.0.
     * - Z: -10.0 to 10.0. */
    vecInertiaMultiplier?: M.Vec3Float
    /** Defines how the power from fInitialDriveForce is distributed between the axles.
     * 
     * Values:
     * - `0.0` means that the vehicle is rear wheel drive.
     * - `1.0` means that the vehicle is front wheel drive.
     * - Any value between `0.01` and `0.99` is four wheel drive.
     * - `0.5` give both front and rear axles equal force, being the perfect 4WD. */
    fDriveBiasFront?: M.Float
    /** 
     * Number of gears at stock.
     * 
     * As gears modulate the fInitialDriveForce up until fInitialDriveMaxFlatVel,
     * keepin a reasonably number of gears for your top speed is reccomended.
     * 
     * Remember Transmission upgrades add one gear total.
     */
    nInitialDriveGears?: M.Float
    /** Also called engine power, it dictates the target acceleration the engine is
     * aiming for, measured in G-Forces. Wheel grip may not be able to cope with it, however.
     * 
     * Gearing modulates this value in ratios to translate it into torque, which is the
     * final acceleration the vehicle will experience.
     * 
     * Electric vehicles bypass this entirely, starting with x5 torque whith drains
     * to x1 at the top speed.
     * */
    fInitialDriveForce?: M.Float
    /** How responsive the engine revs will be to throttle control.
     * It is measured in Higher values will result in faster RPM acceleration and
     * deceleration, while lower values will result in more sluggish RPMs.
     * 
     * Works similar to how a flywheel acts in real-life vehicles, storing drive
     * momentum from the engine. A lighter flywheel can react faster to engine RPM
     * changes with it's lack of weight, while heavier flywheels have higher momentum
     * force which takes more engine power to influence.
     * 
     * Values:
     * - `2.0` translates to the vehicle going from idle to redline in 0.5s
     * - `1.0` translates to the vehicle going from idle to redline in 1s
     * - `0.5` translates to the vehicle going from idle to redline in 2s
     * */
    fDriveInertia?: M.Float
    fClutchChangeRateScaleUpShift?: M.Float
    fClutchChangeRateScaleDownShift?: M.Float
    fInitialDriveMaxFlatVel?: M.Float
    fBrakeForce?: M.Float
    fBrakeBiasFront?: M.Float
    fHandBrakeForce?: M.Float
    fSteeringLock?: M.Float
    fTractionCurveMax?: M.Float
    fTractionCurveMin?: M.Float
    fTractionCurveLateral?: M.Float
    fTractionSpringDeltaMax?: M.Float
    fLowSpeedTractionLossMult?: M.Float
    fCamberStiffnesss?: M.Float
    fTractionBiasFront?: M.Float
    fTractionLossMult?: M.Float
    fSuspensionForce?: M.Float
    fSuspensionCompDamp?: M.Float
    fSuspensionReboundDamp?: M.Float
    fSuspensionUpperLimit?: M.Float
    fSuspensionLowerLimit?: M.Float
    fSuspensionRaise?: M.Float
    fSuspensionBiasFront?: M.Float
    fAntiRollBarForce?: M.Float
    fAntiRollBarBiasFront?: M.Float
    fRollCentreHeightFront?: M.Float
    fRollCentreHeightRear?: M.Float
    fCollisionDamageMult?: M.Float
    fWeaponDamageMult?: M.Float
    fDeformationDamageMult?: M.Float
    fEngineDamageMult?: M.Float
    fPetrolTankVolume?: M.Float
    fOilVolume?: M.Float
    fSeatOffsetDistX?: M.Float
    fSeatOffsetDistY?: M.Float
    fSeatOffsetDistZ?: M.Float
    nMonetaryValue?: M.Float
    strModelFlags?: M.String
    strHandlingFlags?: M.String
    strDamageFlags?: M.String
    AIHandling?: 
        'AVERAGE' |
        'SPORTS_CAR' |
        'TRUCK' |
        'CRAP'
    SubHandlingData?: [
        SubHandlingData, 
        SubHandlingData, 
        SubHandlingData
    ]
}

export interface SubHandlingData {
    _type: any
    [x: string]: unknown
}


// export type SubHandlingData = 
//     CBoatHandlingData |
//     CBikeHandlingData | 
//     CFlyingHandlingData | 
//     CVehicleWeaponHandlingData | 
//     CSubmarineHandlingData | 
//     CTrailerHandlingData | 
//     CBaseSubHandlingData | 
//     CSeaPlaneHandlingData | 
//     CSpecialFlightHandlingData | 
//     CCarHandlingData

// export interface CBoatHandlingData {
//     _type: 'CBoatHandlingData'
//     fBackEndPopUpCarImpulseMult?: M.Float
//     fBackEndPopUpBuildingImpulseMult?: M.Float
//     fBackEndPopUpMaxDeltaSpeed?: M.Float
// }
