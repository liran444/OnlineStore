const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();

// POST http://localhost:3000/users/
router.post("/", async (request, response, next) => {
  try {
    // Extracting from the request's body the details regarding the new user that's supposed to be added
    let userDetails = request.body;

    let successfullLoginData = await usersLogic.addUser(userDetails);
    response.json(successfullLoginData);
  } catch (error) {
    return next(error);
  }
});

// POST http://localhost:3000/users/login
router.post("/login", async (request, response, next) => {
  try {
    // Extracting from the request's body the details regarding the user that attempts to log-in
    let userDetails = request.body;

    let successfullLoginData = await usersLogic.login(userDetails);
    response.json(successfullLoginData);
  } catch (error) {
    return next(error);
  }
});

// DELETE http://localhost:3000/users/logout
router.delete("/logout", async (request, response, next) => {
  try {
    // Extracting from the request's header the authorization token
    let authorizationString = request.headers["authorization"];

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);

    await usersLogic.logout(token);
    response.json();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
