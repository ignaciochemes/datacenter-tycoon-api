import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Servers } from "src/Models/Entities/ServersEntity";
import { Repository } from "typeorm";

@Injectable()
export class ServersDao {
    constructor(@InjectRepository(Servers) private _serversRepository: Repository<Servers>) { }

    async save(data: Servers): Promise<Servers> {
        return await this._serversRepository.save(data);
    }

}