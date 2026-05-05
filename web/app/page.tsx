import { ArrowRight } from "lucide-react"
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import LiquidChrome from "@/components/ui/LiquidChrome";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="inset-0 absolute -z-10">
        <LiquidChrome
          baseColor={[0.03529411764705882, 0.03529411764705882, 0.03529411764705882]}
          speed={0.3}
          amplitude={0.22}
          interactive={false}
        />
      </div>
      <div className="inset z-0 flex min-h-screen flex-col items-center justify-center border">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Image src="/favicon.png" alt="Snapshot" width={108} height={108} />
          <h1 className="text-7xl md:text-9xl font-bold text-white opacity-80 uppercase text-center drop-shadow-2xl leading-tight tracking-tighter font-serif">
            Snapshot
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-bold text-white opacity-80 uppercase text-center drop-shadow-2xl leading-tight tracking-tighter font-serif">
          Your trust-worthy ledger that tracks and helps you manage your financial spending
        </h2>
        <Link href={ROUTES.REGISTER} className="mt-18 group relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold">
          <div className="flex items-center justify-center gap-2">
            <div className="bg-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]" />
            <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
              Get started
            </span>
          </div>
          <div className="text-primary-foreground absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
            <span>Get started</span>
            <ArrowRight />
          </div>
        </Link>
      </div>
    </>
  );
}
