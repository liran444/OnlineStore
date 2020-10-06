const express = require("express");
const router = express.Router();
const productsLogic = require("../logic/products-logic");
const cacheModule = require("../dao/cache-module");

// GET http://localhost:3000/products/
router.get("/", async (request, response, next) => {
  try {
    let products_data = await productsLogic.getAllProducts();
    response.json(products_data);
  } catch (error) {
    return next(error);
  }
});

// GET http://localhost:3000/products/by_category_id?category_id=?
router.get("/by_category_id", async (request, response, next) => {
  try {
    // Extracting the category_id from the request's parameters which will be used to identify which products to retrieve
    let category_id = request.query.category_id;

    let categorized_products_data = await productsLogic.getProductsByCategoryID(
      category_id
    );
    response.json(categorized_products_data);
  } catch (error) {
    return next(error);
  }
});

// GET http://localhost:3000/products/number_of_products
router.get("/number_of_products", async (request, response, next) => {
  try {
    let number_of_products_data = await productsLogic.countProducts();
    response.json(number_of_products_data);
  } catch (error) {
    return next(error);
  }
});

// Only accessible by admins:
// POST http://localhost:3000/products/
router.post("/", async (request, response, next) => {
  try {
    // Extracting from the request's body the details regarding the new product that's supposed to be added
    let productDetails = request.body;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let { user_type } = cacheModule.get(token);

    await productsLogic.addNewProduct(productDetails, user_type);
    response.json();
  } catch (error) {
    return next(error);
  }
});

// Only accessible by admins:
// PUT http://localhost:3000/products/
router.put("/", async (request, response, next) => {
  try {
    // Extracting from the request's body the details regarding the product that's supposed to be updated
    let productsDetails = request.body;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let { user_type } = cacheModule.get(token);

    await productsLogic.updateProduct(productsDetails, user_type);
    response.json();
  } catch (error) {
    return next(error);
  }
});

// Only accessible by admins:
// POST http://localhost:3000/products/upload_image_file
router.post("/upload_image_file", async (request, response, next) => {
  try {
    // Extracting from the request the image file that's supposed to be uploaded
    const file = request.files.file;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    let successfulUploadResponse = await productsLogic.uploadProductImage(
      file,
      userData.user_type
    );
    response.json(successfulUploadResponse);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
