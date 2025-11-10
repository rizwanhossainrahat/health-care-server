import express from "express"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { doctorScheduleController } from "./doctorSchedule.contoller"


const router=express.Router()

router.post("/",
    auth(UserRole.DOCTOR),
    doctorScheduleController.insertIntoDB
)

export const doctorScheduleRoutes=router