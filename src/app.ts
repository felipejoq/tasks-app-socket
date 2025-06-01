import express from "express";
import { Server } from "@src/Server";
import { envsPlugin } from "@config/plugins/envs.plugin";
import { AppRoutes } from "@routes/v1/app.routes";
import { SocketServer } from "@src/socket/Socket.Server";
import "reflect-metadata";

(async () => {
    main();
})();

async function main() {

    const expressApp = express()

    const server = new Server({
        app:expressApp,
        port: envsPlugin.PORT,
        public_path: envsPlugin.PUBLIC_PATH,
        routes: AppRoutes.routes,
    });

    await server.start();

    SocketServer.getInstance(server.getListener()!);
}