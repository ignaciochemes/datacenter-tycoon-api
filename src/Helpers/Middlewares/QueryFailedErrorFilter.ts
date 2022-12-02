import { QueryFailedError } from "typeorm";
import { Request, Response } from "express";
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import ErrorResponse from "src/Models/Response/ErrorResponse";

@Catch(QueryFailedError)
export class QueryFailedErrorFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: Response = ctx.getResponse<Response>();
        const request: Request = ctx.getRequest<Request>();
        const message: string = exception.message;
        const name: string = exception.name;
        const body: string = JSON.stringify(message);
        const headers: string = JSON.stringify(request.headers);
        const errorResponse: ErrorResponse = ErrorResponse.create(
            HttpStatus.UNPROCESSABLE_ENTITY,
            "Internal server error",
            name,
        );
        console.error(`Error Query ${exception.query}`);
        console.error(`Message Query error: ${exception.message}`);
        console.error(`StatusCode: ${response.statusCode}. Body: ${body}. Headers: ${headers}`);
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}