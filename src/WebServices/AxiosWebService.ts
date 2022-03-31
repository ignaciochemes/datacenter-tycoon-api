import axios from '../Helpers/Utilities/InterceptedAxios';
import { Injectable } from "@nestjs/common";
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export abstract class AxiosWebServices {
    async get<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
        try {
            const response: AxiosResponse<R> = await axios.get(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async post<R = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig): Promise<R> {
        try {
            const response: AxiosResponse<R> = await axios.post<R>(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    protected buildDefaultConfig(countryCode: string = null): AxiosRequestConfig {
        const headers = this.getDefaultHeaders(countryCode);
        return this.buildAxiosRequestConfig(headers);
    }

    protected getDefaultHeaders(countryCode: string = null): { [key: string]: string } {
        return {
            'content-type': 'application/json',
            'country-code': countryCode,
        };
    }

    protected buildAxiosRequestConfig(headers: any = null, params: any = null): AxiosRequestConfig {
        const config: AxiosRequestConfig = {
            headers: headers,
            params: params,
        };
        return config;
    }

}