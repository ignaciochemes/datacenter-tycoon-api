export default class ErrorResponse {
    statusCode: number;
    message: string;
    error: string;

    public constructor(statusCode: number, message: string, error: string) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }

    public static create(statusCode: number, message: string, error: string): ErrorResponse {
        return new ErrorResponse(statusCode, message, error);
    }
}