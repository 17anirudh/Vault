import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function LoginPage() {
  return (
    <>
      <Link href={ROUTES.DASHBOARD} className="mx-auto">Dashboard</Link>
    </>
  );
}