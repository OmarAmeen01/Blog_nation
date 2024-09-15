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
domain:z.string().optional(),
about:z.string().min(50).optional(),
pronoun:z.string().max(10).optional(),
image:z.string().optional(),
cover_image:z.string().optional(),
domain_title:z.string().max(50).optional()
})

export const validatePost = z.object({
categort: z.string().optional(),
content:z.object({
    blocks:z.array(z.object({
        data:z.object({
            text:z.string(),
            level:z.number()
        }),
       id:z.string(),
       type:z.string()
    })),
    time:z.number()
})
    
})

export const validateChangePassword= z.object({
    oldPassword:z.string().min(8),
    newPassword:z.string().min(8)
})
export const validateNotification = z.object({
    type:z.string(),
    like_id:z.string().optional(),
    user_id:z.string(),
    owner_id:z.string(),
    msg:z.string(),
    post_id:z.string().optional(),
    comment_id:z.string().optional(),
})

export type validateNotification = z.infer<typeof validateNotification>
export type validatePost= z.infer<typeof validatePost>
export type validateChangePassword= z.infer<typeof validateChangePassword>
export type validateProfileDetails = z.infer<typeof validateProfileDetails>
export type signin_out =z.infer<typeof signin_out>