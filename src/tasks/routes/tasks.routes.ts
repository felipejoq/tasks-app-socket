import { Router } from "express";
import { TasksController } from "@src/tasks/controllers/tasks.controller";
import { TasksService } from "@src/tasks/services/tasks.service";

export class TasksRoutes {

  static get routes() {

    const tasksRouter = Router();
    const tasksService = new TasksService();
    const tasksController = new TasksController(tasksService);

    // *** Tasks Routes ***
    tasksRouter.get('/', tasksController.index.bind(tasksController));
    tasksRouter.get('/:id', tasksController.show.bind(tasksController));
    tasksRouter.post('/', tasksController.store.bind(tasksController));
    tasksRouter.put('/:id', tasksController.update.bind(tasksController));
    tasksRouter.delete('/:id', tasksController.destroy.bind(tasksController));

    return tasksRouter;
  }

}