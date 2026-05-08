import Image from "next/image";
import { RegisterForm } from "@/components/form-component";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function RegisterPage() {
  return (
    <div className="w-screen min-h-screen flex gap-2">
      <div className="hidden sm:w-1/2 sm:flex sm:flex-col sm:gap-2 md:border-r sm:justify-center sm:items-center">
        <Image 
          src="/favicon.png"
          width={100}
          height={100}
          alt="Logo"
          className="hover:animate-bounce"
        />
        <h2 className="text-3xl">
          Hey User, let's get you started
        </h2>
      </div>
      <div className="w-full sm:w-1/2">
        <RegisterForm />
      </div>
    </div>
  )
}