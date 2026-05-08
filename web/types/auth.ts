import { z } from "zod";
import type { ZodObject } from "zod";

const RegisterSchema: ZodObject<any> = z.object({
    userName: z
                .string()
                .min(3, "Username must be at least 3 characters long")
                .max(20, "Username must be at most 20 characters long"),

    email: z.email(),
    password: z
                .string()
                .min(6, "Password must be at least 6 characters long")
                .max(22, "Password must be at most 20 characters long"),
})

const LoginSchema: ZodObject<any> = RegisterSchema.omit({ userName: true })

export { RegisterSchema, LoginSchema }
export type RegisterSchemaType = z.infer<typeof RegisterSchema>
export type LoginSchemaType = z.infer<typeof LoginSchema>