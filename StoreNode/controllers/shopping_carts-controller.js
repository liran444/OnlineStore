const shoppingCartsLogic = require("../logic/shopping_carts-logic");
const express = require("express");
const cacheModule = require("../dao/cache-module");
const router = express.Router();

// POST http://localhost:3000/shopping_carts/
router.post("/", async (request, response, next) => {
  try {
    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    await shoppingCartsLogic.createNewShoppingCart(token, userData);
    response.json();
  } catch (error) {
    return next(error);
  }
});

// GET http://localhost:3000/shopping_carts/
router.get("/", async (request, response, next) => {
  try {
    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    let recent_cart_data = await shoppingCartsLogic.getRecentCartByCachedUserId(token, userData);
    response.json(recent_cart_data);
  } catch (error) {
    return next(error);
  }
});

// PUT http://localhost:3000/shopping_carts/update_cart
router.put("/update_cart", async (request, response, next) => {
  try {
    // Extracting from the request's body the detail of what needs to be updated
    let { is_checked_out } = request.body;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let userData = cacheModule.get(token);

    await shoppingCartsLogic.updateShoppingCartByCachedCartId(userData.cart_id, is_checked_out);
    response.json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
