export class TaskShowDto {
    constructor(partial: Partial<TaskShowDto>) {
        Object.assign(this, partial);
    }

    id: number;
    titulo: string;
    descripcion?: string;
    status: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}