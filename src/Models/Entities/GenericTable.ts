import { Column, UpdateDateColumn } from "typeorm";

export abstract class GenericEntity {
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_at' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true, name: 'delete_at' })
    deleteAt: Date;

}