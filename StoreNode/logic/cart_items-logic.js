const cartItemsDao = require("../dao/cart_items-dao");

/**
 * Handles the process of adding an item to the cart, firstly checking if the item is already found
 * in the cart, if so then proceeds to update the item inside the cart, else proceeds to add a new item
 * @param {number} cart_id - used to identify the exact cart
 * @param {object} productDetails - the details of the product (cart item)
 */
async function handleAddItemToCartProcess(cart_id, productDetails) {
  if (await cartItemsDao.isItemFoundInCart(cart_id, productDetails.product_id)) {
    await cartItemsDao.updateCartItem(cart_id, productDetails);
  } else {
    await cartItemsDao.addItemToCart(cart_id, productDetails);
  }
}

/**
 * Gets all cart items that belong to the user's cart
 * @param {number} cart_id - Used to identify the exact cart
 */
async function getCartItems(cart_id) {
  let cartItemsData = await cartItemsDao.getCartItems(cart_id);

  return cartItemsData;
}

/**
 * Deletes all cart items from the user's cart
 * @param {number} cart_id - Used to identify the exact cart
 */
async function deleteAllCartItems(cart_id) {
  await cartItemsDao.deleteAllCartItems(cart_id);
}

/**
 * Deletes an item from the user's cart
 * @param {number} cart_id - Used to identify the exact cart
 * @param {string} product_id - Used to identify the exact product (cart item)
 */
async function deleteCartItem(cart_id, product_id) {
  await cartItemsDao.deleteCartItem(cart_id, product_id);
}

module.exports = {
  handleAddItemToCartProcess,
  getCartItems,
  deleteAllCartItems,
  deleteCartItem,
};
