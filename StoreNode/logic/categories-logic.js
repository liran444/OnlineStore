const categoriesDao = require("../dao/categories-dao");

/**
 * Gets all categories
 */
async function getAllCategories() {
  let categoriesData = await categoriesDao.getAllCategories();

  return categoriesData;
}

module.exports = {
  getAllCategories,
};
