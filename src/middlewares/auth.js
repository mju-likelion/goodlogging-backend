import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { APIError } from "../errors/apierror";
import errorCodes from "../errors/error";

export const auth = (req, res, next) => {
    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    }catch(error){
        if(error.name === 'TokenExpiredError'){
            throw new APIError(httpStatus.UNAUTHORIZED, errorCodes.AUTH_EXPIRED);
        }
        throw new APIError(httpStatus.UNAUTHORIZED, errorCodes.UNVALID_AUTH);
    }
}