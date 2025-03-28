const express = require("express");
const app = express();
const logger = require("./logger");

// app.use('/api', logger)
app.use(logger)

app.get("/", logger, (req, res) => {
  res.send("Home");
});

app.get("/about", logger, (req, res) => {
  res.send("About");
});
app.get("/api/products", logger, (req, res) => {
  res.send("Products");
});

app.get("/api/items", logger, (req, res) => {
  res.send("Items");
});

app.listen(3000, (req, res) => {
  console.log("server is listening on port 3000");
});
