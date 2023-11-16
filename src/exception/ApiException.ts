export class ApiException extends Error {

    statusCode: number;
    message: string;
    exception: { message?: string, original_query?: string } | undefined;

    constructor(statusCode: number, message: string, exception?: { message?: string, original_query?: string }) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.exception = exception;
        Object.setPrototypeOf(this, ApiException.prototype);
    }
}
