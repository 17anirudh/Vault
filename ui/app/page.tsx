import Landing from "@/components/landing";
import Link from "next/link";
import { LockKeyholeIcon, ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col gap-5 items-center justify-center">
      <div role="banner" className="w-full flex flex-col justify-center items-center gap-3">
        <Landing />
        <h1 className="text-4xl">Secure. Immutable. Instant</h1>
        <h2 className="text-xl text-center">A high-performance financial ledger designed for bulletproof transaction processing and absolute auditability.</h2>
        <div className="w-full flex flex-wrap gap-3 items-center justify-center">
          <Link href="/dashboard" className="p-2 border rounded-3xl flex flex-row-reverse gap-2 items-center justify-center"><LockKeyholeIcon />Register</Link>
          <a href="#features" className="p-2 border rounded-3xl flex flex-wrap gap-2 items-center justify-center">View Features <ArrowDown /></a>
        </div>
      </div>
    </main>
  );
}
