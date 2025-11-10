import { NextFunction, Request, Response } from "express"
import { jwtHelper } from "../helper/jwtHelpers"
import config from "../../config"

const auth=(...roles:string[])=>{
    return async(req:Request &{user?:any},res:Response,next:NextFunction)=>{
        try {
            const token=req.cookies.accessToken
            if(!token){
                throw new Error("Your are not authorized")
            }
            const verifyUser=jwtHelper.verifyToken(token,config.jwt.jwt_access_secret as string)
            req.user=verifyUser
            if(token && !roles.includes(verifyUser.role)){
                throw new Error("Your are not allow to access this route")
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}

export default auth;