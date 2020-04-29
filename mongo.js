const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://ryand:ryand123@cluster0-oustz.mongodb.net/products_test?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  // This does not yet make the connection.
  // It simply tells the code which DB will be conntected to
  const client = new MongoClient(url);

  // We use a try/catch because making a connection to the server
  // can fail. Therefore we try to make sure we handle a failure.
  try {
    // Create an asyncronous operation
    await client.connect();
    // Once it is connected
    const db = client.db();
    // Then we go to the collection that we want. NOTE: If it
    // doesn't exist then the data is added to a newly created
    // collection. If the collection exists then we just add it.
    const result = db.collection("products").insertOne(newProduct);
  } catch (error) {
    // And stop the code execution.
    return req.json({ message: "Could not store data" });
  }

  // Once we open a connection, we do something, then close the connection.
  // We do this so that we don't have many many connections open with the DB.
  client.close();

  // Then we send the response containing the product
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    return req.json({ message: "Could not get products" });
  }

  client.close();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
