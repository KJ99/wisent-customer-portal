
export const convertToCamelCase = value => {
    return convert(value, convertObjectToCamelCase)
}

export const convertToSneakCase = value => {
    return convert(value, convertObjectToSneakCase)
}
const convert = (value, objectConverter) => {
    let result
    if(Array.isArray(value)) {
        result = value.map(item => convert(item, objectConverter))
    } else if(typeof value === 'object' && value != null) {
        result = objectConverter(value)
    } else {
        result = value
    }
    return result
}

const convertObjectToCamelCase = (object) => {
    return convertObject(object, /_./ig, value => value.substr(1).toUpperCase(), convertToCamelCase)
}


const convertObjectToSneakCase = (object) => {
    return convertObject(object, /[A-Z]/g, value => `_${value.toLowerCase()}`, convertToSneakCase)
}

const convertObject = (object, search, replacer, additionalConverter) => {
    const currentKeys = Object.keys(object)
    let convertedKeys = []
    currentKeys.forEach(item => {
        const converted = item.replaceAll(search, replacer)
        convertedKeys.push({ original: item, converted: converted })
    })
    let newObject = {}
    convertedKeys.forEach(item => {
        newObject[item.converted] = additionalConverter(object[item.original])
    })
    return newObject
}