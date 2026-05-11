import { SERVER_URL } from "@api/config";
import type { registerSchemaType, loginSchemaType } from "@/types/schema";

let dev: boolean = process.env.NODE_ENV === "development"

export async function register(data: registerSchemaType): Promise<any> {
    try {
        dev && console.log(`${SERVER_URL}/auth/register`)
        const response = await fetch(`${SERVER_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        })
        if(!response.ok) {
            throw new Error(await response.text())
        }
        console.log(dev ?? await response.json())
        return await response.json()
    }
    catch (error) {
        throw error;
    }
}

export async function login(data: loginSchemaType): Promise<any> {
    try {
        const response = await fetch(`${URL}/login`, {
            method: "POST",
            headers: {  
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data })
        })
        if(!response.ok) {
            throw new Error(await response.text())
        }
        console.log(dev ?? await response.json())
        return await response.json()
    }
    catch (error) {
        throw error;
    }
}

export async function refresh(): Promise<any> {
    try {
        const response = await fetch(`${SERVER_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include"
        })
        if(!response.ok) {
            throw new Error(await response.text())
        }
        console.log(dev ?? await response.json())
        return await response.json()
    }
    catch (error) {
        throw error;
    }
}