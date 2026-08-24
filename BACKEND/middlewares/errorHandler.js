import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }

  return res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
    stack: err.stack,
  });
};
