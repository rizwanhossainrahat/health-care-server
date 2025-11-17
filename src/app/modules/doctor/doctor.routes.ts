import express from "express";
import { DoctorController } from "./doctor.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
const router = express.Router();

router.get(
    "/",
    DoctorController.getAllFromDB
)

router.post("/suggestion",DoctorController.getAISuggestions)

router.get('/:id', DoctorController.getByIdFromDB);

router.patch(
    "/:id",
    DoctorController.updateIntoDB
)

router.delete(
    '/:id',
    auth(UserRole.ADMIN),
    DoctorController.deleteFromDB
);

router.delete(
    '/soft/:id',
    auth(UserRole.ADMIN),
    DoctorController.softDelete);


export const doctorRoutes = router;