import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../shared/prisma";
import { createPatientInput } from "./user.interface";
import bcrypt from "bcryptjs";
import { Doctor, Prisma, UserRole } from "@prisma/client";
import { paginationHelper } from "../../helper/paginationHelper";
import { userSearchableFields } from "./user.constant";

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

const getAllFromDB=async(params:any,options:any)=>{
   const{page,limit,skip,sortBy,sortOrder}=paginationHelper.calculatePagination(options)
    const{searchTerm,...filterData}=params

    const andCondition:Prisma.UserWhereInput[]=[]

    if(searchTerm){
       andCondition.push({
         OR:userSearchableFields.map(field=>({
            [field]:{
                contains:searchTerm,
                mode:"insensitive"
            }
        }))
       })
    }

    if(Object.keys(filterData).length>0){
        andCondition.push({
            AND:Object.keys(filterData).map(key=>({
                [key]:{
                    equals:(filterData as any)[key]
                }
            }))
        })
    }

    const whereCondition:Prisma.UserWhereInput=andCondition.length>0?{AND:andCondition}:{}

    const result =await prisma.user.findMany({
        skip,
        take:limit,
        where:whereCondition,
        orderBy:{
            [sortBy]:sortOrder
        }
        
    })
    const total=await prisma.user.count({
        where:whereCondition
    });

    return {
        meta:{
            page,
            limit,
            total
        },
        data:result
    }
}

export const userService={
    createPatient,
    createDoctor,
    createAdmin,
    getAllFromDB
}