
//--- Import dependencies.
import { xml2js } from 'xml-js'
import mapValues from 'lodash/mapValues'
import mapKeys from 'lodash/mapKeys'
import castArray from 'lodash/castArray'
import isString from 'lodash/isString'
import isObjectLike from 'lodash/isObjectLike'

function parseMetaValueContent(value){
    const content = value._attributes?.content
    const array = value._text.trim().split('\n').map(v=>v.trim()).map(parseMetaValue).join(', ')
    return `${content}(${array})`
}

function isDecimalNumber(value){
    return !!value.trim().match(/^\-?\d+(\.\d+)?$/)
}

/**
 * Parse a value from its xml-js output to allow for two-way transpilation between `.json` and `.xml` format.
 * @param {string} value Value to parse.
 * @param {string} key Name of the value to parse.
 * @return {* | array} Returns the parsed value.
 */
function parseMetaValue(value, key){

    //--- Parse to basic JS type.
    if(isString(value)) {
        if(value.toLowerCase() === 'false') return false
        if(value.toLowerCase() === 'true') return true
        if(isDecimalNumber(value)) return Number(value)
        return value
    }

    //--- Parse objects.
    else if(isObjectLike(value)) {
             if(value.Item) return castArray(value.Item).map(parseMetaValue)
        else if(value._attributes?.value) return parseMetaValue(value._attributes.value)
        else if(value._attributes?.content?.endsWith('array') && value._text) return parseMetaValueContent(value)
        else if(value._attributes) {
            let attributes = value._attributes
            attributes = mapKeys(attributes, (value, key) => `_${key}`)
            attributes = mapValues(attributes, parseMetaValue)
            delete value._attributes
            return {...attributes, ...mapValues(value, parseMetaValue)}
        }
        else if(value._text && isString(key) && key.toLowerCase().includes('flag')) return value._text.split(' ')
        else if(value._text) return value._text
        return mapValues(value, parseMetaValue)
    }

    //--- Fallback.
    return value
}

export default function parseMeta(xml){

    //--- Parse object from XML.
    let object = xml2js(xml, {
        compact: true,
        ignoreComment: true,
    })

    //--- Delete declation info and return post-processed object.
    delete object._declaration
    return parseMetaValue(object)
}