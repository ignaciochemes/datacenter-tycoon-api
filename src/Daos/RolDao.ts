import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Rol } from "src/Models/Entities/RolEntity";
import { Repository } from "typeorm";

@Injectable()
export class RolDao {
    constructor(@InjectRepository(Rol) private _rolRepository: Repository<Rol>) { }

    async getRolById(id: number): Promise<Rol> {
        return await this._rolRepository.findOne(id);
    }

}