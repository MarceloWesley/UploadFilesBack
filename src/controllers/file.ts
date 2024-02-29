import {
  response,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { ExtendedRequest, imageReader } from "../service/imagesReader";
import { fileDelete } from "../service/fileDelete";

class FileController {
  public async hello(req: Request, res: Response): Promise<Response> {
    return res.status(200).send({
      ok: true,
    });
  }

  public async upload(
    req: Request,
    res: Response,
    error: any
  ): Promise<Response> {
    return res.status(201).send({
      ok: true,
    });
  }

  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const response = await imageReader();
      return res.json(response).status(200);
    } catch (error: any) {
      return res.status(500).json({ error });
    }
  }

  public async deleteOne(req: Request, res: Response): Promise<Response> {
    try {
      await fileDelete(req, res);
      return res.status(200);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export { FileController };
