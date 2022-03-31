import { Injectable, NotFoundException } from "@nestjs/common";
import { CompanyDao } from "src/Daos/CompanyDao";
import { UserDao } from "src/Daos/UserDao";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import { Company } from "src/Models/Entities/CompanyEntity";
import { User } from "src/Models/Entities/UserEntity";
import CreateCompanyRequest from "src/Models/Request/CompanyController/CreateCompanyRequest";
import GetCompanyByUserIdResponse from "src/Models/Response/CompanyController/GetCompanyByUserIdResponse";
import IdResponse from "src/Models/Response/IdResponse";
import { JwtSecurityService } from "./Security/JwtSecurityService";

@Injectable()
export class CompanyService {
    constructor(
        private readonly _companyDao: CompanyDao,
        private readonly _jwtSecurityService: JwtSecurityService,
        private readonly _userDao: UserDao
    ) { }

    async create(data: CreateCompanyRequest, token: string): Promise<IdResponse> {
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        const user: User = await this._userDao.findById(isValidToken.id);
        if (!user) throw new HttpCustomException('User not found', StatusCodeEnums.USER_NOT_FOUND);
        const company = await this._companyDao.findById(isValidToken.id);
        if (company) throw new HttpCustomException('You already have a company', StatusCodeEnums.COMPANY_DUPLICATED);
        let newCompany = new Company();
        newCompany.setUserId(user);
        newCompany.setName(data.name);
        newCompany.setDescription(data.description);
        newCompany.setRegistrationDate(new Date());
        newCompany.setActive(true);
        await this._companyDao.save(newCompany);
        return new IdResponse(newCompany.getUserId().getId());
    }

    async getCompanyByUserId(token: string, uuid: string): Promise<GetCompanyByUserIdResponse> {
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        const user: User = await this._userDao.findById(isValidToken.id);
        if (!user) throw new HttpCustomException('User not found', StatusCodeEnums.USER_NOT_FOUND);
        const company = await this._companyDao.findByUserUuid(uuid);
        if (!company) throw new NotFoundException('Company not found');
        return new GetCompanyByUserIdResponse(user, company);
    }
}