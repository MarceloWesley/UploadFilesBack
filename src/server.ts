import "dotenv/config";

import { app } from "./app";

async function bootstrap(): Promise<void> {
  const { SERVER_PORT } = process.env;
  const server = app.server;

  server.listen(SERVER_PORT, function () {
    console.log(`Servidor rodando em http://localhost:${SERVER_PORT}/`);
  });
}

bootstrap();