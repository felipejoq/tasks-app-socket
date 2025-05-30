import { IsOptional, MaxLength, IsNotEmpty } from "class-validator";

export class TaskSaveDto {
    constructor(partial: Partial<TaskSaveDto>) {
        Object.assign(this, partial);
    }

    @IsNotEmpty({
        message: "El título es obligatorio"
    })
    @MaxLength(100, {
        message: "El título no puede exceder los 100 caracteres"
    })
    titulo: string;

    @IsOptional()
    @MaxLength(500, {
        message: "La descripción no puede exceder los 500 caracteres"
    })
    descripcion?: string;
}