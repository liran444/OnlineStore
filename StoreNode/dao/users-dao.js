const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

/**
 * Adds a new user to the database
 * @param {object} userDetails - An object containing the details of the user
 */
async function addUser({
  social_number,
  firstname,
  lastname,
  email,
  password,
  city_id,
  street,
}) {
  let sql =
    "INSERT INTO users ( social_number, firstname, lastname, email, password, city_id, street ) values(?, ?, ?, ?, ?, ?, ?)";
  let parameters = [
    social_number,
    firstname,
    lastname,
    email,
    password,
    city_id,
    street,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Retrieves crucial user data from the database using the provided user's email and password
 * @param {object} userDetails - An object containing the details of the user
 */
async function login({ email, password }) {
  let sql =
    "SELECT u.id, u.firstname, u.city_id, u.street, u.user_type, s.id AS 'cart_id', DATE_FORMAT(s.timestamp, '%Y-%m-%d') AS 'last_open_cart_date', s.cart_total_price, s.is_checked_out, DATE_FORMAT(o.order_date, '%Y-%m-%d') AS 'last_order_date' FROM users u LEFT JOIN shopping_carts s ON u.id = s.user_id LEFT JOIN orders o ON u.id = o.user_id WHERE u.email = ? and u.password = ? ORDER BY o.id DESC, s.id DESC LIMIT 1";
  let parameters = [email, password];

  try {
    let userLoginResult;
    userLoginResult = await connection.executeWithParameters(sql, parameters);

    if (userLoginResult == null || userLoginResult.length == 0) {
      return userLoginResult;
    } else {
      return userLoginResult[0];
    }
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Returns a boolean value whether a user already exists with the same email
 * @param {string} email - The provided email from the client
 */
async function isUserAlreadyExistsByEmail(email) {
  let sql = "SELECT id FROM users WHERE email = ?";
  let parameters = [email];

  try {
    let isEmailFoundData;
    isEmailFoundData = await connection.executeWithParameters(sql, parameters);

    if (isEmailFoundData == null || isEmailFoundData.length == 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Returns a boolean value whether a user already exists with the same email
 * @param {string} social_number - The provided social numebr from the client
 */
async function isUserAlreadyExistsBySocialNumber(social_number) {
  let sql = "SELECT social_number FROM users WHERE social_number = ?";
  let parameters = [social_number];

  try {
    let isIdFoundData;
    isIdFoundData = await connection.executeWithParameters(sql, parameters);

    if (isIdFoundData == null || isIdFoundData.length == 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

module.exports = {
  addUser,
  login,
  isUserAlreadyExistsByEmail,
  isUserAlreadyExistsBySocialNumber,
};
