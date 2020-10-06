const categoriesLogic = require("../logic/categories-logic");
const express = require("express");
const router = express.Router();

// GET http://localhost:3000/categories/
router.get("/", async (request, response, next) => {
  try {
    let categoriesData = await categoriesLogic.getAllCategories();
    response.json(categoriesData);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
