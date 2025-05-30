import { TasksRoutes } from "@src/tasks/routes/tasks.routes";
import { Router } from "express";

export class AppRoutes {

  static get routes() {
    const AppRouter = Router();

    AppRouter.use('/tasks', TasksRoutes.routes);

    return AppRouter;
  }

}