import { HttpException, HttpStatus } from "@nestjs/common";
import { StatusCodeEnums, StatusCodeExceptionText } from "src/Enums/StatusCodeEnums";

export class HttpCustomException extends HttpException {
    errors: any;

    constructor(
        message: string,
        statusCode: number,
        errors?: any,
        httpCode: number = HttpStatus.BAD_REQUEST,
    ) {
        super(HttpException.createBody(message, HttpCustomException.getStatusText(statusCode), statusCode), httpCode);
        this.errors = errors;
    }

    static getStatusText(statusCode: StatusCodeEnums) {
        const text = StatusCodeExceptionText[statusCode];
        return text ? text : 'Bad Request';
    }

}