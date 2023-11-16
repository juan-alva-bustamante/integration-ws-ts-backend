import {Response} from "express";
import {ApiException} from "../exception/ApiException";
import {ICommonResponse} from "../interfaces/Request/ICommonResponse";

export class CommonResponse {

    public static commonResponse(response: Response, dataResponse: ICommonResponse) {
        const {data, code, success, message} = dataResponse;
        return response.status(code).json({
            status: code,
            success,
            message,
            data
        });
    }

    public static commonErrorResponse(err: ApiException | any, response: Response) {
        if (err instanceof ApiException) {
            return CommonResponse.commonResponse(response, {
                code: err.statusCode,
                success: false,
                message: err.message,
                data: err.exception?.message
            });
        }
        return CommonResponse.commonResponse(response, {
            code: 500,
            success: false,
            message: "Error al cargar los datos, intenta de nuevo",
            data: null
        });
    }

}