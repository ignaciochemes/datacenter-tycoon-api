import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "src/Models/Entities/CompanyEntity";
import { Repository } from "typeorm";

@Injectable()
export class CompanyDao {
    constructor(@InjectRepository(Company) private _companyRepository: Repository<Company>) { }

    async save(company: Company): Promise<Company> {
        return await this._companyRepository.save(company);
    }

    async findById(id: number): Promise<Company> {
        const query = await this._companyRepository
            .createQueryBuilder("company")
            .where("company.userId = :id", { id: id })
            .getOne();
        return query;
    }

    async findByUserUuid(uuid: string): Promise<Company> {
        const query = await this._companyRepository
            .createQueryBuilder("company")
            .leftJoinAndSelect("company.userId", "user")
            .where("user.uuid = :uuid", { uuid: uuid })
            .getOne();
        return query;
    }

}