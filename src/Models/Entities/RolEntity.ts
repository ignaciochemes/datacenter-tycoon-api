import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GenericEntity } from './GenericTable';

@Entity()
export class Rol extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false, length: 100 })
    public description: string;

    @Column({ default: true })
    public enable: boolean;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public isEnable(): boolean {
        return this.enable;
    }

    public setEnable(enable: boolean): void {
        this.enable = enable;
    }
}
