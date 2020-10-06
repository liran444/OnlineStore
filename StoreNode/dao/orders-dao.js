const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

/**
 * Adds a new order to the database using the provided parameters
 * @param {number} user_id - Used to identify the exact user the cart belongs to
 * @param {number} cart_id - Used to identify the exact cart
 * @param {object} orderDetails - An object containing the details of the new order
 */
async function addOrder(
  user_id,
  cart_id,
  { city_id, street, ship_date, last_digits }
) {
  let sql =
    "INSERT into orders (user_id, cart_id, ship_city_id, ship_address, ship_date, last_digits, total_price) values(?, ?, ?, ?, ?, ?, (SELECT s.cart_total_price FROM shopping_carts s WHERE s.id = ?))";
  let parameters = [
    user_id,
    cart_id,
    city_id,
    street,
    ship_date,
    last_digits,
    cart_id,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Returns the value of the total number of orders from the database
 */
async function countOrders() {
  let sql = "SELECT COUNT(id) AS 'number_of_orders' from orders";

  try {
    let number_of_orders_data;
    number_of_orders_data = await connection.execute(sql);

    return number_of_orders_data[0];
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

/**
 * Returns all unavailable dates (dates that already have 3 order) from the database
 */
async function getUnavailableOrderDates() {
  let sql =
    "SELECT DATE_FORMAT(ship_date, '%Y-%m-%d') AS 'ship_date' from orders where ship_date > current_timestamp() GROUP BY ship_date HAVING COUNT(*) >= 3";

  try {
    let unavailable_dates_data;
    unavailable_dates_data = await connection.execute(sql);

    return unavailable_dates_data;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

async function getOrderDataByCartID(cart_id) {
  let sql =
    "SELECT o.id, u.firstname, u.lastname, o.total_price AS 'cart_total_price', DATE_FORMAT(o.ship_date, '%Y-%m-%d') AS 'ship_date', DATE_FORMAT(o.order_date, '%Y-%m-%d') AS 'order_date', cit.name AS 'ship_city', o.ship_address, o.last_digits, p.name AS 'cart_item', p.price AS 'product_price', c.total_price AS 'product_total_price', c.amount FROM orders o JOIN cart_items c ON o.cart_id = c.cart_id JOIN cities cit ON cit.id = o.ship_city_id JOIN products p ON c.product_id = p.id JOIN users u ON u.id = o.user_id WHERE o.cart_id = ?";
  let parameters = [cart_id];

  try {
    let order_data;
    order_data = await connection.executeWithParameters(sql, parameters);

    return order_data;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Validates the avaiability of the ship date in the database and return a boolean value
 * @param {string} ship_date - The chosen date for shipping
 */
async function isDateUnavailable(ship_date) {
  let sql =
    "SELECT COUNT(ship_date) AS 'numebr_of_orders' from orders WHERE ship_date = ?";
  let parameters = [ship_date];

  try {
    let number_of_orders_data;
    number_of_orders_data = await connection.executeWithParameters(
      sql,
      parameters
    );

    if (Object.values(number_of_orders_data[0]) >= 3) {
      return true;
    }

    return false;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

module.exports = {
  addOrder,
  countOrders,
  getOrderDataByCartID,
  getUnavailableOrderDates,
  isDateUnavailable,
};
