import {encoded, translations} from './data.js'
import {decodeData, findUniqueIds} from './utils.js'

console.log("Let's rock")
console.log(encoded, translations)

const decoded = decodeData(encoded, translations);
const uniqueIds = findUniqueIds(encoded);

console.log('Расшифрованные данные:', decoded);
console.log('Уникальные ID:', uniqueIds);


// console.log(decoded)
