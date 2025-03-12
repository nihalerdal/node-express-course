//load biult in Path module
const path = require('path')

//seperator
console.log(path.sep); 

//join multiple path segments
const filePath = path.join('/content','subfolder', 'text.txt')
console.log(filePath)

//last filename in the path
const base = path.basename(filePath)
console.log(base)


//absolute path
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute)