import http from 'node:http';
import path from 'node:path';
import express, { Response, Request, Router, Application as ExpressApp } from 'express';
import { AppDataSource } from "@src/database/app.datasource";
import { CorsMiddleware } from "@src/middlewares/cors.middleware";

interface Options {
  app: ExpressApp;
  port: number;
  routes: Router;
  public_path?: string;
  accepted_origins?: string[];
}

export class Server {

  private app: ExpressApp;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly acceptedOrigins: string[];
  private readonly routes: Router;
  private serverListener: http.Server | undefined;

  constructor(options: Options) {
    const {app,  port, routes, accepted_origins = [], public_path = 'public' } = options;
    this.app = app;
    this.port = port;
    this.publicPath = public_path;
    this.acceptedOrigins = accepted_origins;
    this.routes = routes;
    this.serverListener = undefined;
  }

  async start() {

    //* Middlewares
    this.app.use(CorsMiddleware.corsAllow(this.acceptedOrigins))
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* SPA
    this.app.get(/(.*)/, (_: Request, res: Response) => {
      const indexPath = path.resolve(`${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    //* Database
    AppDataSource.initialize().then(() => {
      console.log('Database connected');
    }).catch((error) => {
      console.error(error);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

  public getListener(): http.Server | undefined {
    return this.serverListener
  }

}