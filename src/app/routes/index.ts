import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { scheduleRoutes } from '../modules/schedule/schedule.routes';
import { doctorScheduleRoutes } from '../modules/doctorSchedule/doctorSchedule.routes';
import { SpecialtiesRoutes } from '../modules/specialities/specialities.routes';
import { doctorRoutes } from '../modules/doctor/doctor.routes';
import { appointmentRoutes } from '../modules/appointment/appointment.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { PatientRoutes } from '../modules/patient/patient.routes';
import { PrescriptionRoutes } from '../modules/prescription/prescription.routes';


const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/schedule',
        route: scheduleRoutes
    },
    {
        path: '/doctor-schedule',
        route: doctorScheduleRoutes
    },
     {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
     {
        path: '/doctor',
        route: doctorRoutes
    },
     {
        path: '/admin',
        route: AdminRoutes
    },
     {
        path: '/patient',
        route: PatientRoutes
    },
     {
        path: '/appoinment',
        route: appointmentRoutes
    },
     {
        path: '/prescription',
        route: PrescriptionRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;