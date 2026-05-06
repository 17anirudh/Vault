'use server';

import { SERVER_URL } from "./config";

SERVER_URL?.concat("/auth");

export async function register(email: string, password: string): Promise<any> {
    try {
        const response = await fetch(`${SERVER_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
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

export async function login(email: string, password: string): Promise<any> {
    try {
        const response = await fetch(`${SERVER_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
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