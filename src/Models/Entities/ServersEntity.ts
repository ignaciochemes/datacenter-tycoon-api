import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cpu } from "./CpuEntity";
import { Ram } from "./RamEntity";
import { Storage } from "./StorageEntity";

@Entity()
export class Servers {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: false, length: 255 })
    public description: string;

    @Column({ nullable: false })
    public price: number;

    @ManyToOne(() => Cpu, (cpu) => cpu.id)
    @JoinColumn({ name: "cpu_id" })
    public cpu: Cpu;

    @ManyToOne(() => Ram, (ram) => ram.id)
    @JoinColumn({ name: "ram_id" })
    public ram: Ram;

    @ManyToOne(() => Storage, (storage) => storage.id)
    @JoinColumn({ name: "storage_id" })
    public storage: Storage;

    @Column({ nullable: false, name: "power_consumption" })
    public powerConsumption: number;

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

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getCpu(): Cpu {
        return this.cpu;
    }

    public setCpu(cpu: Cpu): void {
        this.cpu = cpu;
    }

    public getRam(): Ram {
        return this.ram;
    }

    public setRam(ram: Ram): void {
        this.ram = ram;
    }

    public getStorage(): Storage {
        return this.storage;
    }

    public setStorage(storage: Storage): void {
        this.storage = storage;
    }

    public getPowerConsumption(): number {
        return this.powerConsumption;
    }

    public setPowerConsumption(powerConsumption: number): void {
        this.powerConsumption = powerConsumption;
    }

}