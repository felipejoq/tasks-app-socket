import { Repository } from "typeorm";
import { Task } from "../models/task.model";
import { AppDataSource } from "@src/database/app.datasource";
import { TaskShowDto } from "../dtos/task.show.dto";
import { CustomError } from "@src/config/errors/custom.error";
import { SocketService } from "@src/socket/socket.service";
import { TaskEvent } from "../types/task.event.types";

export class TasksService {

    private tasksRepository: Repository<Task>;

    constructor() {
        this.tasksRepository = AppDataSource.manager.getRepository(Task);
    }

    async getAllTasks(): Promise<TaskShowDto[]> {
        const tasks = await this.tasksRepository.find();
        return tasks.map(task => new TaskShowDto(task));
    }

    async getTaskById(id: number): Promise<TaskShowDto> {
        const task = await this.tasksRepository.findOneBy({ id });

        if (!task) {
            throw CustomError.notFound(`Task with ID ${id} not found`);
        }

        return new TaskShowDto(task);
    }

    async createTask(taskData: Partial<Task>): Promise<TaskShowDto> {
        const task = this.tasksRepository.create(taskData);
        const savedTask = await this.tasksRepository.save(task);

        SocketService.emit(TaskEvent.TASK_CREATED, savedTask);
        
        return new TaskShowDto(savedTask);
    }

    async updateTask(id: number, taskData: Partial<Task>): Promise<TaskShowDto> {
        const task = await this.tasksRepository.findOneBy({ id });
        if (!task) {
            throw CustomError.notFound(`Task con el ID ${id} no existe`);
        }

        Object.assign(task, taskData);
        const updatedTask = await this.tasksRepository.save(task);

        SocketService.emit(TaskEvent.TASK_UPDATED, updatedTask);

        return new TaskShowDto(updatedTask);
    }

    async deleteTask(id: number): Promise<TaskShowDto> {
        const result = await this.tasksRepository.delete(id);

        if (result.affected === 0) {
            throw CustomError.notFound(`Tarea con ID ${id} no eliminada`);
        }

        SocketService.emit(TaskEvent.TASK_DELETED, { id });

        return new TaskShowDto({ id });
    }
}