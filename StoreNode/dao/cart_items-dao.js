const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

/**
 * Adds a new item to the cart
 * @param {number} cart_id - Used to identify the exact cart
 * @param {object} productDetails - The details of the product (cart item)
 */
async function addItemToCart(cart_id, { product_id, amount }) {
  let sql =
    "INSERT INTO cart_items SET cart_id = ?, product_id = ?, amount = ?, total_price =  amount * (SELECT price FROM products WHERE id = ?)";
  let parameters = [cart_id, product_id, amount, product_id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Updates the amount of an item inside the cart
 * @param {number} cart_id - Used to identify the exact cart
 * @param {object} productDetails - The details of the product (cart item)
 */
async function updateCartItem(cart_id, { product_id, amount }) {
  let sql =
    "UPDATE cart_items c JOIN products p ON c.product_id = p.id SET c.amount = (c.amount + ?), c.total_price = (p.price * (c.amount + ?)) WHERE c.cart_id = ? and p.id = ?";
  let parameters = [amount, amount, cart_id, product_id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Returns a boolean value regarding the item's existence in the cart
 * @param {number} cart_id - Used to identify the exact cart
 * @param {string} product_id - Used to identify the exact product
 */
async function isItemFoundInCart(cart_id, product_id) {
  let sql =
    "SELECT product_id FROM cart_items where cart_id = ? and product_id = ?";
  let parameters = [cart_id, product_id];

  try {
    let isItemFoundData;
    isItemFoundData = await connection.executeWithParameters(sql, parameters);

    if (isItemFoundData == null || isItemFoundData.length == 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Gets all cart items by the user's cart ID
 * @param {number} cart_id - Used to identify the exact cart
 */
async function getCartItems(cart_id) {
  let sql =
    "SELECT s.cart_total_price, p.name, p.price, c.product_id, c.amount, c.total_price, p.image_file_name FROM shopping_carts s join cart_items c ON s.id = c.cart_id JOIN products p ON c.product_id = p.id WHERE s.id = ?";
  let parameters = [cart_id];

  try {
    let cartItemsData;
    cartItemsData = await connection.executeWithParameters(sql, parameters);

    return cartItemsData;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Deletes all cart items by the user's cart ID
 * @param {number} cart_id - Used to identify the exact cart
 */
async function deleteAllCartItems(cart_id) {
  let sql = "DELETE from cart_items where cart_id = ?";
  let parameters = [cart_id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Deletes a specific cart item
 * @param {number} cart_id - Used to identify the exact cart
 * @param {string} product_id - Used to identify the exact product inside the cart
 */
async function deleteCartItem(cart_id, product_id) {
  let sql = "delete from cart_items where cart_id = ? and product_id = ?";
  let parameters = [cart_id, product_id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

module.exports = {
  addItemToCart,
  getCartItems,
  deleteAllCartItems,
  deleteCartItem,
  updateCartItem,
  isItemFoundInCart,
};
