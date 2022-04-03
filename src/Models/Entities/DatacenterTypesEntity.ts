import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenericEntity } from "./GenericTable";

@Entity()
export class DatacenterTypes extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: false, length: 255 })
    public ubication: string;

    @Column({ nullable: false })
    public price: number;

    @Column({ nullable: false, name: 'max_power' })
    public maxPower: number;

    @Column({ nullable: false, name: 'max_bandwidth' })
    public maxBandwidth: number;

    @Column({ nullable: false, name: 'max_racks' })
    public maxRacks: number;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getUbication(): string {
        return this.ubication;
    }

    public setUbication(ubication: string): void {
        this.ubication = ubication;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getMaxPower(): number {
        return this.maxPower;
    }

    public setMaxPower(maxPower: number): void {
        this.maxPower = maxPower;
    }

    public getMaxBandwidth(): number {
        return this.maxBandwidth;
    }

    public setMaxBandwidth(maxBandwidth: number): void {
        this.maxBandwidth = maxBandwidth;
    }

    public getMaxRacks(): number {
        return this.maxRacks;
    }

    public setMaxRacks(maxRacks: number): void {
        this.maxRacks = maxRacks;
    }

}