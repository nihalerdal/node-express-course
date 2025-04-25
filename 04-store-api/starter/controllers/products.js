const product = require("../models/product");
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  try {
    const products = await Product.find({}).sort("name").select("-name price");
    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong.", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};
    if (featured) {
      queryObject.featured = featured === "true" ? true : false;
    }
    if (company) {
      queryObject.company = company;
    }
    if (name) {
      queryObject.name = { $regex: name, $options: i };
    }
    if (numericFilters) {
      const operatorMap = {
        ">": "$gt",
        ">=": "$gte",
        "=": "$eq",
        "<": "$lt",
        "<=": "$lte",
      };
      const regEx = /\b(<|>|<=|>=|=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );
      const options = ["price", "rating"];
      filters.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
    }
    console.log(queryObject);
    const result = Product.find(queryObject);

    //sort
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sortList;
    } else {
      result = result.sort("createAt");
    }
    if (fields) {
      const fieldsList = sort.split(",").join(" ");
      result = result.fieldsList;
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);
    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { getAllProductsStatic, getAllProducts };
