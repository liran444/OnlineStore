// Using require(); to include modules from external sources (files, etc...)
// let ServerError = require("./../errors/server-error");
// let ErrorType = require("./../errors/error-type");
const mysql = require("mysql2");

// Connection is a communication line to the DB
const connection = mysql.createConnection({
  host: "localhost", // Computer
  user: "root", // Username
  password: "1234", // Password
  database: "mystoreschema", // Database name
});

// Connect to the database:
connection.connect((err) => {
  // if not NULL
  if (err) {
    console.log("Failed to create connection + " + err);
    return;
  }
  // if err is NULL we successfully connected to MySQL
  console.log("We're connected to MySQL");
});

// One function for executing select / insert / update / delete:
function execute(sql) {
  // Shouldn't it be changed to Async Await?
  return new Promise((resolve, reject) => {
    // Providing an SQL query which will determine what we want to do
    connection.query(sql, (err, result) => {
      if (err) {
        // console.log("Error " + err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function executeWithParameters(sql, parameters) {
  // Shouldn't it be changed to Async Await?
  return new Promise((resolve, reject) => {
    // Providing an SQL query which will determine what we want to do
    connection.query(sql, parameters, (err, result) => {
      if (err) {
        //console.log("Error " + err);
        console.log("Failed interacting with DB, calling reject");
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

// Declaring which functions to export...
module.exports = {
  execute,
  executeWithParameters,
};
