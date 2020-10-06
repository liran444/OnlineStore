const productsDao = require("../dao/products-dao");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");
const uuid = require("uuid");

/**
 * Gets all products
 */
async function getAllProducts() {
  let products_data = await productsDao.getAllProducts();

  return products_data;
}

/**
 * Gets products by category ID
 * @param {string} category_id - Used to identify the exact category
 */
async function getProductsByCategoryID(category_id) {
  let categorized_products_data = await productsDao.getProductsByCategoryId(
    category_id
  );

  return categorized_products_data;
}

/**
 * Adds a new product to the database, but firstly checking if the user is allowed to perform that
 * and then that the product's name is unique
 * @param {object} productDetails - An object containing the details of the new product
 * @param {string} user_type - Used for extra validation that the user is in fact an admin
 */
async function addNewProduct(productDetails, user_type) {
  if (user_type != "ADMIN") {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
  if (await productsDao.isProductAlreadyExists(productDetails.name)) {
    throw new ServerError(ErrorType.PRODUCT_ALREADY_EXISTS);
  } else {
    await productsDao.addNewProduct(productDetails);
  }
}

/**
 * Updates a product's details, but firstly checking if the user is allowed to perform that
 * @param {object} productDetails - An object containing the details of the product
 */
async function updateProduct(productDetails, user_type) {
  if (user_type != "ADMIN") {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
  if (
    productDetails.is_new_name &&
    (await productsDao.isProductAlreadyExists(productDetails.name))
  ) {
    throw new ServerError(ErrorType.PRODUCT_ALREADY_EXISTS);
  } else {
    await productsDao.updateProduct(productDetails);
  }
}

/**
 * Uploads an image file, but firstly checking if the user is allowed to perform that
 * and returns the new file name + its extension to the client
 * @param {object} file - An object containing the image file for a product
 * @param {string} user_type - Used for extra validation that the user is in fact an admin
 */
async function uploadProductImage(file, user_type) {
  if (user_type != "ADMIN") {
    throw new ServerError(ErrorType.UNAUTHORIZED);
  }
  const extension = file.name.substr(file.name.lastIndexOf("."));
  const newUuidFileName = uuid.v4();

  file.mv("./uploads/" + newUuidFileName + extension);

  let successfulUploadResponse = newUuidFileName + extension + "";

  return successfulUploadResponse;
}

/**
 * Returns the value of the total number of products
 */
async function countProducts() {
  let number_of_products_data = await productsDao.countProducts();

  return number_of_products_data;
}

module.exports = {
  getAllProducts,
  addNewProduct,
  updateProduct,
  getProductsByCategoryID,
  countProducts,
  uploadProductImage,
};
