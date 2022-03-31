import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { HeaderRequired } from "src/Helpers/Decorators/HeaderRequiredDecorator";
import Response from "src/Helpers/Formatter/Response";
import AdminCreateCpuRequest from "src/Models/Request/ServersController/AdminCreateCpuRequest";
import AdminCreateRamRequest from "src/Models/Request/ServersController/AdminCreateRamRequest";
import AdminCreateServersRequest from "src/Models/Request/ServersController/AdminCreateServersRequest";
import AdminCreateStorageRequest from "src/Models/Request/ServersController/AdminCreateStorageRequest";
import GetCpusResponse from "src/Models/Response/ServersController/GetCpusResponse";
import GetRamsResponse from "src/Models/Response/ServersController/GetRamsResponse";
import GetStoragesResponse from "src/Models/Response/ServersController/GetStoragesResponse";
import { ServersService } from "src/Services/ServersService";

@Controller('servers')
export class ServersController {
    constructor(private readonly _serversService: ServersService) { }

    @Get('cpus')
    @HttpCode(HttpStatus.OK)
    async getCpus(
        @HeaderRequired('access-token') token: string
    ): Promise<Response<GetCpusResponse[]>> {
        const response = await this._serversService.getCpus(token);
        return Response.create<GetCpusResponse[]>(response);
    }

    @Get('rams')
    @HttpCode(HttpStatus.OK)
    async getRams(
        @HeaderRequired('access-token') token: string
    ): Promise<Response<GetRamsResponse[]>> {
        const response = await this._serversService.getRams(token);
        return Response.create<GetRamsResponse[]>(response);
    }

    @Get('storages')
    @HttpCode(HttpStatus.OK)
    async getStorages(
        @HeaderRequired('access-token') token: string
    ): Promise<Response<GetStoragesResponse[]>> {
        const response = await this._serversService.getStorages(token);
        return Response.create<GetStoragesResponse[]>(response);
    }

    @Post('/admin/create')
    async adminCreate(
        @Body() body: AdminCreateServersRequest,
        @HeaderRequired('access-token') token: string
    ): Promise<Response<any>> {
        const response = await this._serversService.adminCreate(body, token);
        return Response.create<any>(response);
    }

    @Post('/admin/create/cpu')
    async adminCreateCpu(
        @Body() body: AdminCreateCpuRequest,
        @HeaderRequired('access-token') token: string
    ): Promise<Response<any>> {
        const response = await this._serversService.adminCreateCpu(body, token);
        return Response.create<any>(response);
    }

    @Post('/admin/create/ram')
    async adminCreateRam(
        @Body() body: AdminCreateRamRequest,
        @HeaderRequired('access-token') token: string
    ): Promise<Response<any>> {
        const response = await this._serversService.adminCreateRam(body, token);
        return Response.create<any>(response);
    }

    @Post('/admin/create/storage')
    async adminCreateStorage(
        @Body() body: AdminCreateStorageRequest,
        @HeaderRequired('access-token') token: string
    ): Promise<Response<any>> {
        const response = await this._serversService.adminCreateStorage(body, token);
        return Response.create<any>(response);
    }

}