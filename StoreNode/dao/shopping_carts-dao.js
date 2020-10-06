const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

/**
 * Creates a new shopping cart for the user
 * @param {number} user_id - Used to identify the exact user
 */
async function createNewShoppingCart(user_id) {
  let sql = "INSERT INTO shopping_carts (user_id) values(?)";
  let parameters = [user_id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Updates the shopping cart's total price and whether it has been checked out
 * @param {number} cart_id - Used to identify the exact cart
 * @param {string} is_checked_out - Determines whether the cart has been checked out or not
 */
async function updateShoppingCartByCachedCartId(cart_id, is_checked_out) {
  let sql = "UPDATE shopping_carts SET is_checked_out = ? , cart_total_price = IFNULL((SELECT SUM(total_price) FROM cart_items WHERE cart_id = ?),0) WHERE id = ?";
  let parameters = [is_checked_out, cart_id, cart_id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Gets the most recent open cart of the user from the database
 * @param {number} user_id - Used to identify the exact user
 */
async function getRecentCartByCachedUserId(user_id) {
  let sql =
    "SELECT s.id, DATE_FORMAT(s.timestamp, '%Y-%m-%d') AS 'timestamp', s.cart_total_price, s.is_checked_out, DATE_FORMAT(o.order_date, '%Y-%m-%d') AS 'last_order_date' FROM shopping_carts s LEFT JOIN orders o ON s.id = o.cart_id WHERE s.user_id = ? ORDER BY id DESC LIMIT 1";
  let parameters = [user_id];

  try {
    let recent_cart_data;
    recent_cart_data = await connection.executeWithParameters(sql, parameters);

    return recent_cart_data[0];
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

module.exports = {
  createNewShoppingCart,
  updateShoppingCartByCachedCartId,
  getRecentCartByCachedUserId,
};
