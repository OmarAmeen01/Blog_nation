import z from "zod"

export const signin_out =z.object({
    first_name:z.string().max(50).optional(),
    last_name:z.string().max(50).optional(),
    email:z.string().email(),
    password:z.string().min(8)
})
export const validateProfileDetails = z.object({
last_name:z.string().max(25).optional(),
first_name:z.string().max(25).optional(),
domain:z.string().url().optional(),
about:z.string().min(50).optional(),
pronoun:z.string().max(10).optional(),
image:z.string().url().optional(),
cover_image:z.string().url().optional(),
domain_title:z.string().max(50).optional()
})

export const validatePost = z.object({
    title:z.string().max(50).optional(),
    description:z.string().min(50).optional(),
    image:z.string().url().optional(),
    category:z.string().max(100).optional()
})

export const validateChangePassword= z.object({
    oldPassword:z.string().min(8),
    newPassword:z.string().min(8)
})

export type validatePost= z.infer<typeof validatePost>
export type validateChangePassword= z.infer<typeof validateChangePassword>
export type validateProfileDetails = z.infer<typeof validateProfileDetails>
export type signin_out =z.infer<typeof signin_out>