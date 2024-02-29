import cors from "cors";
import express from "express";
import morgan from "morgan";

import type { Express } from "express";
import { fileRoutes } from "./routes/file";


class Application {
  use(arg0: (err: any, req: any, res: any, next: any) => any) {
      throw new Error("Method not implemented.");
  }
  public server: Express;

  public constructor() {
    this.server = express();

    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: "*",
      })
    );
    this.server.use(morgan("tiny"));
  }

  private routes(): void {
    this.server.use(fileRoutes)
  }
}

const app = new Application();

export { app };
