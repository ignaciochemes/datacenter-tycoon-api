import { Injectable } from "@nestjs/common";
import { AxiosWebServices } from "./AxiosWebService";

@Injectable()
export class ExampleWebService extends AxiosWebServices {

    async example(data: any): Promise<any> {
        const url = `${process.env.URL_USER_OAUTH}`;
        const headers = this.buildDefaultConfig();
        const config = this.buildAxiosRequestConfig({ ...headers, "Authorization": process.env.AUTHORIZATION_SECRET })
        const response = await this.post(url, data, config);
        return response;
    }

}