<a id="readme-top"></a>


<div align="center">

[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>


<br />
<div align="center">

<h3 align="center">JSONstringifySorted</h3>

  <p align="center">
    a simple utility that strigifies JSON placing the object keys in a sepcific order.
    <br />
    <a href="https://github.com/RickZaki/json-stringify-sorted/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/RickZaki/json-stringify-sorted/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Objects by their nature are an unordered collection of properties.  JS engines typically serialize objects in consistent ways.  This is perfectly fine for system consumption.  However; human readability can be greatly improved by forcing a particular order.  The use case arose by the desire to save JSON to disk, review by humans and comparison tools.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* Node.js with npm

### Installation

Using npm:
```sh
npm install @RickZaki/json-stringify-sorted
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
### CommonJS
```
const jsonStringifySorted = require('json-stringify-sorted');
```
### ECMAScript Modules
```
import * as jsonStringifySorted from 'json-stringify-sorted';
```
### examples
#### Simple example
```
cont sampleObject = {d:[8,6,7,5,3,0,9], a: 1, c:true, b:"b"};
const sortedObject = jsonStringifySorted(sampleObject);
console.log(sortedObject); // {"a":1,"b":"b","c":true,"d":[8,6,7,5,3,0,9]}
```
AS you can see arrays remain unaltered.

#### Nested example
```
cont sampleObject = {d:{h:"h", e:"e"}, a: 1, c:true, b:"b"};
const sortedObject = jsonStringifySorted(sampleObject);
console.log(sortedObject); // {"a":1,"b":"b","c":true,"d":{"e":"e","h":"h"}}
```
Nested objects are also sorted

#### Key Order
The second optional paramter is used to determine the sort order of the keys.
```
cont sampleObject = {d:{h:"h", e:"e"}, a: 1, c:true, b:"b"};
const sortedObject = jsonStringifySorted(sampleObject, ['a', 'e', 'd', 'c']);
console.log(sortedObject); // {"a":1,"d":{"e":"e"},"c":true}
```
a few ccaveats with this use case:
1. Keys not provided in the order array are omitted from the result
2. The order for root and nested object keys are intertwined.  Should a nested object have the same keys, the order will be identical.  You cann specify a before b on the ancestor, but b before a on descendant.

#### Custom sort function
As the utility uses Array.sort, you can supply a custom sort compare function.
Here's one that forces some keys in order, and the remaining in alphabetical order.
```
const compareFn = (a, b) =>{
    const keyOrder = ['c', 'b'];
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
cont sampleObject = {d:{h:"h", e:"e"}, a: 1, c:true, b:"b"};
const sortedObject = jsonStringifySorted(sampleObject, compareFn);
console.log(sortedObject); // {"c":true,"b":"b","a":1,"d":{"e":"e","h":"h"}}
```


#### Formatting
the third optional parameter is an number of spaces to include in the output.  Just like `JSON.strigify`
```
cont sampleObject = { a: 1, c:true, b:"b"};
const sortedObject = jsonStringifySorted(sampleObject, null, 2);
console.log(sortedObject); /*
{
  "a": 1,
  "b": "b",
  "c": true
}
*/
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Rick Zaki - GitHub-at-RickZaki.com

Project Link: [https://github.com/RickZaki/json-stringify-sorted](https://github.com/RickZaki/json-stringify-sorted)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[issues-shield]: https://img.shields.io/github/issues/RickZaki/json-stringify-sorted.svg?style=for-the-badge
[issues-url]: https://github.com/RickZaki/json-stringify-sorted/issues

[license-shield]: https://img.shields.io/github/license/RickZaki/json-stringify-sorted.svg?style=for-the-badge
[license-url]: https://github.com/RickZaki/json-stringify-sorted/blob/master/LICENSE

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/RickZaki


[Node.js]: https://img.shields.io/badge/node.js-000000?logo=node.js&logoColor=5FA04E&style=for-the-badge
[Node-url]: https://nodejs.org/