import { Cpu } from "src/Models/Entities/CpuEntity";

export default class GetCpusResponse {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public cores: number;
    public threads: number;
    public mhz: number;

    constructor(cpu: Cpu) {
        this.id = cpu.getId();
        this.name = cpu.getName();
        this.description = cpu.getDescription();
        this.price = cpu.getPrice();
        this.cores = cpu.getCores();
        this.threads = cpu.getThreads();
        this.mhz = cpu.getMhz();
    }

}