import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cpu } from "./CpuEntity";
import { GenericEntity } from "./GenericTable";
import { Rack } from "./RackEntity";
import { Ram } from "./RamEntity";
import { Storage } from "./StorageEntity";
import { User } from "./UserEntity";

@Entity()
export class Servers extends GenericEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    public userId: User;

    @ManyToOne(() => Rack, (rack) => rack.id)
    @JoinColumn({ name: 'rack_id' })
    public rackId: Rack;

    @Column({ nullable: true })
    public uuid: string;

    @ManyToOne(() => Cpu, (cpu) => cpu.id)
    @JoinColumn({ name: "cpu_id" })
    public cpu: Cpu;

    @ManyToOne(() => Ram, (ram) => ram.id)
    @JoinColumn({ name: "ram_id" })
    public ram: Ram;

    @ManyToOne(() => Storage, (storage) => storage.id)
    @JoinColumn({ name: "storage_id" })
    public storage: Storage;

    @Column({ nullable: true })
    public dedicated: boolean;

    @Column({ nullable: true })
    public vps: boolean;

    @Column({ nullable: true })
    public vms: number;

    @Column({ nullable: false, name: "power_consumption" })
    public powerConsumption: number;

    @Column({ nullable: true })
    public run: boolean;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
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

    public isDedicated(): boolean {
        return this.dedicated;
    }

    public setDedicated(dedicated: boolean): void {
        this.dedicated = dedicated;
    }

    public isVps(): boolean {
        return this.vps;
    }

    public setVps(vps: boolean): void {
        this.vps = vps;
    }

    public getVms(): number {
        return this.vms;
    }

    public setVms(vms: number): void {
        this.vms = vms;
    }

    public getPowerConsumption(): number {
        return this.powerConsumption;
    }

    public setPowerConsumption(powerConsumption: number): void {
        this.powerConsumption = powerConsumption;
    }

    public getRun(): boolean {
        return this.run;
    }

    public setRun(run: boolean): void {
        this.run = run;
    }

}