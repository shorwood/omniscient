
//--- Import dependencies.
import { js2xml } from 'xml-js'
import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import isFinite from 'lodash/isFinite'
import mapValues from 'lodash/mapValues'
import every from 'lodash/every'
import some from 'lodash/some'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import mapKeys from 'lodash/mapKeys'
import castArray from 'lodash/castArray'
import isString from 'lodash/isString'
import isObjectLike from 'lodash/isObjectLike'

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
 * Parse a value from its xml-js output to allow for two-way transpilation between `.json` and `.xml` format.
 * @param {string} value Value to parse.
 * @param {string} key Name of the value to parse.
 * @return {* | array} Returns the parsed value.
 */
function stringifyMetaValue(value, key){

    //--- Process basic values such as `bool`, `number`, hex and `string`.
         if(isBoolean(value)) return {_attributes: {value}}
    else if(isNumber(value)) return {_attributes: {value: value.toFixed(6)}}
    else if(isString(value) && isHexString(value)) return {_attributes: {value}}
    else if(isString(value) && isContentString(value)) return toContentObject(value)
    else if(isString(value)) return {_text: value}

    //--- Process array or flag list.
    else if(isArray(value) && key.includes('flag')) return {_text: value.join(' ')}
    else if(isArray(value)) return {Item: value.map(stringifyMetaValue)}

    //--- Process objects.
    else if(isObjectLike(value)) {

        //--- If the object contains `_name` variables, translate them to an `_attributes` object.
        if(some(value, (value, key) => key.startsWith('_'))) {
            let _attributes = pickBy(value, (value, key) => key.startsWith('_'))
            _attributes = mapKeys(_attributes, (value, key) => key.slice(1))
            _attributes = mapValues(_attributes, value => {
                value = stringifyMetaValue(value)
                return value._attributes?.value ?? value._text
            })
            const nodes = omitBy(value, (value, key) => key.startsWith('_'))
            return {_attributes, ...mapValues(nodes, stringifyMetaValue)}
        }

        //--- Process object properties.
        return mapValues(value, stringifyMetaValue)
    }

    //--- Fallback.
    return value
}

export default function stringifyMeta(object){

    //--- Add declation info and pre-processed objects
    object = stringifyMetaValue(object)
    object = {
        _declaration: { _attributes: { version: '1.0', encoding: 'UTF-8' }},
        ...object,
    }

    //--- Strigify object to XML.
    return js2xml(object, {
        spaces: 4,
        compact: true,
        ignoreComment: true,
    })
}