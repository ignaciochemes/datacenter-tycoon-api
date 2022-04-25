import { Injectable } from "@nestjs/common";
import { CompanyDao } from "src/Daos/CompanyDao";
import { DatacenterDao } from "src/Daos/DatacenterDao";
import { DatacenterTypesDao } from "src/Daos/DatacenterTypesDao";
import { UserDao } from "src/Daos/UserDao";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import { Datacenter } from "src/Models/Entities/DatacenterEntity";
import { DatacenterTypes } from "src/Models/Entities/DatacenterTypesEntity";
import CreateDatacenterRequest from "src/Models/Request/DatacenterController/CreateDatacenterRequest";
import GetDatacenterByUserIdResponse from "src/Models/Response/DatacenterController/GetDatacenterByUserIdResponse";
import IdResponse from "src/Models/Response/IdResponse";
import { JwtSecurityService } from "./Security/JwtSecurityService";

@Injectable()
export class DatacenterService {
    constructor(
        private readonly _datacenterDao: DatacenterDao,
        private readonly _datacenterTypesDao: DatacenterTypesDao,
        private readonly _userDao: UserDao,
        private readonly _companyDao: CompanyDao,
        private readonly _jwtSecurityService: JwtSecurityService
    ) { }

    async create(data: CreateDatacenterRequest, token: string): Promise<IdResponse> {
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        const user = await this._userDao.getUserByUuid(isValidToken.uuid);
        if (!user) throw new HttpCustomException('User not found', StatusCodeEnums.USER_NOT_FOUND);
        const findCompany = await this._companyDao.findByUserUuid(user.getUuid());
        if (!findCompany) throw new HttpCustomException('Company not found', StatusCodeEnums.COMPANY_NOT_FOUND);
        const findUserDatacenter = await this._datacenterDao.findByUserId(user);
        if (findUserDatacenter) throw new HttpCustomException('User already has a datacenter', StatusCodeEnums.USER_HAS_DATACENTER);
        const datacenterType: DatacenterTypes = await this._datacenterTypesDao.findTypeById(data.type);
        if (!datacenterType) throw new HttpCustomException('Datacenter type not found', StatusCodeEnums.DATACENTER_TYPE_NOT_FOUND);

        let newDatacenter: Datacenter = new Datacenter();
        newDatacenter.setUserId(user);
        newDatacenter.setDatacenterType(datacenterType)
        newDatacenter.setName(data.name);
        newDatacenter.setDescription(data.description);
        await this._datacenterDao.save(newDatacenter);
        return new IdResponse(newDatacenter.getId());
    }

    async getByUserId(token: string): Promise<GetDatacenterByUserIdResponse> {
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        const user = await this._userDao.getUserByUuid(isValidToken.uuid);
        if (!user) throw new HttpCustomException('User not found', StatusCodeEnums.USER_NOT_FOUND);
        const findUserDatacenter = await this._datacenterDao.findByUserId(user);
        if (!findUserDatacenter) throw new HttpCustomException('User has no datacenter', StatusCodeEnums.USER_HAS_NO_DATACENTER);
        return new GetDatacenterByUserIdResponse(user, findUserDatacenter);
    }

}