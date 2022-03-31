import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ram } from "src/Models/Entities/RamEntity";
import { Repository } from "typeorm";

@Injectable()
export class RamDao {
    constructor(@InjectRepository(Ram) private _ramRepository: Repository<Ram>) { }

    async save(data: Ram): Promise<Ram> {
        return await this._ramRepository.save(data);
    }

    async findById(id: number): Promise<Ram> {
        return await this._ramRepository.findOne({ id: id });
    }

    async find(): Promise<Ram[]> {
        return await this._ramRepository.find();
    }

}