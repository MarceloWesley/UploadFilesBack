import { NextFunction, Router, Request, Response } from "express";

import { FileController } from "../controllers/file";

import { upload } from "../lib/multer";
import { errorHandler } from "../middleware/errorHandler";

const fileRoutes = Router();

const controller = new FileController();

fileRoutes.get("/hello", controller.hello);

fileRoutes.post(
  "/images",
  upload.single("file"),
  errorHandler,
  controller.upload
);

fileRoutes.get("/images", controller.findAll);

fileRoutes.delete("/images/:id", controller.deleteOne);
export { fileRoutes };
