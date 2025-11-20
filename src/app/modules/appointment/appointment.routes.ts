import express from "express"
import { appointmentController } from "./appointment.controller"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"

const router=express.Router()

router.get(
    "/my-appointments",
    auth(UserRole.PATIENT, UserRole.DOCTOR),
    appointmentController.getMyAppointment
)

router.post(
    "/",
     auth(UserRole.PATIENT),
    appointmentController.createAppointment
    )

    router.patch(
    "/status/:id",
    auth(UserRole.ADMIN, UserRole.DOCTOR),
    appointmentController.updateAppointmentStatus
)

export const appointmentRoutes=router