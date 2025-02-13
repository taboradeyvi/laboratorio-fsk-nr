const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);

  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
    errors = Object.values(err.errors).map((e) => e.message);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

export default errorHandler;
