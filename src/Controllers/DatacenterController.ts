import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { HeaderRequired } from "src/Helpers/Decorators/HeaderRequiredDecorator";
import Response from "src/Helpers/Formatter/Response";
import CreateDatacenterRequest from "src/Models/Request/DatacenterController/CreateDatacenterRequest";
import GetDatacenterByUserIdResponse from "src/Models/Response/DatacenterController/GetDatacenterByUserIdResponse";
import IdResponse from "src/Models/Response/IdResponse";
import { DatacenterService } from "src/Services/DatacenterService";

@Controller('datacenter')
export class DatacenterController {
    constructor(private readonly _datacenterService: DatacenterService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() body: CreateDatacenterRequest,
        @HeaderRequired('access-token') token: string
    ): Promise<Response<IdResponse>> {
        const response = await this._datacenterService.create(body, token);
        return Response.create<IdResponse>(response);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getByUserId(
        @HeaderRequired('access-token') token: string
    ): Promise<Response<GetDatacenterByUserIdResponse>> {
        const response = await this._datacenterService.getByUserId(token);
        return Response.create<GetDatacenterByUserIdResponse>(response);
    }

}