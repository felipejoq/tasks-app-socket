import { IsEnum, IsNotEmpty } from "class-validator";
import { TaskStatus } from "@src/tasks/types/task.status.types";

export class TaskUpdateDto {
    constructor(partial: Partial<TaskUpdateDto>) {
        Object.assign(this, partial);
    }

    @IsNotEmpty({
        message: `El estatus es obligatorio y debe ser uno de los siguientes: ${Object.values(TaskStatus).join(", ")}`
    })
    @IsEnum(TaskStatus, {
        message: `El estatus debe ser uno de los siguientes: ${Object.values(TaskStatus).join(", ")}`
    })
    status: TaskStatus;
}