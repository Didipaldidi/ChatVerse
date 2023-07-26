// Middleware function to handle 404 Not Found errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware function to handle all other errors
const errorHandler = (err, req, res, next) => {
  // Determine the status code to send in the response
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Set the response status code
  res.status(statusCode);

  // Send the error message and stack trace (in development mode) as JSON in the response
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// Export the middleware functions to be used in other parts of the application
module.exports = { notFound, errorHandler };
