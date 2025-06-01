import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { handleError } from '@src/config/errors/handle.error';
import { TasksService } from '@src/tasks/services/tasks.service';
import { TaskSaveDto } from '@src/tasks/dtos/task.save.dto';
import { TaskUpdateDto } from '@src/tasks/dtos/task.update.dto';

export class TasksController {

    constructor(private readonly tasksService: TasksService) {
        this.tasksService = tasksService;
    }

    async index(_: Request, res: Response) {
        this.tasksService.getAllTasks()
            .then(tasks => res.json({ result: { tasks } }))
            .catch(error => handleError(error, res));
    }

    async show(req: Request, res: Response) {
        const taskId = parseInt(req.params.id, 10);

        if (isNaN(taskId)) {
            res.status(400).json({ result: { message: "ID de tarea inválido" } });
            return;
        }

        this.tasksService.getTaskById(taskId)
            .then(task => res.json({ task }))
            .catch(error => handleError(error, res));
    }

    async store(req: Request, res: Response) {
        const newTask = req.body;

        const taskDto = new TaskSaveDto(newTask);

        const errors = await validate(taskDto);

        if (errors.length > 0) {
            handleError(errors, res);
            return;
        }

        this.tasksService.createTask(taskDto)
            .then(task => res.status(201).json({ result: { message: "Tarea creada", task } }))
            .catch(error => handleError(error, res));

    }

    async update(req: Request, res: Response) {
        const taskId = parseInt(req.params.id, 10);
        const updatedTask = req.body;

        if (isNaN(taskId)) {
            res.status(400).json({ result: { message: "ID de tarea inválido" } });
            return;
        }

        const taskUpdateDto = new TaskUpdateDto(updatedTask);

        const errors = await validate(taskUpdateDto);
        if (errors.length > 0) {
            handleError(errors, res);
            return;
        }

        this.tasksService.updateTask(taskId, taskUpdateDto)
            .then(task => res.json({ result: { message: "Tarea actualizada", task } }))
            .catch(error => handleError(error, res));

    }

    async destroy(req: Request, res: Response) {
        const taskId = parseInt(req.params.id, 10);

        if (isNaN(taskId)) {
            res.status(400).json({ result: { message: "ID de tarea inválido" } });
            return;
        }

        this.tasksService.deleteTask(taskId)
            .then(task => res.json({ result: { message: "Tarea eliminada", task } }))
            .catch(error => handleError(error, res));
    }

}