const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/Product");
const methodOverride = require("method-override");
//mongoose.connect('mongodb://localhost:27017/farmStand');

// calls async function with error handling
main().catch((err) => console.log(err));

// defines async function
async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStand");
  console.log("mongo connected");
}
// view settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); //allows us to parse POST req body
app.use(methodOverride("_method")); // to allow form to make put requests

const categories = ["fruit", "vegetable", "dairy", "fungi"];
// index
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});
// serves new form
app.get("/products/new", async (req, res) => {
  res.render("products/new", { categories });
});
// details page
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/show", { product });
});
// creates new product
app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});
// serves edit product form
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product, categories });
});
// updates edited product
// forms can't submit PUT requests so method-override is being used
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidator: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// deletes products
// forms can't submit DELETE requests so method-override is being used
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000");
});
