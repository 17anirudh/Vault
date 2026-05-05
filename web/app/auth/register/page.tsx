import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function RegisterPage() {
  return (
    <div>
      <div>Register</div>
      <Link href={ROUTES.LOGIN}>Login</Link>
      <Link href={ROUTES.DASHBOARD}>Dashboard</Link>
    </div>
  );
}