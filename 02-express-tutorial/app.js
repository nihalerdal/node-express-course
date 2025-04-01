const express = require("express");
const app = express();
const cookieParser = require("cookie-parser"); 

const { products, people } = require("./data");
const morgan = require("morgan");
const authorize = require("./authorize");
const peopleRouter = require("./routes/people");

app.use(express.static("./methods-public"));
app.use(morgan("tiny"));
app.use(cookieParser()); 

// Middleware to parse URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: false })); // For parsing form data
app.use(express.json()); // For parsing json


//peopleRouter for /api/v1/people route
app.use("/api/v1/people", peopleRouter);


function auth(req, res, next) {
  if (req.cookies.name) {
    req.user = req.cookies.name;
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// Logon endpoint (POST)
app.post('/logon', (req, res) => {
  const { name } = req.body; // Get the name from the request body

  if (name) {
    // Set the 'name' cookie with the value from request body
    res.cookie('name', name);
    res.status(201).json({ message: `Hello, ${name}!` });
  } else {
    res.status(400).json({ error: 'Name is required' });
  }
});

// Logoff endpoint (DELETE)
app.delete('/logoff', (req, res) => {
  res.clearCookie('name');
  res.status(200).json({ message: 'Logged off successfully' });
});

// Test endpoint (GET) - requires authentication
app.get('/test', auth, (req, res) => {
  // This will only be reached if the auth middleware sets req.user
  res.status(200).json({ message: `Welcome, ${req.user}!` });
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
