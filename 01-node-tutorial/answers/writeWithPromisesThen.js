const { writeFile, readFile } = require("fs").promises;

writeFile("./temp.txt", "First line\n") 
  .then(() => {
    return writeFile("./temp.txt", "Second line\n", { flag: "a" }); // Write 
  })
  .then(() => {
    return writeFile("./temp.txt", "Third line\n", { flag: "a" }); // Write
  })
  .then(() => {
    return readFile("./temp.txt", "utf-8"); // Read 
  })
  .then((data) => {
    console.log("File contents:\n", data); // Log 
  })
  .catch((error) => {
    console.log("An error occurred:", error); //errors
  });
