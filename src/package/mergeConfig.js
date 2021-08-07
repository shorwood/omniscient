import mergeWith from 'lodash/mergeWith'
import isArray from 'lodash/isArray'

/**
 * Merge two configs deeply and concats arrays.
 * @param {*} object Base config object.
 * @param {*} source Injected config object.
 * @return {*} Returns merged config object.
 */
export default function mergeConfig(object, source) {
    return mergeWith(object, source, (objValue, srcValue) => {
        if (isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    })
}