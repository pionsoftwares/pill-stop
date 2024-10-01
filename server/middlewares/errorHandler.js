const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Custom errors array for imports validation
  const errors = err.errors || undefined;
  res.status(statusCode).json({ message });
};

export default errorHandler;
