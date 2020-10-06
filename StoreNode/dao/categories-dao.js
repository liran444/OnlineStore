const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

/**
 * Gets all categories from the database
 */
async function getAllCategories() {
  let sql = "select * from categories";

  try {
    let categoriesData;
    categoriesData = await connection.execute(sql);

    return categoriesData;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

module.exports = {
  getAllCategories,
};
