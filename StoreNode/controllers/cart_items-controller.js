const cartItemsLogic = require("../logic/cart_items-logic");
const express = require("express");
const cacheModule = require("../dao/cache-module");
const router = express.Router();

// POST http://localhost:3000/cart_items/
router.post("/", async (request, response, next) => {
  try {
    // Extracting from the request's body the details regarding the new cart item that's supposed to be added
    let productDetails = request.body;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    await cartItemsLogic.handleAddItemToCartProcess(
      userData.cart_id,
      productDetails
    );
    response.json();
  } catch (error) {
    return next(error);
  }
});

// GET http://localhost:3000/cart_items/
router.get("/", async (request, response, next) => {
  try {
    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    let cartItemsData = await cartItemsLogic.getCartItems(userData.cart_id);
    response.json(cartItemsData);
  } catch (error) {
    return next(error);
  }
});

// DELETE http://localhost:3000/cart_items/remove_item?product_id=?
router.delete("/remove_item", async (request, response, next) => {
  try {
    // Extracting from the request's query the details regarding the cart item that's supposed to be removed
    let product_id = request.query.product_id;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    await cartItemsLogic.deleteCartItem(userData.cart_id, product_id);
    response.json();
  } catch (error) {
    return next(error);
  }
});

// DELETE http://localhost:3000/cart_items/
router.delete("/", async (request, response, next) => {
  try {
    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    await cartItemsLogic.deleteAllCartItems(userData.cart_id);
    response.json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
