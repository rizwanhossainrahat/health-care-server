import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";
import { appointmentService } from "./appointment.service";
import pick from "../../helper/pick";


const createAppointment=catchAsync(async(req:Request & {user?: IJWTPayload},res:Response)=>{
    const user=req.user;
    const result=await appointmentService.createAppointment(user as IJWTPayload,req.body)
    
    sendResponse(res,{
        statusCode:201,
        success:true,
        message:"Appointment created successfully",
        data:result
    })
})

const getMyAppointment = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const fillters = pick(req.query, ["status", "paymentStatus"])
    const user = req.user;
    const result = await appointmentService.getMyAppointment(user as IJWTPayload, fillters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Appointment fetched successfully!",
        data: result
    })
})

const updateAppointmentStatus = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    const result = await appointmentService.updateAppointmentStatus(id, status, user as IJWTPayload);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Appointment updated successfully!",
        data: result
    })
})


export const appointmentController={
    createAppointment,
    getMyAppointment,
    updateAppointmentStatus
}