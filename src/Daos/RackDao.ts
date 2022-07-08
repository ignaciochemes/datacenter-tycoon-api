import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rack } from "src/Models/Entities/RackEntity";
import { Repository } from "typeorm";

@Injectable()
export class RackDao {
    constructor(@InjectRepository(Rack) private _ramRepository: Repository<Rack>) { }

    async save(data: Rack): Promise<Rack> {
        return await this._ramRepository.save(data);
    }

    async findByUserId(userId: number): Promise<Rack[]> {
        const query = this._ramRepository.createQueryBuilder("rack")
            .leftJoinAndSelect("rack.datacenterId", "datacenter")
            .leftJoinAndSelect("datacenter.userId", "user")
            .where("user.id = :userId", { userId });
        return await query.getMany();
    }
}