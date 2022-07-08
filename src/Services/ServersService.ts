import { Injectable } from "@nestjs/common";
import { CpuDao } from "src/Daos/CpuDao";
import { RamDao } from "src/Daos/RamDao";
import { ServersDao } from "src/Daos/ServersDao";
import { StorageDao } from "src/Daos/StorageDao";
import { StatusCodeEnums } from "src/Enums/StatusCodeEnums";
import { HttpCustomException } from "src/Exceptions/HttpCustomException";
import { Cpu } from "src/Models/Entities/CpuEntity";
import { Ram } from "src/Models/Entities/RamEntity";
import { Servers } from "src/Models/Entities/ServersEntity";
import { Storage } from "src/Models/Entities/StorageEntity";
import AdminCreateCpuRequest from "src/Models/Request/ServersController/AdminCreateCpuRequest";
import AdminCreateRamRequest from "src/Models/Request/ServersController/AdminCreateRamRequest";
import AdminCreateServersRequest from "src/Models/Request/ServersController/AdminCreateServersRequest";
import AdminCreateStorageRequest from "src/Models/Request/ServersController/AdminCreateStorageRequest";
import GetCpusResponse from "src/Models/Response/ServersController/GetCpusResponse";
import GetRamsResponse from "src/Models/Response/ServersController/GetRamsResponse";
import GetStoragesResponse from "src/Models/Response/ServersController/GetStoragesResponse";
import { JwtSecurityService } from "./Security/JwtSecurityService";

@Injectable()
export class ServersService {
    constructor(
        private readonly _serversDao: ServersDao,
        private readonly _cpuDao: CpuDao,
        private readonly _ramDao: RamDao,
        private readonly _storageDao: StorageDao,
        private readonly _jwtSecurityService: JwtSecurityService,
    ) { }

    async getCpus(token: string): Promise<Array<GetCpusResponse>> {
        let response: Array<GetCpusResponse> = [];
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        const cpus = await this._cpuDao.find();
        if (!cpus) throw new HttpCustomException('Not found any cpu', StatusCodeEnums.INVALID_CPU);
        response = cpus.map(cpu => {
            return new GetCpusResponse(cpu);
        });
        return response;
    }

    async getRams(token: string): Promise<Array<GetRamsResponse>> {
        let response: Array<GetRamsResponse> = [];
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        const rams = await this._ramDao.find();
        if (!rams) throw new HttpCustomException('Not found any ram', StatusCodeEnums.INVALID_RAM);
        response = rams.map(ram => {
            return new GetRamsResponse(ram);
        });
        return response;
    }

    async getStorages(token: string): Promise<Array<GetStoragesResponse>> {
        let response: Array<GetStoragesResponse> = [];
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        const storages = await this._storageDao.find();
        if (!storages) throw new HttpCustomException('Not found any storage', StatusCodeEnums.INVALID_STORAGE);
        response = storages.map(storage => {
            return new GetStoragesResponse(storage);
        });
        return response;
    }

    async adminCreate(data: AdminCreateServersRequest, token: string): Promise<any> {
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        if (isValidToken.rol !== 1) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        const cpu = await this._cpuDao.findById(data.cpu);
        if (!cpu) throw new HttpCustomException('Invalid cpu', StatusCodeEnums.INVALID_CPU);
        const ram = await this._ramDao.findById(data.ram);
        if (!ram) throw new HttpCustomException('Invalid ram', StatusCodeEnums.INVALID_RAM);
        const storage = await this._storageDao.findById(data.storage);
        if (!storage) throw new HttpCustomException('Invalid storage', StatusCodeEnums.INVALID_STORAGE);

        let newServer = new Servers();
        newServer.setCpu(cpu);
        newServer.setRam(ram);
        newServer.setStorage(storage);
        newServer.setPowerConsumption(data.powerConsumption);
        await this._serversDao.save(newServer);
        return newServer;
    }

    async adminCreateCpu(data: AdminCreateCpuRequest, token: string): Promise<any> {
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        if (isValidToken.rol !== 1) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);

        let newCpu: Cpu = new Cpu();
        newCpu.setName(data.name);
        newCpu.setDescription(data.description);
        newCpu.setPrice(data.price);
        newCpu.setCores(data.cores);
        newCpu.setThreads(data.threads);
        newCpu.setMhz(data.mhz);
        await this._cpuDao.save(newCpu);
        return newCpu;
    }

    async adminCreateRam(data: AdminCreateRamRequest, token: string): Promise<any> {
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        if (isValidToken.rol !== 1) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);

        let newRam: Ram = new Ram();
        newRam.setName(data.name);
        newRam.setDescription(data.description);
        newRam.setPrice(data.price);
        newRam.setCapacity(data.capacity);
        await this._ramDao.save(newRam);
        return newRam;
    }

    async adminCreateStorage(data: AdminCreateStorageRequest, token: string): Promise<any> {
        const isValidToken = await this._jwtSecurityService.verifyToken(token);
        if (!isValidToken) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);
        if (isValidToken.rol !== 1) throw new HttpCustomException('Invalid token', StatusCodeEnums.INVALID_TOKEN);

        let newStorage: Storage = new Storage();
        newStorage.setName(data.name);
        newStorage.setDescription(data.description);
        newStorage.setPrice(data.price);
        newStorage.setCapacity(data.capacity);
        await this._storageDao.save(newStorage);
        return newStorage;
    }

}