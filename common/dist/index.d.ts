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
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    image?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    category?: string | undefined;
}, {
    image?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    category?: string | undefined;
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
export type validatePost = z.infer<typeof validatePost>;
export type validateChangePassword = z.infer<typeof validateChangePassword>;
export type validateProfileDetails = z.infer<typeof validateProfileDetails>;
export type signin_out = z.infer<typeof signin_out>;
