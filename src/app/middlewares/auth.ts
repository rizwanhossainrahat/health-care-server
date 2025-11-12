import { NextFunction, Request, Response } from "express"
import { jwtHelper } from "../helper/jwtHelpers"
import config from "../../config"
import ApiError from "../error/apiError"
import httpStatus from "http-status"

const auth=(...roles:string[])=>{
    return async(req:Request &{user?:any},res:Response,next:NextFunction)=>{
        try {
            const token=req.cookies.accessToken
            if(!token){
                throw new ApiError(httpStatus.UNAUTHORIZED,"Your are not authorized")
            }
            const verifyUser=jwtHelper.verifyToken(token,config.jwt.jwt_access_secret as string)
            req.user=verifyUser
            if(token && !roles.includes(verifyUser.role)){
                throw new ApiError(httpStatus.BAD_REQUEST,"Your are not allow to access this route")
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}

export default auth;