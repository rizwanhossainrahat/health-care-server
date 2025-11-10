import express from "express"
import { scheduleController } from "./schedule.controller"
import { UserRole } from "@prisma/client"
import auth from "../../middlewares/auth"

const router=express.Router()

router.get(
    "/",
    auth(UserRole.DOCTOR, UserRole.DOCTOR),
    scheduleController.schedulesForDoctor
)

router.post("/",scheduleController.insertIntoDB)

router.delete(
    "/:id",
    scheduleController.deleteScheduleFromDB
)

export const scheduleRoutes=router