import { DataSource } from "typeorm";
import { envsPlugin } from "@config/plugins/envs.plugin";
import { Task } from "@src/tasks/models/task.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envsPlugin.HOST_DB,
  port: envsPlugin.PORT_DB,
  username: envsPlugin.USERNAME_DB,
  password: envsPlugin.PASSWORD_DB,
  database: envsPlugin.DATABASE_DB,
  synchronize: envsPlugin.SYNCHRONIZE_DB,
  logging: envsPlugin.LOGGING_DB,
  entities: [Task],
  subscribers: [],
  migrations: [],
});