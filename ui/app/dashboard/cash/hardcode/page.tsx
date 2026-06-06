"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { HardcodeSchema, type HardcodeSchemaType } from "@/lib/schema"
import { SendHorizonalIcon } from "lucide-react"

export default function HardcodePage() {
    const form = useForm<HardcodeSchemaType>({
            resolver: zodResolver(HardcodeSchema),
        })
    
        function onSubmit(data: HardcodeSchemaType) {
            
        }
    return (
        <main className="w-full min-h-screen flex justify-center items-center p-4">
            <form id="form-transfer-id" className="w-full max-w-md flex flex-col gap-6 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-white/5 border border-white/10" onSubmit={form.handleSubmit(onSubmit)}>
                
                <FieldGroup className="flex flex-col gap-8">
                    <Controller
                        name="address"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <Input
                                className="border bg-transparent text-center font-sans text-2xl h-20 min-w-[250px]"
                                placeholder="Enter Recipient Address"
                                {...field}
                                id="form-transfer-id-amount"
                                aria-invalid={fieldState.invalid}
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="money"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-transfer-id-contact" className="sr-only">Money</FieldLabel>
                            <div className="flex items-center justify-center gap-1 w-full mt-4">
                                <span className="text-5xl sm:text-6xl font-medium text-gray-400 dark:text-gray-500 pb-1">$</span>
                                <Input
                                    className="border-none bg-transparent text-center text-6xl sm:text-7xl font-bold tracking-tighter h-full w-full max-w-[250px]"
                                    {...field}
                                    type="number"
                                    placeholder="0"
                                    id="form-transfer-id-contact"
                                    aria-invalid={fieldState.invalid}
                                    autoComplete="off"
                                />
                            </div>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                
                <Field orientation="horizontal">
                    <div className="flex items-center justify-center gap-4 w-full mt-8">
                        <button className="flex-1 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/30" type="submit" form="form-transfer-id">
                            <SendHorizonalIcon className="w-5 h-5" /> Send
                        </button>
                        <button className="py-4 px-8 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 font-medium rounded-full transition-colors" type="reset" onClick={() => form.reset()}>
                            Cancel
                        </button>
                    </div>
                </Field>
            </form>
        </main>
    )
}