import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "@src/tasks/types/task.status.types";

@Entity({
    name: 'tasks'
})
export class Task {
    constructor(partial: Partial<Task>) {
        Object.assign(this, partial);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    titulo: string;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: true
    })
    descripcion?: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.PENDIENTE
    })
    status: TaskStatus;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'fecha_creacion'
    })
    fechaCreacion: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'fecha_actualizacion',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    fechaActualizacion: Date;
}