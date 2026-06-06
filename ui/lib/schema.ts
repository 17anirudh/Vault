import z from "zod"
 
export const TransferIdSchema = z.object({
  amount: z
    .number("Need a valid number")
    .int()
    .min(0, "Amount must be at least 0."),
  contact: z
    .string()
    .min(3, "Contact ID is required.")
    .max(32, "Contact ID must be at most 32 characters."),
})

export const PasswordChangeSchema = z.object({
  old_password: z
                 .string()
                 .min(1, "Current password is required"),
  new_password: z
                  .string()
                  .min(8, "Password must be at least 8 characters"),
  confirm_password: z
                    .string()
                    .min(1, "Please confirm your password"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export const HardcodeSchema = z.object({
  address: z
            .string()
            .min(3, "Credit user's address cannot be less than 3")
            .max(20, "Credit user's address cannot be more than 20"),
  money: z.number().int().gte(1)
})

export const ScanSchema = HardcodeSchema.pick({ money: true })

export type TransferIdSchemaType = z.infer<typeof TransferIdSchema>
export type PasswordChangeSchemaType = z.infer<typeof PasswordChangeSchema>
export type HardcodeSchemaType = z.infer<typeof HardcodeSchema>
export type ScanSchemaType = z.infer<typeof ScanSchema>