const { createReadStream } = require("fs");
const { chunk } = require("lodash");
const { encode } = require("punycode");

//create stream
const stream = createReadStream("./content/big.txt", {
  encoding: "utf-8",
  highWaterMark: 500,
});

let counter = 0;

//read data
stream.on("data", (chunk) => {
  counter++;
  console.log(`Chunk ${counter}:`, chunk);
});

//when it is done
stream.on("end", () => {
  console.log(`Total ${counter} chunks has been read`);
});

//error
stream.on("error", (error) => {
  console.log(`Error:`, error);
});
