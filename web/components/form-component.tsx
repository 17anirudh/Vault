"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { type RegisterSchemaType, RegisterSchema } from "@/types/auth";
import { register } from "@/api/auth";
import { toast } from "sonner";
import { KEYS } from "@/lib/query";
import { ROUTES } from "@/lib/routes";
import PremiumButton from "@components/ui/premium-button";
import { RotateCcwIcon } from "lucide-react";
import { Spinner } from "./ui/spinner";
import Image from "next/image";

export function RegisterForm() {
    const router = useRouter();
    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
        userName: "",
        email: "",
        password: ""
        },
        resetOptions: {
        keepValues: false
        }
    })

    const { mutate: onSubmit, isPending } = useMutation({
        mutationKey: KEYS.REGISTER,
        mutationFn: async (data: RegisterSchemaType) => register(data),
        onSuccess: () => {
          toast.success("Registration successful!");
          router.replace(ROUTES.DASHBOARD);
        },
        onError: () => {
          toast.error("We are facing some issue")
        }
    })
  
    return (
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit as any)} className="flex flex-col justify-center items-center w-full h-full">
          <Image 
            src="/favicon.png"
            width={100}
            height={100}
            alt="Logo"
          />
          <FieldGroup className="w-full flex flex-col items-center justify-center">
            <Controller
              name="userName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-sm p-2">
                  <FieldLabel htmlFor="form-rhf-demo-username">Create Username</FieldLabel>
                  <Input
                    className="max-w-sm text-background bg-foreground"
                    {...field}
                    value={field.value as string}
                    id="form-rhf-demo-username"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your username"
                    autoComplete="off"
                  />
                  <FieldDescription>
                    Enter a your identifier, make it unique
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-sm p-2">
                  <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                  <Input
                    className="max-w-sm text-background bg-foreground"
                    {...field}
                    value={field.value as string}
                    id="form-rhf-demo-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="off"
                  />
                  <FieldDescription>
                    Enter a valid email
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-sm p-2">
                  <FieldLabel htmlFor="form-rhf-demo-password">Password</FieldLabel>
                  <Input
                    className="max-w-sm text-background bg-foreground"
                    {...field}
                    value={field.value as string}
                    id="form-rhf-demo-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
                  />
                  <FieldDescription>
                    Enter a valid password
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field orientation="horizontal" className="w-full flex flex-wrap gap-3 items-center justify-center">
              <button onClick={() => form.reset()} className="flex gap-2 items-center">
                <RotateCcwIcon /> Reset
              </button>
              {isPending ? (
                <Spinner className="size-8" />
              ) : (
                <PremiumButton form="form-rhf-demo" text="Submit" />
              )}
            </Field>
          </FieldGroup>
        <button onClick={() => router.push(ROUTES.LOGIN)} className="hover:underline">Already have an account? Login</button>
      </form>
    )
}