import type { Request, Response } from "express";

class FileController {
  public async hello(req: Request, res: Response): Promise<Response> {
    return res.status(200).send({
        ok: true
    });
  }

  public async upload(req: Request, res: Response): Promise<Response> {
    console.log({req})
    return res.status(201).send({
      ok: true
    })
  }


}

export { FileController };