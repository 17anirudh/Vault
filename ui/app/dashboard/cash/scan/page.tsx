"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HardcodeSchema, type HardcodeSchemaType } from "@/lib/schema";
import { SendHorizonalIcon, CameraIcon, UploadIcon, RefreshCcwIcon } from "lucide-react";
import { QRCamera, QrFile } from "@/components/qr-code";

export default function ScanPage() {
    const [scannedAddress, setScannedAddress] = useState<string | null>(null);

    const form = useForm<HardcodeSchemaType>({
        resolver: zodResolver(HardcodeSchema),
        defaultValues: {
            address: "",
        }
    });

    function onSubmit(data: HardcodeSchemaType) {
        // Handle submit
        console.log("Submitted", data);
    }

    function handleScan(value: string) {
        setScannedAddress(value);
        form.setValue("address", value);
    }

    function resetScan() {
        setScannedAddress(null);
        form.reset();
    }

    return (
        <main className="w-full min-h-screen flex justify-center items-center p-4">
            {!scannedAddress ? (
                <div className="w-full max-w-md flex flex-col gap-6 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-white/5 border border-white/10">
                    <div className="flex flex-col items-center text-center gap-2 mb-4">
                        <CameraIcon className="w-10 h-10 opacity-70" />
                        <h2 className="text-2xl font-semibold tracking-tight">Scan QR Code</h2>
                        <p className="text-sm opacity-60">Position the QR code within the frame to scan</p>
                    </div>
                    
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-white/20 flex items-center justify-center">
                        <QRCamera onScan={handleScan} />
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="relative w-full">
                            <label className="flex items-center justify-center gap-2 w-full py-4 px-6 border border-white/10 hover:bg-white/5 font-medium rounded-full transition-colors cursor-pointer shadow-lg">
                                <UploadIcon className="w-5 h-5" /> Upload Image
                                <div className="absolute inset-0 opacity-0 cursor-pointer overflow-hidden flex items-center justify-center">
                                    <QrFile onScan={handleScan} />
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            ) : (
                <form id="form-scan-id" className="w-full max-w-md flex flex-col gap-6 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-white/5 border border-white/10" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold tracking-tight">Send Payment</h2>
                        <button 
                            type="button" 
                            onClick={resetScan}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors opacity-70 hover:opacity-100"
                            title="Rescan"
                        >
                            <RefreshCcwIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <FieldGroup className="flex flex-col gap-8">
                        <Controller
                            name="address"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-scan-id-address" className="text-sm opacity-60 ml-2">Recipient Address</FieldLabel>
                                    <Input
                                        className="border bg-transparent text-center font-sans text-xl h-16 w-full opacity-60 cursor-not-allowed"
                                        {...field}
                                        id="form-scan-id-address"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        readOnly
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
                                    <FieldLabel htmlFor="form-scan-id-amount" className="sr-only">Money</FieldLabel>
                                    <div className="flex items-center justify-center gap-1 w-full mt-4">
                                        <span className="text-5xl sm:text-6xl font-medium opacity-60 pb-1">$</span>
                                        <Input
                                            className="border-none bg-transparent text-center text-6xl sm:text-7xl font-bold tracking-tighter h-full w-full max-w-[250px]"
                                            {...field}
                                            type="number"
                                            placeholder="0"
                                            id="form-scan-id-amount"
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
                            <button className="flex-1 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-600/30" type="submit" form="form-scan-id">
                                <SendHorizonalIcon className="w-5 h-5" /> Send
                            </button>
                            <button className="py-4 px-8 border border-white/10 hover:bg-white/5 font-medium rounded-full transition-colors" type="button" onClick={resetScan}>
                                Cancel
                            </button>
                        </div>
                    </Field>
                </form>
            )}
        </main>
    );
}