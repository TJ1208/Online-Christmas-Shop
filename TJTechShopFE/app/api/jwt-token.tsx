import { cookies } from 'next/headers';


export const getTokenClaims = async (): Promise<any> => {
    "use server"
    const cookie = cookies();
    try {
        const response = await fetch(`https://techspecbe.azurewebsites.net/token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookie.get('access_token_cookie')!.value}`,
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