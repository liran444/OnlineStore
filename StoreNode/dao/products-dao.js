const connection = require("./connection-wrapper");
const ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");

/**
 * Gets all products from the database
 */
async function getAllProducts() {
  let sql =
    "SELECT p.id, p.name, p.price, 1 AS 'amount', p.category_id, c.category_name, p.image_file_name FROM products p JOIN categories c on p.category_id = c.id";

  try {
    let products_data;
    products_data = await connection.execute(sql);

    return products_data;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
}

/**
 * Adds a new product to the database
 * @param {object} productDetails - An object containing the details of the product
 */
async function addNewProduct({ name, price, category_id, image_file_name }) {
  let sql =
    "INSERT INTO products (name, price, category_id, image_file_name) values(?, ?, ?, ?)";
  let parameters = [name, price, category_id, image_file_name];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Updates a product in the database using its ID
 * @param {object} productDetails - An object containing the details of the product
 */
async function updateProduct({
  name,
  price,
  category_id,
  image_file_name,
  id,
}) {
  let sql =
    "UPDATE products SET name = ?, price = ?, category_id = ?, image_file_name = ? where id = ?";
  let parameters = [name, price, category_id, image_file_name, id];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Returns a boolean value regarding whether the product already exists by name
 * @param {string} name - The name of the product
 */
async function isProductAlreadyExists(name) {
  let sql = "SELECT id FROM products WHERE name = ?";
  let parameters = [name];

  try {
    let isProductFoundData;

    isProductFoundData = await connection.executeWithParameters(
      sql,
      parameters
    );

    if (isProductFoundData == null || isProductFoundData.length == 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Gets all products by the provided category ID
 * @param {string} category_id - Used to identify the exact category
 */
async function getProductsByCategoryId(category_id) {
  let sql =
    "SELECT p.id, p.name, p.price, 1 AS 'amount', p.category_id, c.category_name, p.image_file_name FROM products p JOIN categories c on p.category_id = c.id WHERE category_id = ?";
  let parameters = [category_id];

  try {
    let categorized_products_data;

    categorized_products_data = await connection.executeWithParameters(
      sql,
      parameters
    );

    return categorized_products_data;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, parameters, error);
  }
}

/**
 * Returns the value of the total number of products from the database
 */
async function countProducts() {
  let sql = "SELECT COUNT(id) AS 'number_of_products' FROM products";

  try {
    let number_of_products_data;
    number_of_products_data = await connection.execute(sql);

    return number_of_products_data[0];
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

module.exports = {
  getAllProducts,
  addNewProduct,
  updateProduct,
  isProductAlreadyExists,
  getProductsByCategoryId,
  countProducts,
};
