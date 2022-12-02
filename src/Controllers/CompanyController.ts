import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { HeaderRequired } from "src/Helpers/Decorators/HeaderRequiredDecorator";
import Response from "src/Helpers/Formatter/Response";
import CreateCompanyRequest from "src/Models/Request/CompanyController/CreateCompanyRequest";
import GetCompanyByUserIdResponse from "src/Models/Response/CompanyController/GetCompanyByUserIdResponse";
import IdResponse from "src/Models/Response/IdResponse";
import { CompanyService } from "src/Services/CompanyService";

@Controller('company')
export class CompanyController {
    constructor(private readonly _companyService: CompanyService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() body: CreateCompanyRequest,
        @HeaderRequired('access-token') token: string
    ): Promise<Response<IdResponse>> {
        const response = await this._companyService.create(body, token);
        return Response.create<IdResponse>(response);
    }

    @Get('/:uuid')
    @HttpCode(HttpStatus.OK)
    async getCompanyByUuid(
        @Param('uuid') uuid: string,
        @HeaderRequired('access-token') token: string
    ): Promise<Response<GetCompanyByUserIdResponse>> {
        const response = await this._companyService.getCompanyByUserId(token, uuid);
        return Response.create<GetCompanyByUserIdResponse>(response);
    }
}