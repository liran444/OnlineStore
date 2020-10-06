// Basically ENUM, declaring an object that contains every variation (type) of error
let ErrorType = {
  UNAUTHORIZED: {
    id: 1,
    httpCode: 401,
    message: "Login failed, invalid email or password",
    isShowStackTrace: false,
  },
  GENERAL_ERROR: {
    id: 2,
    httpCode: 600,
    message: "An error as occurred, please retry",
    isShowStackTrace: true,
  },
  EMAIL_ALREADY_TAKEN: {
    id: 3,
    httpCode: 601,
    message: "Email is already taken",
    isShowStackTrace: false,
  },
  USER_ALREADY_EXISTS_BY_SOCIAL_NUMBER: {
    id: 4,
    httpCode: 602,
    message: "A user is already registered with this social number",
    isShowStackTrace: false,
  },
  INVALID_IS_CHECKED_OUT_VALUE: {
    id: 5,
    httpCode: 603,
    message: "Sending incorrect values is forbidden",
    isShowStackTrace: false,
  },
  PRODUCT_ALREADY_EXISTS: {
    id: 6,
    httpCode: 604,
    message: "The product already exists by name",
    isShowStackTrace: false,
  },
  DATE_UNAVAILABLE: {
    id: 7,
    httpCode: 605,
    message: "The picked date is unavailable",
    isShowStackTrace: false,
  },
  INVALID_NUMBER_OF_LAST_DIGITS: {
    id: 8,
    httpCode: 606,
    message: "The last four digits of the credit card are required to proceed",
    isShowStackTrace: false,
  },
  INVALID_TYPE_OF_LAST_DIGITS: {
    id: 9,
    httpCode: 607,
    message: "The last four digits of the credit card must all be numeric",
    isShowStackTrace: false,
  },
  INVALID_DATE_PATTERN: {
    id: 10,
    httpCode: 608,
    message: "The date must follow the following pattern yyyy-mm-dd",
    isShowStackTrace: false,
  },
};

// Exporting ErrorType to external files...
module.exports = ErrorType;
