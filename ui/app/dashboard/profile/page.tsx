"use client";
import Img from "@/components/img";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type PasswordChangeSchemaType, PasswordChangeSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Shield, HelpCircle, LogOut, Trash2, Save, KeyRound } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

const avatar = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItaWNvbiBsdWNpZGUtdXNlciI+PHBhdGggZD0iTTE5IDIxdi0yYTQgNCAwIDAgMC00LTRIOWE0IDQgMCAwIDAtNCA0djIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48L3N2Zz4="

type BackendData = {
    name: string;
    email: string;
    avatar: string;
}

export default function Profile() {
    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-inherit text-inherit">
            <div className="mb-8 bg-foreground text-background">
                <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
            </div>
            
            <section id="profile" className="rounded-xl border p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-4">
                    <User className="w-5 h-5 text-muted-foreground" />
                    Personal Information
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative group cursor-pointer">
                            <Img id="pfp" src={avatar} alt="Avatar" type="avatar" className="-z-5" />
                            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium">
                                Edit
                            </div>
                        </div>
                        <button className="text-sm text-primary hover:underline font-medium">Remove Picture</button>
                    </div>
                    <div className="flex-1 space-y-5 w-full">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none text-muted-foreground">User ID</label>
                            <Input value="usr_9f8d7e6c5b4a3" readOnly className="border-dashed" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none">Full Name</label>
                            <Input defaultValue="John Doe" placeholder="Your name" className="focus-visible:ring-primary" />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium leading-none text-muted-foreground">Email Address</label>
                            <Input value="john.doe@example.com" readOnly className="border-dashed" />
                        </div>
                        <div className="pt-2">
                            <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all active:scale-95 font-medium shadow-sm">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section id="security-changes" className="rounded-xl border p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-4">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    Security
                </h2>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between p-4 rounded-lg border">
                    <div>
                        <h3 className="font-medium">Password</h3>
                        <p className="text-sm text-muted-foreground mt-1">Update your password to keep your account secure.</p>
                    </div>
                    <ChangePassword />
                </div>
            </section>

            <section id="support" className="rounded-xl border p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b pb-4">
                    <HelpCircle className="w-5 h-5 text-muted-foreground" />
                    Support & Help
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border">
                    <div>
                        <h3 className="font-medium">Need Assistance?</h3>
                        <p className="text-sm text-muted-foreground mt-1">Our support team is available 24/7 to help you.</p>
                    </div>
                    <button className="mt-4 sm:mt-0 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all font-medium shadow-sm active:scale-95 border">
                        Contact Support
                    </button>
                </div>
            </section>

            <section id="leave-zone" className="rounded-xl border border-destructive/20 p-6 md:p-8 shadow-sm mt-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-destructive"></div>
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-destructive border-b border-destructive/10 pb-4">
                    Danger Zone
                </h2>
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                            <h3 className="font-medium">Log Out</h3>
                            <p className="text-sm text-muted-foreground mt-1">Sign out of your account on this device.</p>
                        </div>
                        <button className="flex items-center justify-center gap-2 px-5 py-2.5 border border-border rounded-lg transition-all active:scale-95 font-medium whitespace-nowrap">
                            <LogOut className="w-4 h-4" /> Log Out
                        </button>
                    </div>
                    <div className="h-px bg-border/50 w-full" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg hover:bg-destructive/5 transition-colors">
                        <div>
                            <h3 className="font-medium">Delete Account</h3>
                            <p className="text-sm text-muted-foreground mt-1">Permanently remove your account and all of your data.</p>
                        </div>
                        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg transition-all shadow-sm active:scale-95 font-medium whitespace-nowrap">
                            <Trash2 className="w-4 h-4" /> Delete Account
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ChangePassword() {
    const form = useForm<PasswordChangeSchemaType>({
        resolver: zodResolver(PasswordChangeSchema),
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_password: "",
        },
    })
    
    // UI state for password matching visualization
    const newPass = form.watch("new_password");
    const confirmPass = form.watch("confirm_password");
    const passwordsMatch = newPass && confirmPass && newPass === confirmPass;

    function onSubmit(data: PasswordChangeSchemaType) {
        // for now leave it blank
    }
    
    return (
        <Dialog modal>
        <DialogTrigger className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium shadow-sm active:scale-95 whitespace-nowrap mt-4 sm:mt-0">
            <KeyRound className="w-4 h-4" /> Change Password
        </DialogTrigger>
        <DialogContent className="bg-background flex flex-col justify-center items-center w-full max-w-md border p-8 rounded-2xl shadow-xl">
            <div className="w-full text-center mb-6">
                <h2 className="text-2xl font-bold">Update Password</h2>
                <p className="text-muted-foreground text-sm mt-2">Enter your new password below.</p>
            </div>
            
            <form id="form-change-password" className="w-full space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="space-y-4">
                    <Controller
                        name="old_password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="old-password">Current Password</FieldLabel>
                            <Input
                                id="old-password"
                                type="password"
                                placeholder="••••••••"
                                className="focus-visible:ring-primary"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="new_password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="new-password">New Password</FieldLabel>
                            <Input
                                id="new-password"
                                type="password"
                                placeholder="••••••••"
                                className="focus-visible:ring-primary"
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="confirm_password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="••••••••"
                                className={`focus-visible:ring-primary ${passwordsMatch ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
                                aria-invalid={fieldState.invalid}
                                {...field}
                            />
                            {fieldState.invalid ? (
                                <FieldError errors={[fieldState.error]} />
                            ) : passwordsMatch ? (
                                <p className="text-xs text-green-500 mt-1">Passwords match</p>
                            ) : null}
                            </Field>
                        )}
                    />
                </FieldGroup>
                
                <div className="pt-4 flex flex-col sm:flex-row gap-3 w-full">
                    <button 
                        className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-all active:scale-95 font-medium disabled:opacity-50 disabled:cursor-not-allowed" 
                        type="submit" 
                        form="form-change-password"
                        disabled={!passwordsMatch && form.formState.isDirty}
                    >
                        <Save className="w-4 h-4" /> Save Password
                    </button>
                    <DialogTrigger>
                        Cancel
                    </DialogTrigger>
                </div>
            </form>
        </DialogContent>
        </Dialog>
    )
}