// Using require(); to include modules from external sources (files, etc...)
// Third Party modules:
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
// Using two modules which help managing file system the file upload
const fs = require("fs");
const fileUpload = require("express-fileupload");

// First Party modules:
const loginFilter = require("./middleware/login-filter");
const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const shoppingCartsController = require("./controllers/shopping_carts-controller");
const ordersController = require("./controllers/orders-controller");
const citiesController = require("./controllers/cities-controller");
const categoriesController = require("./controllers/categories-controller");
const cartItemsController = require("./controllers/cart_items-controller");
const errorHandler = require("./errors/error-handler");

// Declaring a handler for express()
const server = express();

if (!fs.existsSync("./uploads")) {
  // Must create "/uploads" folder if it does not exist.
  fs.mkdirSync("./uploads");
}

// Registering to Middlewares:

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// Enables other domains to connect to my server
server.use(cors());

// Extracts the JSON from the body and creates a request.body object containing it:
server.use(express.json());

// A middleware which filters which requests require to be logged in or not
server.use(loginFilter());

// Registering to the file upload middleware
server.use(fileUpload());

// On the event of HTTP request that ends with /uploads, serve the uploads folder
server.use("/uploads", express.static("uploads"));

// On the event of HTTP request that ends with /users, usersController handles it
server.use("/users", usersController);

// On the event of HTTP request that ends with /shopping_carts, shoppingCartsController handles it
server.use("/shopping_carts", shoppingCartsController);

// On the event of HTTP request that ends with /products, productsController handles it
server.use("/products", productsController);

// On the event of HTTP request that ends with /orders, ordersController handles it
server.use("/orders", ordersController);

// On the event of HTTP request that ends with /cities, citiesController handles it
server.use("/cities", citiesController);

// On the event of HTTP request that ends with /categories, categoriesController handles it
server.use("/categories", categoriesController);

// On the event of HTTP request that ends with /cart_items, cartItemsController handles it
server.use("/cart_items", cartItemsController);

// Registering to an errorHandler middleware which will handle our errors
server.use(errorHandler);

// Declaring that we're listening to port 3000
server.listen(3000, () => console.log("Listening on http://localhost:3000"));
