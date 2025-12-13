import express from "express"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { doctorScheduleController } from "./doctorSchedule.contoller"
import { DoctorScheduleValidation } from "./doctorSchedule.validation"
import validateRequest from "../../middlewares/validateRequest"


const router=express.Router()

router.post("/",
    auth(UserRole.DOCTOR),
    validateRequest(DoctorScheduleValidation.createDoctorScheduleValidationSchema),
    doctorScheduleController.insertIntoDB
)

router.get(
    '/',
    auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    doctorScheduleController.getAllFromDB
);

router.get(
    '/my-schedule',
    auth(UserRole.DOCTOR),
    doctorScheduleController.getMySchedule
)

router.delete(
    '/:id',
    auth(UserRole.DOCTOR),
    doctorScheduleController.deleteFromDB
);

export const doctorScheduleRoutes=router