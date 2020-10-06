const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

/**
 * Gets all cities from the database
 */
async function getCities() {
  let sql = "select * from cities";

  try {
    let citiesData;
    citiesData = await connection.execute(sql);

    return citiesData;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

module.exports = {
  getCities,
};
