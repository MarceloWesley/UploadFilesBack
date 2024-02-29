import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uuid = uuidv4();
    const hash = parseInt(uuid.replace(/\D/g, "").slice(0, 9), 16);
    const id = 1 + (hash % 200);

    const fileExtension = file.originalname.split(".").pop();

    const fileName = `${id}-${file.originalname
      .replace(/\.\w+$/, "")
      .replace(/\s/g, "-")}`;

    cb(null, `${fileName}.${fileExtension}`);
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

  if (!file) {
    return cb(new Error("No files found"));
  }

  const isValid = validFile.includes(file.mimetype);

  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file format"));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter,
});

export { upload };
