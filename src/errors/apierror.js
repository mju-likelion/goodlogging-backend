export class APIError extends Error{
    statusCode;
    errorCode;
    errorMessage;
    constructor(statusCode, err){
        super(err.message);
        this.errorMessage = err.message;
        this.errorCode = err.code;
        this.statusCode = statusCode;
    }
}