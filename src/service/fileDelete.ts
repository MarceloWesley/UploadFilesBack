import path from "path";
import fs from "fs";
import { Request, Response } from "express";

export interface ExtendedRequest extends Request {
  mappedFiles?: { name: string; size: number }[];
}

async function fileDelete(req: Request, res: Response) {
  const imagesDirectory = path.join(__dirname, "../../uploads");

  const files = await fs.promises.readdir(imagesDirectory);

  const deletePromises = files.map(async (file) => {
    const pieces = file.split("-");
    const numberOfFile = pieces[0];

    if (numberOfFile == req.params.id) {
      const caminhoArquivo = path.join(imagesDirectory, file);
      await fs.promises.unlink(caminhoArquivo);
    }
  });

  await Promise.all(deletePromises);
  res.end();
}

export { fileDelete };
