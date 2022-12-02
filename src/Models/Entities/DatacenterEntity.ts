import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DatacenterTypes } from "./DatacenterTypesEntity";
import { GenericEntity } from "./GenericTable";
import { User } from "./UserEntity";

@Entity()
export class Datacenter extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => DatacenterTypes, (datacenterType) => datacenterType.id)
    @JoinColumn({ name: 'datacenter_type_id' })
    public datacenterType: DatacenterTypes;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: false, length: 255 })
    public description: string;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public getUserId(): User {
        return this.userId;
    }

    public setUserId(userId: User): void {
        this.userId = userId;
    }

    public getDatacenterType(): DatacenterTypes {
        return this.datacenterType;
    }

    public setDatacenterType(datacenterType: DatacenterTypes): void {
        this.datacenterType = datacenterType;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

}