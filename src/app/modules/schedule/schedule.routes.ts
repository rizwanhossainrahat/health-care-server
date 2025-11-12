import express from "express"
import { scheduleController } from "./schedule.controller"
import { UserRole } from "@prisma/client"
import auth from "../../middlewares/auth"

const router=express.Router()

router.get(
    "/",
    auth(UserRole.DOCTOR, UserRole.ADMIN),
    scheduleController.schedulesForDoctor
)

router.post("/",
    auth( UserRole.ADMIN),
    scheduleController.insertIntoDB)

router.delete(
    "/:id",
    auth( UserRole.ADMIN),
    scheduleController.deleteScheduleFromDB
)

export const scheduleRoutes=router