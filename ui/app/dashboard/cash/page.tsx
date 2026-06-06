"use client";

import { DisplayQRCode } from "@/components/qr-code";
import { OrigamiIcon, PencilIcon, CameraIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { CASH_ROUTES, type RouteItem } from "@/lib/constants";

export default function CashPage() {
    const [visible, setVisible] = useState<boolean>(false);
    const props = {
        amount: 100,
        acc_id: 1023654,
        date: "2026-08-15"
    }
    return (
        <>
            <section className="w-full max-w-md aspect-[1.58] rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden bg-linear-to-tr from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 text-white font-sans transition-all hover:shadow-indigo-500/20" id="card">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
                <div className="flex justify-between items-start z-10">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium tracking-widest uppercase mb-1 drop-shadow-sm">Current Balance</span>
                        <div id="private" className="flex items-center gap-3">
                            <span className="text-3xl font-bold tracking-tight drop-shadow-md">
                                {visible ? `$${props.amount.toLocaleString()}` : "••••••"}
                            </span>
                            <button 
                                onClick={() => setVisible(!visible)} 
                                className="p-2 hover:bg-slate-700/50 rounded-full transition-colors text-slate-300 hover:text-white backdrop-blur-sm"
                                title="Toggle visibility"
                                type="button"
                            >
                                <OrigamiIcon size={20} className={visible ? "" : "animate-pulse"} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center p-2 bg-slate-800/60 rounded-xl backdrop-blur-md border border-slate-700/50 shadow-inner hover:bg-slate-700/60 transition-colors cursor-pointer text-slate-300 hover:text-white">
                        <DisplayQRCode value={props.acc_id} />
                    </div>
                </div>

                <div className="flex items-center gap-3 mt-2 z-10">
                    <div className="w-11 h-8 bg-linear-to-br from-amber-200 via-yellow-400 to-amber-500 rounded-md border border-amber-600/50 shadow-inner flex items-center justify-center opacity-90 overflow-hidden relative">
                        <div className="absolute inset-0 border border-amber-900/20 rounded-md" />
                        <div className="w-full h-full flex flex-col justify-evenly px-2 opacity-40">
                            <div className="w-full h-px bg-black rounded-full" />
                            <div className="w-full h-px bg-black rounded-full" />
                            <div className="w-full h-px bg-black rounded-full" />
                        </div>
                        <div className="absolute inset-y-0 flex items-center justify-center opacity-40">
                            <div className="h-full w-px bg-black rounded-full" />
                        </div>
                    </div>
                    <div className="rotate-90 opacity-60">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8.5 2C10.6 3.8 12 6.3 12 9s-1.4 5.2-3.5 7"></path>
                            <path d="M13.5 2C16.6 4.3 18.5 7.8 18.5 11.5S16.6 18.7 13.5 21"></path>
                            <path d="M3.5 4.5C4.7 5.7 5.5 7.3 5.5 9s-.8 3.3-2 4.5"></path>
                        </svg>
                    </div>
                </div>

                <div className="flex justify-between items-end z-10 mt-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mb-1">Account Number</span>
                        <h3 id="acc_id" className="font-mono text-lg sm:text-xl tracking-[0.15em] sm:tracking-[0.2em] text-slate-200 drop-shadow-md">
                            {visible ? props.acc_id : "•••• •••• •••• ••••"}
                        </h3>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mb-1">Member Since</span>
                        <h3 id="history" className="font-mono text-sm tracking-wider text-slate-200 drop-shadow-md">
                            {props.date}
                        </h3>
                    </div>
                </div>
            </section>
            <section id="cta" className="flex flex-wrap items-center justify-center gap-3">
                <Link href={CASH_ROUTES.HARDCODE} className="flex flex-col gap-2 items-center justify-center">
                    <PencilIcon /> Enter to Pay
                </Link>
                <Link href={CASH_ROUTES.SCAN} className="flex flex-col gap-2 items-center justify-center">
                    <CameraIcon /> Scan to Pay
                </Link>
            </section>  
        </>
    )
}