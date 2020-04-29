const mongoose = require("mongoose");

const Product = require("./models/product");

// Unlike mongoclient, mongoose will handle the connection without having to open/close connections
// So it handles the connection between the server and the DB with 'connection pooling'
mongoose
  .connect(
    "mongodb+srv://ryand:ryand123@cluster0-oustz.mongodb.net/products_test?retryWrites=true&w=majority"
  )
  // Connect returns a promise. So we can use 'then()'
  .then(() => {
    console.log("Connected to database!");
  })
  // And 'catch()'
  .catch((error) => {
    console.log("Connection failed!");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  //   console.log(typeof createdProduct.id);

  // The 'save()' method is created by mongoose. This method does all the heavy lifitng
  const result = await createdProduct.save();
  res.json(result);
};

const getProducts = async (req, res, next) => {
  // Exec will turn the 'find()' command into a promise
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
