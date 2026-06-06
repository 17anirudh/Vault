"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type ReactState = [boolean, Dispatch<SetStateAction<boolean>>]
type StyleTuple = {
    avatar: string[];
    banner: string[];
    half: string[];
    full: string[];
    logo: string[];
}
type Props = {
    id: string;
    type: "avatar" | "banner" | "half" | "full" | "logo"
    src: string
    alt: string
    className?: string
}

const styleMap: StyleTuple = {
    avatar: ["rounded-full w-50 h-50", "200px"],
    banner: ["w-full h-64", "100vw"],
    half: ["w-1/2 h-fit", "50vw"],
    full: ["w-full h-full", "100vw"],
    logo: ["size-20 shrink-0", "80px"]
}

export default function Img({ id, type, src, alt, className, ...props }: Props & ImageProps) {
    const [isLoaded, setIsLoaded]: ReactState = useState<boolean>(false);
    return (
        <div 
            id={id}
            className={"relative " + styleMap[type][0] + (isLoaded ? " transition-all duration-500" : " bg-gray-800 animate-pulse")}
        >
            <Image 
                src={src}
                alt={alt}
                className={isLoaded ? className : "invisible opacity-0"}
                {...props}
                fill
                sizes={styleMap[type][1]}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    )
}