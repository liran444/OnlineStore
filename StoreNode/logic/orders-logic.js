const ordersDao = require("../dao/orders-dao");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

/**
 * Adds a new order using the provided parameters
 * @param {number} user_id - Used to identify the exact user the cart belongs to
 * @param {number} cart_id - Used to identify the exact cart
 * @param {object} orderDetails - An object containing the details of the new order
 */
async function addOrder(user_id, cart_id, orderDetails) {
  if (await isDateUnavailable(orderDetails.ship_date)) {
    throw new ServerError(ErrorType.DATE_UNAVAILABLE);
  }
  validateLastDigits(orderDetails.last_digits);

  await ordersDao.addOrder(user_id, cart_id, orderDetails);
}

/**
 * Validates that there's 4 digits and that they are all numeric
 * @param {string} last_digits - Last four digits of the credit card
 */
async function validateLastDigits(last_digits) {
  if (last_digits.length !== 4) {
    throw new ServerError(ErrorType.INVALID_NUMBER_OF_LAST_DIGITS);
  }
  if (isNaN(last_digits * 1)) {
    throw new ServerError(ErrorType.INVALID_TYPE_OF_LAST_DIGITS);
  }
}

/**
 * Returns the value of the total number of orders
 */
async function countOrders() {
  let number_of_orders_data = await ordersDao.countOrders();

  return number_of_orders_data;
}

/**
 * Returns all unavailable dates (dates that already have 3 order)
 */
async function getUnavailableOrderDates() {
  let unavailable_dates_data = await ordersDao.getUnavailableOrderDates();

  return unavailable_dates_data;
}

async function getOrderDataByCartID(cart_id) {
  let order_data = await ordersDao.getOrderDataByCartID(cart_id);

  return order_data;
}

/**
 * Validates the avaiability of the ship date and return a boolean value
 * @param {string} ship_date - The chosen date for shipping
 */
async function isDateUnavailable(ship_date) {
  // YYYY-MM-DD regex pattern
  let regexExp = new RegExp(
    /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
  );

  // Validating that the date follows the correct pattern
  if (!regexExp.test(ship_date)) {
    throw new ServerError(ErrorType.INVALID_DATE_PATTERN);
  }

  // Creating two new date objects for comparison, one being the current date
  let current_datetime = new Date();
  let formatted_ship_date = new Date(ship_date);

  if (
    formatted_ship_date < current_datetime ||
    (await ordersDao.isDateUnavailable(ship_date))
  ) {
    return true;
  }

  return false;
}

module.exports = {
  addOrder,
  countOrders,
  getOrderDataByCartID,
  getUnavailableOrderDates,
};
