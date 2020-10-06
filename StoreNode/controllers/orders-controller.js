const ordersLogic = require("../logic/orders-logic");
const cacheModule = require("../dao/cache-module");
const express = require("express");
const router = express.Router();

// POST http://localhost:3000/orders/
router.post("/", async (request, response, next) => {
  try {
    // Extracting from the request's body the details regarding the new order that's supposed to be added
    let orderDetails = request.body;

    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let { id, cart_id } = cacheModule.get(token);

    await ordersLogic.addOrder(id, cart_id, orderDetails);
    response.json();
  } catch (error) {
    return next(error);
  }
});

// GET http://localhost:3000/orders/number_of_orders
router.get("/number_of_orders", async (request, response, next) => {
  try {
    let number_of_orders_data = await ordersLogic.countOrders();
    response.json(number_of_orders_data);
  } catch (error) {
    return next(error);
  }
});

// GET http://localhost:3000/orders/unavailable_dates
router.get("/unavailable_dates", async (request, response, next) => {
  try {
    let unavailable_dates_data = await ordersLogic.getUnavailableOrderDates();
    response.json(unavailable_dates_data);
  } catch (error) {
    return next(error);
  }
});

// GET http://localhost:3000/orders/get_order_data
router.get("/get_order_data", async (request, response, next) => {
  try {
    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    // Extracting userData with the provided token
    let { cart_id } = cacheModule.get(token);

    let order_data = await ordersLogic.getOrderDataByCartID(cart_id);
    response.json(order_data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
