const express = require("express");
const app = express();
const { products, people } = require("./data");
const morgan = require("morgan");
const authorize = require("./authorize");

app.use(express.static("./methods-public"));
app.use(morgan("tiny"));

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json

// The route to get people
app.get("/api/v1/people", (req, res) => {
  res.status(200).json({success:true, data: people})
});


// The route to add a new person
app.post("/api/v1/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ success: false, message: "Please provide a name" }); 
  }
  
 people.push({ id: people.length + 1, name: req.body.name });
res.status(201).json({ success: true, name: req.body.name }); 
});


app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api/products", (req, res) => {
  res.send("Products");
});

app.get("/api/items", (req, res) => {
  console.log(req.user);
  res.send("Items");
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:productID", (req, res) => {
  const { productID } = req.params;
  const product = products.find((p) => p.id === Number(productID)); //find the product

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "That product was not found." });
  }
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, regex, price } = req.query;
  let filteredProducts = [...products];

  if (regex) {
    const regexPattern = new RegExp(regex, "i");
    filteredProducts = filteredProducts.filter((product) =>
      regexPattern.test(product.name)
    );
  }

  if (search) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit));
  }

  if (filteredProducts.length < 1) {
    // res.status(200).send('No products match your search')
    return res.status(200).json({ success: true, data: [] });
  }
  res.status(200).json({ success: true, data: filteredProducts });

  if (price) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= Number(price)
    );
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
