import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Models/Entities/UserEntity";
import { Repository } from "typeorm";

@Injectable()
export class UserDao {
    constructor(@InjectRepository(User) private _userRepository: Repository<User>) { }

    async save(body: User): Promise<User> {
        return await this._userRepository.save(body);
    }

    async findById(id: number): Promise<User> {
        return await this._userRepository.findOne(id);
    }

    async getUserByEmail(email: string): Promise<User> {
        const user: User = await this._userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.rol", "rol")
            .where("user.email = :email", { email: email })
            .getOne();
        return user;
    }

    async getUserByUuid(uuid: string): Promise<User> {
        const user: User = await this._userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.rol", "rol")
            .where("user.uuid = :uuid", { uuid: uuid })
            .getOne();
        return user;
    }

}