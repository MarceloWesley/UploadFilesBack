import path from "path";
import fs from "fs";
import { Request } from "express";

export interface ExtendedRequest extends Request {
  mappedFiles?: { name: string; size: number; type: string }[];
}

async function imageReader(): Promise<
  { name: string; size: number; data: string; type: string }[]
> {
  const imagesDirectory = path.join(__dirname, "../../uploads");

  return new Promise((resolve, reject) => {
    fs.readdir(imagesDirectory, (err, files) => {
      if (err) {
        reject("Erro ao ler os arquivos do diretório");
        return;
      }

      const mappedFiles = files.map((file) => ({
        name: file,
        size: fs.statSync(path.join(imagesDirectory, file)).size,
        data: fs
          .readFileSync(path.join(imagesDirectory, file))
          .toString("base64"),
        type: path.extname(file).toLowerCase(),
      }));

      resolve(mappedFiles);
    });
  });
}

export { imageReader };
