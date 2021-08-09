//--- Import depdendencies
import type { MetadataTypes as M } from './index'

export interface SSetupData {
    deviceName?: M.String
    datFile?: M.String
    timeStamp?: M.String
    nameHash?: M.String
    contentChangeSetGroups?: ContentChangeSetGroup[]
    type?: M.String
    order?: M.Int
}

export interface ContentChangeSetGroup {
    NameHash?: M.String
    ContentChangeSets?: M.String[]
}
