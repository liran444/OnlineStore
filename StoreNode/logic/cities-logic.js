const citiesDao = require("../dao/cities-dao");

/**
 * Gets all cities
 */
async function getCities() {
  let citiesData = await citiesDao.getCities();

  return citiesData;
}

module.exports = {
  getCities,
};
