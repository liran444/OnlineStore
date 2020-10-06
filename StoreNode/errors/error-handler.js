let errorHandler = (e, request, response, next) => {
  // e = my Server error --> IT HAS AN ENUM INSIDE (!!) called errorType
  // If there's a server error containing errorType and isShowStackTrace equals TRUE then...
  if (e.errorType != undefined) {
    if (e.errorType.isShowStackTrace) {
      console.error(e);
    }

    // Setting an error status using the HTTP code we get and a JSON body containing a message
    response.status(e.errorType.httpCode).json(e.errorType.message);
    return;
  }

  // Setting a General Error, HTTP Code must be above 600 for general errors!
  // Reaching here means that we ggot an UNEXPECTED BUG which we didn't wrap with a ServerError
  console.error(e);
  response.status(700).json("General error");
};

// Exporting errorHandler to external files...
module.exports = errorHandler;
