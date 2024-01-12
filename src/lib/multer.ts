import multer, { FileFilterCallback } from "multer";
import { randomBytes } from "crypto";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extensaoArquivo = file.originalname.split(".")[1];

    const novoNomeArquivo = randomBytes(64).toString("hex");

    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});

function fileFilter(req: any, file: any, cb: any) {
  const validFile = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/svg+xml",
    "application/pdf",
  ];
  const isValid = validFile.includes(file.mimetype);

  if (isValid) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error("Formato do arquivo inválido"));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 140 * 1024 },
  fileFilter,
});

export { upload };
