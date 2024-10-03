describe('polyfill', () => {
    const originalUnion = Set.prototype.union;
    let PolyfilledSet;

    afterAll(() => {
        Set.prototype.union = originalUnion;
    });
    beforeAll(() => {
        Set.prototype.union = null;
    });
    test('Set.union is removed', () => {
        const testSet = new Set();
        expect(testSet.union).toBeNull();
    });
    describe('is still a set', () => {
        beforeAll(() => {
            PolyfilledSet = require('../src/set-union-polyfill');
        });

        test('typeof', ()=> {
            expect(typeof PolyfilledSet).toEqual(typeof Set);
        });
        test('properties', ()=> {
            const setProperties = new Set(Object.getOwnPropertyNames(Set.prototype));
            setProperties.delete('union');

            const polyfilledSetProperties = new PolyfilledSet(Object.getOwnPropertyNames(PolyfilledSet.prototype));
            polyfilledSetProperties.delete('union');

            expect(setProperties.size).toEqual(polyfilledSetProperties.size);

            const matchingProperties = new Set(setProperties);
            for (const property of polyfilledSetProperties) {
                expect(PolyfilledSet[property] === Set[property]).toBe(true);
                matchingProperties.delete(property);
            }
            expect(matchingProperties.size).toEqual(0);
            
        });
    });
    describe('functionality', () => {
        beforeAll(() => {
            PolyfilledSet = require('../src/set-union-polyfill');
        });
        test('union uniques', () => {
            const firstSetItems = [1,2,3];
            const secondSetItems = [4,5,6];
            const fullSetItems = [...firstSetItems, ...secondSetItems];
            const firstSet = new PolyfilledSet(firstSetItems);
            const secondSet = new Set(secondSetItems);
            const mergedSet = firstSet.union(secondSet);

            expect(firstSet.size).toBe(firstSetItems.length);
            expect(secondSet.size).toBe(secondSetItems.length);
            expect(mergedSet.size).toBe(fullSetItems.length);
            fullSetItems.forEach((item) => {
                expect(mergedSet.has(item)).toBe(true);
            });
        });
        test('union duplicates', () => {
            const firstSetItems = [1,2,3];
            const secondSetItems = [1,2,3];
            const fullSetItems = [...firstSetItems, ...secondSetItems];
            const firstSet = new PolyfilledSet(firstSetItems);
            const secondSet = new Set(secondSetItems);
            const mergedSet = firstSet.union(secondSet);

            expect(firstSet.size).toBe(firstSetItems.length);
            expect(secondSet.size).toBe(secondSetItems.length);
            expect(mergedSet.size).toBe(3);
            fullSetItems.forEach((item) => {
                expect(mergedSet.has(item)).toBe(true);
            });
        });
    });
});