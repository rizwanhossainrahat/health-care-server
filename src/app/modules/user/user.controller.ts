import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { userFilterableFields } from "./user.constant";
import { IJWTPayload } from "../../types/common";
import httpStatus from "http-status";

const createPatient=catchAsync(async(req:Request,res:Response)=>{
    const result=await userService.createPatient(req)
    sendResponse(res,{
        statusCode:201,
        success:true,
        message:"patient is created successfully",
        data:result
    })
})

const createDoctor=catchAsync(async(req:Request,res:Response)=>{
    const result=await userService.createDoctor(req)
    sendResponse(res,{
        statusCode:201,
        success:true,
        message:"Doctor is created successfully",
        data:result
    })
})

const createAdmin=catchAsync(async(req:Request,res:Response)=>{
    const result=await userService.createAdmin(req)
    sendResponse(res,{
        statusCode:201,
        success:true,
        message:"Admin is created successfully",
        data:result
    })
})

const getAllFromDB=catchAsync(async(req:Request,res:Response)=>{
    const options=pick(req.query,["page","limit","sortBy","orderBy"])
    const filter=pick(req.query,userFilterableFields)
    // const {page,limit,searchTerm,sortBy,sortOrder,role,status}=req.query
    
    const result=await userService.getAllFromDB(filter,options)
    sendResponse(res,{
        statusCode:201,
        success:true,
        message:"User retirve successfully",
        meta:result.meta,
        data:result.data
    })
})

const getMyProfile = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

    const user = req.user;

    const result = await userService.getMyProfile(user as IJWTPayload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile data fetched!",
        data: result
    })
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await userService.changeProfileStatus(id, req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users profile status changed!",
        data: result
    })
});

export const userController={
    createPatient,
    createDoctor,
    createAdmin,
    getAllFromDB,
    getMyProfile,
    changeProfileStatus
}