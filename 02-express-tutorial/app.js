console.log("Express Tutorial");

const express = require("express");
const app = express();
const { products } = require("./data");

app.use(express.static("./public"));

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID); // convert productID to number
  const product = products.find((p) => p.id === idToFind); //find the product

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "That product was not found." });
  }
});

app.post("/", (req, res) => {
  res.status(200).send("Received a POST request.");
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(3000, (req, res) => {
  console.log("server is listening on port 3000");
});
