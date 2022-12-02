import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DatacenterTypes } from "src/Models/Entities/DatacenterTypesEntity";
import { Repository } from "typeorm";

@Injectable()
export class DatacenterTypesDao {
    constructor(@InjectRepository(DatacenterTypes) private _datacenterTypesRepository: Repository<DatacenterTypes>) { }

    async findTypeById(id: number): Promise<DatacenterTypes> {
        const query = this._datacenterTypesRepository.createQueryBuilder("datacenterTypes")
            .where("datacenterTypes.id = :id", { id: id })
            .getOne();
        return await query;
    }
}