const expressJwt = require("express-jwt");
const config = require("../config.json");

// Extracting the text from the secret's JSON
let { secret } = config;

function authenticateJwtRequestToken() {
  // Load secret into
  return expressJwt({ secret }).unless({
    path: [
      // Public routes that don't require authentication
      "/users/login",
      "/users/",
      "/cities/",
      "/products/number_of_products",
      "/orders/number_of_orders",
      /uploads\/.*/,
    ],
  });
}

module.exports = authenticateJwtRequestToken;
