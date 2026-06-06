"use client";

import { QRCode, QRCodeImage, QRCodeOverlay, QRCodeSkeleton, QRCodeDownload } from "./ui/qr-code";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog"
import { QrCodeIcon, DownloadIcon } from "lucide-react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { useEffect, useRef, useState, ChangeEvent } from "react";

type DisplayQRCodeProps = {
    value: number;
}

type QrScanProps = {
  onScan: (value: string) => void;
};

export function DisplayQRCode({ value }: DisplayQRCodeProps) {
    return (
        <Dialog modal>
        <DialogTrigger className="flex flex-col items-center justify-center">
            <QrCodeIcon />
        </DialogTrigger>
        <DialogContent className="bg-transparent text-background border">
            <QRCode
                value={value.toString()}
                size={180}
                level="H"
                className="gap-4"
            >
                <QRCodeImage alt="logo" />
                <QRCodeSkeleton />
                <QRCodeDownload format="png" filename="qr-code"><DownloadIcon /></QRCodeDownload>
                <QRCodeOverlay className="rounded-full border-2 border-white p-1.5">
                    <Image src="/favicon.png" alt="Logo" width={24} height={24} />
                </QRCodeOverlay>
            </QRCode>
        </DialogContent>
        </Dialog>
    )
}

export function QRCamera({ onScan }: QrScanProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [retryKey, setRetryKey] = useState<number>(0);

    useEffect(() => {
        let isMounted = true;
        let controls: any;
        let mediaStream: MediaStream | null = null;
        const reader = new BrowserQRCodeReader();

        async function start() {
            try {
                setError(null);
                
                // Explicitly request permissions to ensure prompting
                mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
                
                if (!isMounted) {
                    mediaStream.getTracks().forEach(track => track.stop());
                    return;
                }

                if (!videoRef.current) return;
                
                controls = await reader.decodeFromVideoDevice(
                    undefined,
                    videoRef.current,
                    (result, err, ctrl) => {
                        if (result) {
                            const value = result.getText().trim();
                            if (value.length >= 3 && value.length <= 20) {
                                onScan(value);
                                if (ctrl) ctrl.stop();
                                else controls?.stop();
                                
                                if (mediaStream) {
                                    mediaStream.getTracks().forEach(track => track.stop());
                                }
                            }
                        }
                    }
                );
                
                if (!isMounted) {
                    controls?.stop();
                    mediaStream.getTracks().forEach(track => track.stop());
                }
            } catch (err) {
                console.error("Camera initialization failed:", err);
                if (isMounted) {
                    setError("Camera access denied. Please allow permissions and try again.");
                }
            }
        }
        
        start();
        
        return () => { 
            isMounted = false;
            if (controls) {
                controls.stop();
            }
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
            // Stop any active streams on the video element
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
        };
    }, [onScan, retryKey]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4 text-center bg-black/40 rounded-md">
                <p className="text-sm text-red-400">{error}</p>
                <button 
                    onClick={() => setRetryKey(prev => prev + 1)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-full transition-colors"
                    type="button"
                >
                    Retry Camera
                </button>
            </div>
        );
    }

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="rounded-md border object-cover w-full h-full"
        />
    )
}

export function QrFile({ onScan }: QrScanProps) {
    async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const reader = new BrowserQRCodeReader();

        try {
            const objectUrl = URL.createObjectURL(file);
            const result = await reader.decodeFromImageUrl(objectUrl);
            const value = result.getText().trim();

            if (value.length >= 3 && value.length <= 20) {
                onScan(value);
            } else {
                alert("Invalid QR format: Address must be between 3 and 20 characters.");
            }
            
            URL.revokeObjectURL(objectUrl);
        } 
        catch (err) {
            console.error("File decode error:", err);
            alert("No valid QR code found in the image.");
        }
        
        // Reset the input value so the user can upload the same file again if they want
        e.target.value = '';
    };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleChange}
      className="absolute inset-0 w-full h-full cursor-pointer"
    />
  );
}