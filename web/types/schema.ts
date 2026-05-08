import { z } from "zod";
import type { ZodObject, ZodString } from "zod";

type T = ZodObject<any>
const username: ZodString = z
                .string()
                .min(4, "Username must be at least 4 characters long")
                .max(20, "Username must be at most 20 characters long")
                .regex(/^[a-zA-Z. ]+$/, {
                    message: "Only letters, dots, and spaces are allowed",
                });

const profileSchema: T = z.object({
    name: z.string().min(4).max(50),
    username: username
})

const account: T = z.object({
    name: username,
    pin: z.number().int().gt(999).lt(10000),
})

const transcationSchema: T = z.object({
    receiver_id: z.uuid(),
    amount: z.number().int().gte(1),
})

const registerSchema: T = z.object({
    email: z.email(),
    username: username,
    password: z
                .string()
                .min(8, "Password must be at least 6 characters long")
                .max(25, "Password must be at most 25 characters long"),
})

const loginSchema: T = z.object({
    identity: z.union([ z.email(), username ]),
    password: z
                .string()
                .min(8, "Password must be at least 6 characters long")
                .max(25, "Password must be at most 25 characters long"),
})

type profileSchemaType = z.infer<typeof profileSchema>
type accountType = z.infer<typeof account>
type transcationSchemaType = z.infer<typeof transcationSchema>
type registerSchemaType = z.infer<typeof registerSchema>
type loginSchemaType = z.infer<typeof loginSchema>

export { profileSchema, account, transcationSchema, registerSchema, loginSchema }
export type { profileSchemaType, accountType, transcationSchemaType, registerSchemaType, loginSchemaType, T }