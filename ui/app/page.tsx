import { Background } from "@/components/bg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 w-full flex items-center justify-center">
      <Link href="/dashboard" className="p-2 border rounded-xl">Dashboard</Link>
    </main>
  );
}
