"use server"

import { cookies } from 'next/headers';


export async function getTokenClaims(): Promise<any> {
    try {
        const response = await fetch(`https://tjtechbe.tcjcoding.com/token`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${cookies().get('access_token_cookie')!.value}`,
            }
        })
        if (response.status == 200) {
            console.log("Access granted!", response.status);
            return response.json();
        } else {
            console.log("Getting New Token...", response.status);
            return
        }
    } catch (error) {
        console.log(error);
        return;
    }
} 