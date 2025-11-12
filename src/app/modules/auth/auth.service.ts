import { UserStatus } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { jwtHelper } from "../../helper/jwtHelpers";
import config from "../../../config";
import ApiError from "../../error/apiError";
import httpStatus from "http-status"

const login=async(payload:{email:string,password:string})=>{
    const user=await prisma.user.findFirstOrThrow({
        where:{
            email:payload.email,
            status:UserStatus.ACTIVE
        }
    })
    const isCorrectPassword=await bcrypt.compare(payload.password,user.password)
    if(!isCorrectPassword){
        throw new ApiError(httpStatus.BAD_REQUEST,"password is incorrect")
    }

    const accessToken=jwtHelper.generateToken({email:user.email,role:user.role},config.jwt.jwt_access_secret as string,config.jwt.jwt_access_expire as string)
    const refreshToken=jwtHelper.generateToken({email:user.email,role:user.role},config.jwt.jwt_refresh_secret as string,config.jwt.jwt_refresh_expire as string)
    

    return{
        accessToken,
        refreshToken,
        needPasswordChange:user.needPasswordChange
    }
}

export const authService={
    login
}