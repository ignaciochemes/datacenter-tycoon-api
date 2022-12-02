import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Storage } from "src/Models/Entities/StorageEntity";
import { Repository } from "typeorm";

@Injectable()
export class StorageDao {
    constructor(@InjectRepository(Storage) private _storageRepository: Repository<Storage>) { }

    async save(data: Storage): Promise<Storage> {
        return await this._storageRepository.save(data);
    }

    async findById(id: number): Promise<Storage> {
        const query: Storage = await this._storageRepository.createQueryBuilder("storage")
            .where("storage.id = :id", { id: id })
            .getOne();
        return query;
    }

    async find(): Promise<Storage[]> {
        return await this._storageRepository.find();
    }

}