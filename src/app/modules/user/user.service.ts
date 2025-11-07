import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../shared/prisma";
import { createPatientInput } from "./user.interface";
import bcrypt from "bcryptjs";
import { Doctor, UserRole } from "@prisma/client";

const createPatient=async(req:Request)=>{

    if(req.file){
        const uploadedResult=await fileUploader.uploadToCloudinary(req.file)
        req.body.patient.profilePhoto=uploadedResult?.secure_url
    }

    const hashPassword=await bcrypt.hash(req.body.password,10)
    const result=await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data:{
                email:req.body.patient.email,
                password:hashPassword
            }
        })
       return await tnx.patient.create({
            data:req.body.patient
        })
    })

    return result
}

const createDoctor=async(req:Request)=>{
    const file=req.file
    if(file){
        const uploadedResult=await fileUploader.uploadToCloudinary(file)
        req.body.doctor.profilePhoto=uploadedResult?.secure_url
    }

    const hashPassword=await bcrypt.hash(req.body.password,10)
    const result=await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data:{
                email:req.body.doctor.email,
                password:hashPassword,
                role:UserRole.DOCTOR
            }
        })
       return await tnx.doctor.create({
            data:req.body.doctor
        })
    })

    return result
}

const createAdmin=async(req:Request)=>{
    const file=req.file
    if(file){
        const uploadedResult=await fileUploader.uploadToCloudinary(file)
        req.body.admin.profilePhoto=uploadedResult?.secure_url
    }

    const hashPassword=await bcrypt.hash(req.body.password,10)
    const result=await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data:{
                email:req.body.admin.email,
                password:hashPassword,
                role:UserRole.ADMIN
            }
        })
       return await tnx.admin.create({
            data:req.body.admin
        })
    })

    return result
}

export const userService={
    createPatient,
    createDoctor,
    createAdmin
}