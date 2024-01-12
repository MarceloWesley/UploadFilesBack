import { Router } from "express";

import { FileController } from "../controllers/file";

import { upload } from "../lib/multer";

const fileRoutes = Router();

const controller = new FileController();

fileRoutes.get("/hello", controller.hello);

fileRoutes.post("/upload", upload.single("file") , controller.upload);

export { fileRoutes }; 