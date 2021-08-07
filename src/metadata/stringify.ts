
//--- Import dependencies.
import { js2xml } from 'xml-js'
import type { MetadataObject } from './types'
import { 
    mapKeys, mapValues, some, pickBy, omitBy,
    isArray, isNumber, isString, isBoolean, isObjectLike,
} from 'lodash-es'

function isHexString(value){
    return Boolean(value.match(/0x[\da-f]/i))
}

const contentStringRegex = /^((?:float|char|short|int|long|double)*_array)\((.*)\)$/

function isContentString(value){
    return Boolean(value.match(contentStringRegex))
}

function toContentObject(value){
    const [_ ,content, array] = value.match(contentStringRegex)
    return {
        _attributes: {content},
        _text: '\n'+array.split(',')
                .map(v=>v.trim())
                .map(v => content === 'float' ? Number(v).toFixed(6) : v)
                .join('\n')+'\n'
    }
}

/**
 * Pre-process object allow for transpilation to `.xml` format.
 * @param {string} value Value to parse.
 * @param {string} key Name of the value to parse.
 * @return {* | array} Returns the parsed value.
 */
function preprocess(value, key?){

    //--- Process basic values such as `bool`, `number`, hex and `string`.
         if(isBoolean(value)) return {_attributes: {value}}
    else if(isNumber(value)) return {_attributes: {value: value.toFixed(6)}}
    else if(isString(value) && isHexString(value)) return {_attributes: {value}}
    else if(isString(value) && isContentString(value)) return toContentObject(value)
    else if(isString(value)) return {_text: value}

    //--- Process array or flag list.
    else if(isArray(value) && key.includes('flag')) return {_text: value.join(' ')}
    else if(isArray(value)) return {Item: value.map(preprocess)}

    //--- Process objects.
    else if(isObjectLike(value)) {

        //--- If the object contains `_name` variables, translate them to an `_attributes` object.
        if(some(value, (_, key) => key.startsWith('_'))) {
            let _attributes = pickBy(value, (value, key) => key.startsWith('_'))
            _attributes = mapKeys(_attributes, (value, key) => key.slice(1))
            _attributes = mapValues(_attributes, value => {
                value = preprocess(value)
                return value._attributes?.value ?? value._text
            })
            const nodes = omitBy(value, (value, key) => key.startsWith('_'))
            return {_attributes, ...mapValues(nodes, preprocess)}
        }

        //--- Process object properties.
        return mapValues(value, preprocess)
    }

    //--- Fallback.
    return value
}

/**
 * Stringify an object into an XML formated GTA V metadata file.
 * @param {MetadataObject} object GTA V metadata object.
 * @return {string} Returns XML string.
 */
export function stringify(object: MetadataObject): string {

    //--- Add declation info and pre-processed objects
    object = {
        _declaration: { _attributes: { version: '1.0', encoding: 'UTF-8' }},
        ...preprocess(object),
    }

    //--- Strigify object to XML.
    return js2xml(object, {
        spaces: 4,
        compact: true,
        ignoreComment: true,
    })
}