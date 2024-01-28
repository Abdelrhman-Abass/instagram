import * as z from "zod"


export const SignupValidation = z.object({
    name:z.string().min(2,{message :"Too short for name"}),
    username: z.string().min(2,{message :"Too short for username"}),
    email : z.string().email(),
    password:z.string().min(8,{message: "Password must be at least 8 characters"})
})

export const SignInValidation = z.object({
    email : z.string().email(),
    password:z.string().min(8,{message: "Password must be at least 8 characters"})
})