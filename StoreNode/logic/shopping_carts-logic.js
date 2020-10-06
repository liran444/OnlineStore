const shoppingCartsDao = require("../dao/shopping_carts-dao");
const cacheModule = require("../dao/cache-module");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

/**
 * Handles the craetion of a new shopping cart, once it has been created then proceed
 * to save the cart's ID in cache
 * @param {string} token - Used to update the user data in cache
 * @param {object} userData - An object containing user data
 */
async function createNewShoppingCart(token, userData) {
  await shoppingCartsDao.createNewShoppingCart(userData.id);
  let new_cart = await shoppingCartsDao.getRecentCartByCachedUserId(
    userData.id
  );

  userData.cart_id = new_cart.id;
  cacheModule.set(token, userData);
}

/**
 * Attempts to get the most recent open cart, if it doesn't exist, a process to
 * create a new one will begin
 * @param {string} token - Used to update the user data in cache
 * @param {object} userData - An object containing user data
 */
async function getRecentCartByCachedUserId(token, userData) {
  let recent_cart_data = await shoppingCartsDao.getRecentCartByCachedUserId(
    userData.id
  );

  if (recent_cart_data === undefined || recent_cart_data.is_checked_out === 1) {
    createNewShoppingCart(token, userData);
  } else {
    userData.cart_id = recent_cart_data.id;
    cacheModule.set(token, userData);

    let modified_recent_cart_data = {
      timestamp: recent_cart_data.timestamp,
      cart_total_price: recent_cart_data.cart_total_price,
      is_checked_out: recent_cart_data.is_checked_out,
      last_order_date: recent_cart_data.last_order_date,
    };

    return modified_recent_cart_data;
  }
}

/**
 * Updates the shopping cart's total price and whether it has been checked out
 * @param {number} cart_id - Used to identify the exact cart
 * @param {string} is_checked_out - Determines whether the cart has been checked out or not
 */
async function updateShoppingCartByCachedCartId(cart_id, is_checked_out) {
  if (is_checked_out != "0" && is_checked_out != "1") {
    throw new ServerError(ErrorType.INVALID_IS_CHECKED_OUT_VALUE);
  }

  await shoppingCartsDao.updateShoppingCartByCachedCartId(
    cart_id,
    is_checked_out
  );
}

module.exports = {
  createNewShoppingCart,
  getRecentCartByCachedUserId,
  updateShoppingCartByCachedCartId,
};
