const SetWithUnion = Set;

SetWithUnion.prototype.union = SetWithUnion.prototype.union || function (additionalSet) {
    const mergedSet = new Set(this);
    
    for (const item of additionalSet) {
        mergedSet.add(item);
    }
    
    return mergedSet;
};

module.exports = SetWithUnion;
