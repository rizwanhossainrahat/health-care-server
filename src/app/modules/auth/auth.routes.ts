import express from "express"
import { authController } from "./auth.controller"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"

const router=express.Router()

router.get(
    "/me",
    authController.getMe
)

router.post(
    "/login",
    authController.login
    )

    router.post(
    '/refresh-token',
    authController.refreshToken
)

router.post(
    '/change-password',
    auth(
        UserRole.ADMIN,
        UserRole.DOCTOR,
        UserRole.PATIENT
    ),
    authController.changePassword
);

router.post(
    '/forgot-password',
    authController.forgotPassword
);

router.post(
    '/reset-password',
    authController.resetPassword
)

export const authRoutes=router