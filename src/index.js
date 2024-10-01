// requireing set.union polyfill until more widely supported
const Set = require('core-js/actual/set');

const getNestedKeySet = (currentLevelObject) => {
    let keySet = new Set();

    if (Array.isArray(currentLevelObject)) {
        currentLevelObject.forEach((item) => {
            keySet = keySet.union(getNestedKeySet(item));
        });
    } else if (typeof currentLevelObject === 'object') {
        Object.keys(currentLevelObject).forEach((key) => {
            keySet.add(key);
            keySet = keySet.union(getNestedKeySet(currentLevelObject[key]));
        });
    }

    return keySet;
}

const getSortedKeys = (inputObject, comparator) => {
    let sortedKeys;

    if (typeof comparator === 'function' || comparator === undefined) {
        const unsortedKeys = getNestedKeySet(inputObject);
        sortedKeys = Array.from(unsortedKeys).sort(comparator);
    } else if (Array.isArray(comparator)) sortedKeys = comparator;
    
    return sortedKeys;
}


const jsonStringifySorted = (inputObject, spaces, comparator) => JSON
    .stringify(inputObject, getSortedKeys(inputObject, comparator), spaces);


module.exports = jsonStringifySorted;
