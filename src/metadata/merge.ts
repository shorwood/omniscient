import type { MetadataObject } from './types'
import { mergeWith, isArray } from 'lodash-es'

function customizer(objValue: any, srcValue: any) {
    if(isArray(objValue)) return objValue.concat(srcValue);
}

export function merge(object: MetadataObject, source: MetadataObject){
    return mergeWith(object, source, customizer)
}
