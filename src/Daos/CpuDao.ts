import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cpu } from "src/Models/Entities/CpuEntity";
import { Repository } from "typeorm";

@Injectable()
export class CpuDao {
    constructor(@InjectRepository(Cpu) private _cpuRepository: Repository<Cpu>) { }

    async save(data: Cpu): Promise<Cpu> {
        return await this._cpuRepository.save(data);
    }

    async findById(id: number): Promise<Cpu> {
        const query = this._cpuRepository.createQueryBuilder('cpu')
            .where('cpu.id = :id', { id: id })
            .getOne();
        return await query;
    }

    async find(): Promise<Cpu[]> {
        return await this._cpuRepository.find();
    }

}