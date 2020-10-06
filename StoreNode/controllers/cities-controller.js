const citiesLogic = require("../logic/cities-logic");
const express = require("express");
const router = express.Router();

// GET http://localhost:3000/cities/
router.get("/", async (request, response, next) => {
  try {
    let citiesData = await citiesLogic.getCities();
    response.json(citiesData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
