import http from 'http';
import express, { Response, Request, Router, Application as ExpressApp } from 'express';
import path from 'path';
import { AppDataSource } from "@src/database/app.datasource";
import { CorsMiddleware } from "@middlewares/cors.middleware";
// import { Server as SocketIOServer } from 'socket.io';


interface Options {
  app: ExpressApp;
  port: number;
  routes: Router;
  public_path?: string;
  accepted_origins?: string[];
  // serverListener?: http.Server;
  // io?: SocketIOServer;
}

export class Server {

  private app: ExpressApp;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly acceptedOrigins: string[];
  private readonly routes: Router;
  private serverListener: http.Server | undefined;
  // private io?: SocketIOServer;

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

    if (this.app._router && this.app._router.stack) {
      this.app._router.stack.forEach((layer: any) => {
        if (layer.route && layer.route.path) {
          console.log(layer.route.path);
        }
      });
    }

    //* Database
    AppDataSource.initialize().then(() => {
      console.log('Database connected');
    }).catch((error) => {
      console.error(error);
    });

    // const httpServer = http.createServer(this.app);
    // this.io = new SocketIOServer(httpServer, {
    //   cors: {
    //     origin: this.acceptedOrigins,
    //     methods: ["GET", "POST"]
    //   }
    // });

    // this.io.on('connection', (socket) => {
    //   console.log('Client connected:', socket.id);
    //   // You can add more event listeners here
    // });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

  // async stop() {
  //   this.serverListener?.close();
  // }

  public getListener(): http.Server | undefined {
    return this.serverListener
  }

  // public getIo(): SocketIOServer | undefined {
  //   return this.io;
  // }

}