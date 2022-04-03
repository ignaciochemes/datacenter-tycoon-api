import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Datacenter } from "src/Models/Entities/DatacenterEntity";
import { User } from "src/Models/Entities/UserEntity";
import { Repository } from "typeorm";

@Injectable()
export class DatacenterDao {
    constructor(@InjectRepository(Datacenter) private _datacenterRepository: Repository<Datacenter>) { }

    async save(datacenter: Datacenter): Promise<Datacenter> {
        return await this._datacenterRepository.save(datacenter);
    }

    async findTypeById(id: number): Promise<Datacenter> {
        return await this._datacenterRepository.findOne({ id: id });
    }

    async findByUserId(user: User): Promise<Datacenter> {
        const query: Datacenter = await this._datacenterRepository
            .createQueryBuilder("datacenter")
            .leftJoinAndSelect("datacenter.datacenterType", "datacenterType")
            .leftJoinAndSelect("datacenter.userId", "user")
            .where("user.id = :userId", { userId: user.getId() })
            .getOne();
        return query;
    }
}