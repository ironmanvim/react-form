export function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function isNotEmpty(obj) {
    return !isEmpty(obj);
}

export function hasOnlyNullKeys(obj) {
    return Object.keys(obj).filter(key => obj[key] !== null).length <= 0;
}

export function oneOf(arr, value) {
    return !!arr.filter(element => element === value).length
}

export function removeKeysFromObject(obj, keys) {
    return Object.keys(obj).reduce((object, key) => {
        if (!oneOf(keys, key)) {
            object[key] = obj[key]
        }
        return object
    }, {})
}

export const commaRegex = /\s*,\s*/;
export const onlyNumbers = /^\d+$/;