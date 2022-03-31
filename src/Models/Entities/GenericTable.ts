import { Column, UpdateDateColumn } from "typeorm";

export abstract class GenericEntity {
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP()', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', name: 'update_at' })
    updatedAt: Date;

    @Column({ type: 'datetime', nullable: true, name: 'delete_at' })
    deleteAt: Date;

}