import { Request, Response, NextFunction } from "express";

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
  next();
}

export { errorHandler };
