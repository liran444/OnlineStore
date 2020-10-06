const usersDao = require("../dao/users-dao");
const jwt = require("jsonwebtoken");
const config = require("../config.json");
const cacheModule = require("../dao/cache-module");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

// Declaring salt which will be used during the Login process for encryption
const RIGHT_SALT = "sdaofikgn30459UJ@#^%sadtt$1";
const LEFT_SALT = "8IHJ3244Toaw8ihjf2093h6t#@$1!^!^";

/**
 * Adds a new user if both of the user's email and social number are in fact unique
 * @param {object} userDetails - An object containing user details
 */
async function addUser(userDetails) {
  if (await usersDao.isUserAlreadyExistsByEmail(userDetails.email)) {
    throw new ServerError(ErrorType.EMAIL_ALREADY_TAKEN);
  }

  if (
    await usersDao.isUserAlreadyExistsBySocialNumber(userDetails.social_number)
  ) {
    throw new ServerError(ErrorType.USER_ALREADY_EXISTS_BY_SOCIAL_NUMBER);
  }

  await usersDao.addUser(userDetails);
  // Connects the user after successful creation
  let successfullLoginResponse = await login(userDetails);
  return successfullLoginResponse;
}

/**
 * Deletes cached user data by token
 * @param {string} token
 */
async function logout(token) {
  cacheModule.deleteByKey(token);
}

/**
 * Returning a successfullLoginResponse which contains relevant information to the client such as - Token
 * while saving crucial data (id, etc...) in cache
 * @param {object} userDetails - An object containing user details
 */
async function login(userDetails) {
  let userData = await usersDao.login(userDetails);

  if (userData == null || userData.length == 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }

  let saltedEmail = LEFT_SALT + userDetails.email + RIGHT_SALT;
  const jwtToken = jwt.sign({ sub: saltedEmail }, config.secret);

  let cachedObject = {
    id: userData.id,
    cart_id: userData.cart_id,
    user_type: userData.user_type,
  };
  cacheModule.set(jwtToken, cachedObject);

  let successfullLoginResponse = {
    token: jwtToken,
    firstname: userData.firstname,
    user_type: userData.user_type,
    city_id: userData.city_id,
    street: userData.street,
    last_open_cart_date: userData.last_open_cart_date,
    cart_total_price: userData.cart_total_price,
    is_checked_out: userData.is_checked_out,
    last_order_date: userData.last_order_date,
  };
  return successfullLoginResponse;
}

module.exports = {
  addUser,
  login,
  logout,
};
