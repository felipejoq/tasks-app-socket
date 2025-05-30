import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

export class SocketServer {
    private static instance: SocketServer;
    private io: SocketIOServer;

    private constructor(httpServer: http.Server) {
        this.io = new SocketIOServer(httpServer, {
            cors: {
                origin: "*",
            }
        });

        this.io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);
        });
    }

    static getInstance(httpServer: http.Server): SocketServer {
        if (!SocketServer.instance) {
            SocketServer.instance = new SocketServer(httpServer);
        }
        return SocketServer.instance;
    }

    static getInstanceOrThrow(): SocketServer {
        if (!SocketServer.instance) {
            throw new Error("SocketServer instance not initialized. Call getInstance() first.");
        }
        return SocketServer.instance;
    }

    getIo(): SocketIOServer {
        return this.io;
    }
}