// //first method
// const fs = require("fs");
// const readFileSync = fs.readFileSync;
// const writeFileSync = fs.writeFileSync;

//second method- destructured
const {readFileSync, writeFileSync} = require('fs')
const first = readFileSync('./content/first.txt', 'utf-8')
const second = readFileSync('./content/second.txt', 'utf-8');

writeFileSync("./temporary/fileA.txt", `Here is the first line.\n`);
writeFileSync("./temporary/fileA.txt", `Here is the second line.\n`, {flag: 'a'});
writeFileSync("./temporary/fileA.txt", `Here is the third line.\n`, {flag: "a",});
const content = readFileSync('./temporary/fileA.txt', 'utf-8')
console.log('Contents:', content);