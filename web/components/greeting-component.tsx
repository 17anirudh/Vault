"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Meridian = "am" | "pm"
type Period = "morning" | "afternoon" | "evening"
type Week = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"
type InstantRecord = {
    time: [string, string, Meridian],
    time12: [string, string, Meridian],
    date: [string, string, Week, string],
    period: Period
}

const numberToDay: Record<number, Week> = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

export default function Greeting({ username }: { username: string } ) {
    const [instant, setInstant] = useState<InstantRecord>();

    function getData(): void {
        let now = new Date();
        setInstant({
            time: [
                now.getHours().toString().padStart(2, '0'), 
                now.getMinutes().toString().padStart(2, '0'), 
                now.getHours() >= 12 ? "pm" : "am"
            ],
            time12: [
                (now.getHours() % 12 || 12).toString().padStart(2, '0'), 
                now.getMinutes().toString().padStart(2, '0'), 
                now.getHours() >= 12 ? "pm" : "am"
            ],
            date: [
                now.getDate().toString().padStart(2, '0'), 
                (now.getMonth() + 1).toString().padStart(2, '0'), 
                numberToDay[now.getDay()], 
                now.getFullYear().toString()
            ],
            period: now.getHours() < 12 ? "morning" : now.getHours() < 18 ? "afternoon" : "evening"
        });
    }
    
    useEffect(() => {
        const interval = setInterval(getData, 60000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <section className="w-full flex flex-col items-center justify-center">
            {instant && (
                <div className="max-w-sm flex flex-wrap flex-col">
                    <section className="flex flex-wrap">
                        <span>{instant.time12[0]}</span>
                        <span className="animate-caret-blink">:</span>
                        <span>{instant.time12[1]}</span>
                        <span>{instant.time12[2]}</span>
                    </section>
                    <section className="flex flex-wrap">
                        <span>{instant.date[0]}</span>
                        <span>-</span>
                        <span>{instant.date[1]}</span>
                        <span>-</span>
                        <span>{instant.date[3]}</span>
                        <span className="ml-2">{instant.date[2]}</span>
                    </section>
                </div>
            )}
            <div className="w-full flex flex-wrap gap-2 items-center justify-center">
                <Image src="/favicon.png" alt="Snapshot" width={108} height={108} />
                <h1 className="text-4xl md:text-5xl font-bold text-white opacity-80 text-center drop-shadow-2xl leading-tight tracking-tighter font-serif">
                    Good {instant?.period} <span className="uppercase underline font-light">{username}</span>
                </h1>
            </div>
        </section>
    );
}