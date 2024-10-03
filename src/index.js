// requiring set.union polyfill until more widely supported
const SetWithUnion = require('./set-union-polyfill');


const getNestedKeySet = (currentLevelObject) => {
    let keySet = new SetWithUnion();

    if (typeof currentLevelObject === 'object' && currentLevelObject && !Array.isArray(currentLevelObject)) {
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
    }
    if (Array.isArray(comparator)) sortedKeys = comparator;
    
    return sortedKeys;
}


const jsonStringifySorted = (inputObject, spaces, comparator) => JSON
    .stringify(inputObject, getSortedKeys(inputObject, comparator), spaces);


module.exports = jsonStringifySorted;
