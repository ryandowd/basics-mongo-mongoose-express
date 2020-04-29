const mongoose = require("mongoose");

// HERE we create a SCHEMA/BLUEPRINT/MODEL for a set of data that we want to
// store in the DB. Mongoose makes it easy to create these 'models' so that we
// can use it as a contructor object blah blah.
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

// NOTE: The first param passed to the model() func (in this case "Product")
// is actually the identifier for the collection. In other words, a collection
// will be made (or if made, it will be used) that is based off this string. And
// in this case it will be 'products' because colllection names are made lowercase
// and it will also make it plural form.
module.exports = mongoose.model("Product", productSchema);
