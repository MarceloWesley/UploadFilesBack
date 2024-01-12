const express = require("express");
const multer = require("multer");
const Busboy = require('busboy');
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    // Extração da extensão do arquivo original:
    const extensaoArquivo = file.originalname.split(".")[1];

    // Cria um código randômico que será o nome do arquivo
    const novoNomeArquivo = require("crypto").randomBytes(64).toString("hex");

    // Indica o novo nome do arquivo:
    cb(null, `${novoNomeArquivo}.${extensaoArquivo}`);
  },
});

function fileFilter(req, file, cb) {
  const isJpeg = file.mimetype === "image/jpeg";
  const isLimitSize = false;


  // Evento de erro do Busboy
  // bb.on('error', function(err) {
  //   console.error('Erro no upload:', err);
  //   const erro = new Error("erro duranto o upload de arquivo");
  //   cb(erro);
  // });

  if (isJpeg) {
    cb(null, true);
  } else {

    cb(null, false);
    const erro = new Error("Arquivo inválido, verifique se o arquivo está no formato certo ou nao seja muito grande");
    cb(erro);
  }

  // const maxFileSize = 130 * 1024; // Tamanho máximo em bytes (1MB neste caso)

  // if (file.size > maxFileSize) {
  //   cb(null, false);
  //   const erro = new Error("Arquivo ultrapassa o tamanho limite");
  //   cb(erro);
  // } else {
  //   cb(null, true);
  // }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post("/image", (req, res) => {
  upload.single("photo")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    } else {
      const { nome } = req.body;
      res.json({ nome });
    }
  });
});
