//--- Import dependencies.
import { Metadata } from '@/metadata'
import { compileVehicles } from './compileVehicles'
// import { import } from './import'

export default function compile(manifest){

    //--- Inject dependency metadata.
    // const pool = import(manifest.dependencies)

    //--- Init returned object.
    const metadata = new Metadata({})
        .merge(compileVehicles(manifest))

    //--- Return meta.
    return metadata
}