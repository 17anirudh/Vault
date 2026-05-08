import { SERVER_URL } from "@api/config";
import type { RegisterSchemaType, LoginSchemaType } from "@/types/auth";

const URL: string = SERVER_URL + "/auth"

export async function register(data: RegisterSchemaType): Promise<any> {
    try {
        const response = await fetch(`${URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
            credentials: "include"
        })
        if(!response.ok) {
            throw new Error(await response.text())
        }
        return await response.json()
    }
    catch (error) {
        throw error;
    }
}

export async function login(data: LoginSchemaType): Promise<any> {
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
        return await response.json()
    }
    catch (error) {
        throw error;
    }
}

export async function refresh(): Promise<any> {
    try {
        const response = await fetch(`${URL}/refresh`, {
            method: "POST",
            credentials: "include"
        })
        if(!response.ok) {
            throw new Error(await response.text())
        }
        return await response.json()
    }
    catch (error) {
        throw error;
    }
}