
//--- Import dependencies.
import { xml2js } from 'xml-js'
import { map, mapValues, mapKeys, castArray, isString, isObjectLike } from 'lodash-es'
import { MetadataObject } from './types'

/**
 *
 *
 * @param {*} value
 * @return {*} 
 */
function parseMetaValueContent(value){
    const content = value._attributes?.content
    const array = value._text.trim().split('\n').map(v=>v.trim()).map(parseValue).join(', ')
    return `${content}(${array})`
}

/**
 * Checks if the value is a decimal number string
 * Example : `isDecimalNumber('0.001')` -> `true`
 * @param value Value to check
 * @returns Returns true if the value is a decimal number.
 */
function isDecimalNumber(value: string): boolean {
    return !!value.trim().match(/^\-?\d+(\.\d+)?$/)
}

/**
 * Parse a value from its xml-js output to allow for two-way transpilation between `.json` and `.xml` format.
 * @param {String} value Value to parse.
 * @param {string} key Name of the value to parse.
 * @return {* | array} Returns the parsed value.
 */
function parseValue(value: any, key?: string | number){

    //--- Parse to basic JS type.
    if(isString(value)) {
        if(value.toLowerCase() === 'false') return false
        if(value.toLowerCase() === 'true') return true
        if(isDecimalNumber(value)) return Number(value)
        return value
    }

    //--- Parse objects.
    else if(isObjectLike(value)) {
             if(value.Item) return map(castArray(value.Item), parseValue)
        else if(value._attributes?.value) return parseValue(value._attributes.value, key)
        else if(value._attributes?.content?.endsWith('array') && value._text) return parseMetaValueContent(value)
        else if(value._attributes) {
            let attributes = value._attributes
            attributes = mapKeys(attributes, (value, key) => `_${key}`)
            attributes = mapValues(attributes, parseValue)
            delete value._attributes
            return {...attributes, ...mapValues(value, parseValue)}
        }
        else if(value._text && typeof key === 'string' && key.toLowerCase().includes('flag')) return value._text.split(' ')
        else if(value._text) return value._text
        return mapValues(value, parseValue)
    }

    //--- Fallback.
    return value
}

/**
 * Parse an XML formated metadata file.
 * @param {string} xml XML markup string.
 * @return {*} Returns parsed object.
 */
export function parse(xml: string): MetadataObject {

    //--- Parse object from XML.
    let object = xml2js(xml, {compact: true, ignoreComment: true }) as any

    //--- Delete declation info and return post-processed object.
    delete object._declaration
    return parseValue(object, 'root') as MetadataObject
}