import z from "zod";
export declare const signin_out: z.ZodObject<{
    first_name: z.ZodOptional<z.ZodString>;
    last_name: z.ZodOptional<z.ZodString>;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    first_name?: string | undefined;
    last_name?: string | undefined;
}, {
    email: string;
    password: string;
    first_name?: string | undefined;
    last_name?: string | undefined;
}>;
export declare const validateProfileDetails: z.ZodObject<{
    last_name: z.ZodOptional<z.ZodString>;
    first_name: z.ZodOptional<z.ZodString>;
    domain: z.ZodOptional<z.ZodString>;
    about: z.ZodOptional<z.ZodString>;
    pronoun: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    cover_image: z.ZodOptional<z.ZodString>;
    domain_title: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    first_name?: string | undefined;
    last_name?: string | undefined;
    domain?: string | undefined;
    about?: string | undefined;
    pronoun?: string | undefined;
    image?: string | undefined;
    cover_image?: string | undefined;
    domain_title?: string | undefined;
}, {
    first_name?: string | undefined;
    last_name?: string | undefined;
    domain?: string | undefined;
    about?: string | undefined;
    pronoun?: string | undefined;
    image?: string | undefined;
    cover_image?: string | undefined;
    domain_title?: string | undefined;
}>;
export declare const validatePost: z.ZodObject<{
    categort: z.ZodOptional<z.ZodString>;
    content: z.ZodObject<{
        blocks: z.ZodArray<z.ZodObject<{
            data: z.ZodObject<{
                text: z.ZodString;
                level: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                text: string;
                level: number;
            }, {
                text: string;
                level: number;
            }>;
            id: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            data: {
                text: string;
                level: number;
            };
            id: string;
        }, {
            type: string;
            data: {
                text: string;
                level: number;
            };
            id: string;
        }>, "many">;
        time: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        blocks: {
            type: string;
            data: {
                text: string;
                level: number;
            };
            id: string;
        }[];
        time: number;
    }, {
        blocks: {
            type: string;
            data: {
                text: string;
                level: number;
            };
            id: string;
        }[];
        time: number;
    }>;
}, "strip", z.ZodTypeAny, {
    content: {
        blocks: {
            type: string;
            data: {
                text: string;
                level: number;
            };
            id: string;
        }[];
        time: number;
    };
    categort?: string | undefined;
}, {
    content: {
        blocks: {
            type: string;
            data: {
                text: string;
                level: number;
            };
            id: string;
        }[];
        time: number;
    };
    categort?: string | undefined;
}>;
export declare const validateChangePassword: z.ZodObject<{
    oldPassword: z.ZodString;
    newPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    oldPassword: string;
    newPassword: string;
}, {
    oldPassword: string;
    newPassword: string;
}>;
export declare const validateNotification: z.ZodObject<{
    type: z.ZodString;
    like_id: z.ZodOptional<z.ZodString>;
    user_id: z.ZodString;
    owner_id: z.ZodString;
    msg: z.ZodString;
    post_id: z.ZodOptional<z.ZodString>;
    comment_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: string;
    user_id: string;
    owner_id: string;
    msg: string;
    like_id?: string | undefined;
    post_id?: string | undefined;
    comment_id?: string | undefined;
}, {
    type: string;
    user_id: string;
    owner_id: string;
    msg: string;
    like_id?: string | undefined;
    post_id?: string | undefined;
    comment_id?: string | undefined;
}>;
export type validateNotification = z.infer<typeof validateNotification>;
export type validatePost = z.infer<typeof validatePost>;
export type validateChangePassword = z.infer<typeof validateChangePassword>;
export type validateProfileDetails = z.infer<typeof validateProfileDetails>;
export type signin_out = z.infer<typeof signin_out>;
