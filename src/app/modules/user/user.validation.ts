import z from "zod";

const createPatientValidationSchema=z.object({
    password:z.string(),
    patient:z.object({
        name:z.string({error:"Name is Required"}),
        email:z.string({error:"Email is Required"})
    })
})

export const UserValidation={
    createPatientValidationSchema
}