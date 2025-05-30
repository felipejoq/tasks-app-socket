import { TaskEvent } from '@src/tasks/types/task.event.types';
import { SocketServer } from './Socket.Server';

export class SocketService {

    // emit
    static emit(event: TaskEvent, data: any): void {
        SocketServer.getInstanceOrThrow().getIo().emit(event, data);
    }

    // on
    static on(event: TaskEvent, callback: (data: any) => void): void {
        SocketServer.getInstanceOrThrow().getIo().on(event, callback);
    }
}