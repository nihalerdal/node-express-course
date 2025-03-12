const {writeFile} = require('fs')
console.log("at start");

writeFile('./temporary/fileB.txt', `Here is the first line.\n`, (err) => {
    if (err){
        console.log('This error happened in first:', err)
        return
    } 
    console.log("First line is done .");
    writeFile('./temporary/fileB.txt', `Here is the second line.\n`, {flag: 'a'}, (err) => {
    if (err){
        console.log("This error happened in second:", err);
        return
    }
    console.log("Second line is done .");
        writeFile('./temporary/fileB.txt', `Here is the third line.\n`, {flag: 'a'}, (err) => {
    if (err){
        console.log("This error happened in third:", err);
        return
    } 
    console.log("Third line is done .");
        })
    })
})
console.log("starting next task");