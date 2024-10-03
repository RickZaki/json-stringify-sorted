const jsonStringifySorted = require('../src/');

describe('jsonStringifySorted interface', () => {
    test('expect jsonStringifySorted to be a function', () => {
        expect(typeof jsonStringifySorted).toBe('function');
    });
    test('expect jsonStringifySorted to to be undefined with no input', () => {
        expect(jsonStringifySorted()).toBeUndefined();
    });
    test('expect jsonStringifySorted to return a string', () => {
        expect(jsonStringifySorted('')).toBeDefined();
        expect(typeof jsonStringifySorted('')).toBe('string');
    });
});

describe('jsonStringifySorted should match JSON.stringify', () => {
    describe('without spaces', () => {
        test('with a simple object', () => {
            const testSubject = {a:1, b:2, c:3};
            const jsonStringify = JSON.stringify(testSubject);
            const jsonStringifySortedValue = jsonStringifySorted(testSubject);
            
            expect(jsonStringifySortedValue).toEqual(jsonStringify);
        });
        test('with a simple array', () => {
            const testSubject = ['b','c','a'];
            const jsonStringify = JSON.stringify(testSubject);
            const jsonStringifySortedValue = jsonStringifySorted(testSubject);
            
            expect(jsonStringifySortedValue).toEqual(jsonStringify);
        });
        test('with a nested object', () => {
            const testSubject = {a:1, b:2, c: {a:4, b:5}};
            const jsonStringify = JSON.stringify(testSubject);
            const jsonStringifySortedValue = jsonStringifySorted(testSubject);
            
            expect(jsonStringifySortedValue).toEqual(jsonStringify);
        });
        test('with a undefined properties', () => {
            const testSubject = {a:1, b:undefined, c: 3};
            const jsonStringify = JSON.stringify(testSubject);
            const jsonStringifySortedValue = jsonStringifySorted(testSubject);
            
            expect(jsonStringifySortedValue).toEqual(jsonStringify);
        });
        test('with a null properties', () => {
            const testSubject = {a:1, b:null, c: 3};
            const jsonStringify = JSON.stringify(testSubject);
            const jsonStringifySortedValue = jsonStringifySorted(testSubject);
            
            expect(jsonStringifySortedValue).toEqual(jsonStringify);
        });
        test('with a complex object', () => {
            const testSubject = {a:1, b:[8,6,7,5], c: {a:4, b:5}};
            const jsonStringify = JSON.stringify(testSubject);
            const jsonStringifySortedValue = jsonStringifySorted(testSubject);
            
            expect(jsonStringifySortedValue).toEqual(jsonStringify);
        });
    });

    describe('formatting', () => {
        test('with a simple object', () => {
            const testSubject = {a:1, b:2, c:3};
            const jsonStringify = JSON.stringify(testSubject, null, 4);
            const jsonStringifySortedValue = jsonStringifySorted(testSubject, 4);
            
            expect(jsonStringifySortedValue).toEqual(jsonStringify);
        });
        test('with a simple array', () => {
            const testSubject = ['b','c','a'];
            const jsonStringify = JSON.stringify(testSubject, null, 3);
            const jsonStringifySortedValue = jsonStringifySorted(testSubject, 3);
            
            expect(jsonStringifySortedValue).toEqual(jsonStringify);
        });
        test('with a nested object', () => {
            const testSubject = {a:1, b:2, c: {a:4, b:5}};
            const jsonStringify = JSON.stringify(testSubject, null, 2);
            const jsonStringifySortedValue = jsonStringifySorted(testSubject, 2);
            
            expect(jsonStringifySortedValue).toEqual(jsonStringify);
        });
        test('with a complext object', () => {
            const testSubject = {a:1, b:[8,6,7,5], c: {a:4, b:5}};
            const jsonStringify = JSON.stringify(testSubject, null, 10);
            const jsonStringifySortedValue = jsonStringifySorted(testSubject, 10);
            
            expect(jsonStringifySortedValue).toEqual(jsonStringify);
        });
    });
});

describe('jsonStringifySorted sorting behavior', ()=> {
    test('should not re-sort a simple array', () => {
        const testSubject = [8,6,7,5];
        const jsonStringify = JSON.stringify(testSubject);
        const expectedResult = `[8,6,7,5]`;
        const jsonStringifySortedValue = jsonStringifySorted(testSubject);
        
        expect(jsonStringifySortedValue).toEqual(jsonStringify);
        expect(jsonStringifySortedValue).toEqual(expectedResult);
    });
    test('should sort a simple object', () => {
        const testSubject = {c:1, a:9, b:5};
        const expectedResult = `{"a":9,"b":5,"c":1}`;
        const jsonStringifySortedValue = jsonStringifySorted(testSubject);
        
        expect(jsonStringifySortedValue).toEqual(expectedResult);
    });
    test('should sort a nested object', () => {
        const testSubject = {c:{f:99, e:10}, a:9, b:5};
        const expectedResult = `{"a":9,"b":5,"c":{"e":10,"f":99}}`;
        const jsonStringifySortedValue = jsonStringifySorted(testSubject);
        
        expect(jsonStringifySortedValue).toEqual(expectedResult);
    });
    test('should sort with undefined properties', () => {
        const testSubject = {c: undefined, a:9, b:5};
        const expectedResult = `{"a":9,"b":5}`;
        const jsonStringifySortedValue = jsonStringifySorted(testSubject);
        
        expect(jsonStringifySortedValue).toEqual(expectedResult);
    });
    test('should sort with null properties', () => {
        const testSubject = {c: null, a:9, b:5};
        const expectedResult = `{"a":9,"b":5,"c":null}`;
        const jsonStringifySortedValue = jsonStringifySorted(testSubject);
        
        expect(jsonStringifySortedValue).toEqual(expectedResult);
    });
    test('should sort a complex object object', () => {
        const testSubject = {c:{f:99, e:10}, a:[8,6,7,5], b:5};
        const expectedResult = `{"a":[8,6,7,5],"b":5,"c":{"e":10,"f":99}}`;
        const jsonStringifySortedValue = jsonStringifySorted(testSubject);
        
        expect(jsonStringifySortedValue).toEqual(expectedResult);
    });
});


describe('jsonStringifySorted custom sorting', ()=> {
    test('should sort based on key order', () => {
        const testSubject = {id:1, a:9, b: {c: 5, f: 1}};
        const expectedResult = `{
  "b": {
    "c": 5
  },
  "id": 1
}`;
        const keyOrder = ['b', 'id', 'c'];
        const jsonStringifySortedValue = jsonStringifySorted(testSubject, 2, keyOrder);
        
        expect(jsonStringifySortedValue).toEqual(expectedResult);
    });
    test('should sort based on with a custom sorter', () => {
        const testSubject = {id:1, a:9, b:5};
        const expectedResult = `{
  "id": 1,
  "a": 9,
  "b": 5
}`;
        const compareFn = (a, b) =>{
            if ( a === 'id') return -1;
            if ( b === 'id') return 1;
            if (a < b) {
              return -1;
            } else {
              return 1;
            }
        };
        const jsonStringifySortedValue = jsonStringifySorted(testSubject, 2, compareFn);
        
        expect(jsonStringifySortedValue).toEqual(expectedResult);
    });
    test('should sort based on more complex example', () => {
        const testSubject = {a:9, id:1, b:5, c:99};
        const expectedResult = `{
  "id": 1,
  "b": 5,
  "a": 9,
  "c": 99
}`;
        // this compare function forces id, and b to come first in that order, then everything else is alphabetical
        const compareFn = (a, b) =>{
            const keyOrder = ['id', 'b'];
            const aIndex = keyOrder.indexOf(a);
            const bIndex = keyOrder.indexOf(b);
            if (aIndex > -1 || bIndex > -1) {
                if (aIndex == -1) {
                    return 1;
                  } else if (bIndex == -1) {
                    return -1;
                  } else if (aIndex < bIndex) {
                    return -1;
                  } else {
                    return 1;
                  }
            }
            if (a < b) {
              return -1;
            } else {
              return 1;
            }
        };
        const jsonStringifySortedValue = jsonStringifySorted(testSubject, 2, compareFn);
        
        expect(jsonStringifySortedValue).toEqual(expectedResult);
    });
});