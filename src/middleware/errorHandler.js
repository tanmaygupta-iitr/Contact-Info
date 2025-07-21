import { constants } from "../constants.js";

export const errorHANDLER=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.NOT_FOUND:
            res.json({
                title: "NOT FOUND",
                message: err.message,
                stackTrace: `${err.stack}` 
            })
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "THIS IS FORBIDDEN",
                message: err.message,
                stackTrace: `${err.stack}` 
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "USER NOT AUTHORIZED",
                message: err.message,
                stackTrace: `${err.stack}` 
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "INTERNAL SERVER ERROR",
                message: err.message,
                stackTrace: `${err.stack}` 
            });
            break;
        case constants.VALIDATION_ERRO:
            res.json({
                title: "VALIDATION ERROR",
                message: err.message,
                stackTrace: `${err.stack}` 
            })
            break;
        default:
            console.log("No error. All good!")
    }
    res.json({
        message: err.message,
        stackTrace: `${err.stack}` 
    })
}