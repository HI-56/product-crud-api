import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }

  next(err);
};
