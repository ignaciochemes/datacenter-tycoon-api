import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cpu {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false, length: 255 })
    public name: string;

    @Column({ nullable: false, length: 255 })
    public description: string;

    @Column({ nullable: false })
    public price: number;

    @Column({ nullable: false })
    public cores: number;

    @Column({ nullable: false })
    public threads: number;

    @Column({ nullable: false })
    public mhz: number;

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

    public getCores(): number {
        return this.cores;
    }

    public setCores(cores: number): void {
        this.cores = cores;
    }

    public getThreads(): number {
        return this.threads;
    }

    public setThreads(threads: number): void {
        this.threads = threads;
    }

    public getMhz(): number {
        return this.mhz;
    }

    public setMhz(mhz: number): void {
        this.mhz = mhz;
    }


}