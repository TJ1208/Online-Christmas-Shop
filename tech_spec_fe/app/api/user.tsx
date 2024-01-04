import { UserModel } from "../models/user"

export const login = async (data: {email:string, password:string}): Promise<any> => {
    const response = await fetch(`http://localhost:5000/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            // "getSetCookie": 
            
        },
        
        // credentials: "include"
    });
    return response.json();
}

// export const getTokenClaims = async (): Promise<any> => {
//     const response = await fetch(`http://localhost:5000/token`, {
//         method: 'GET',
//         headers: {
//             'X-CSRF-TOKEN': getCookie('csrf_access_token'),
//           }
//     })
// }

export const getAllUsers = async (): Promise<UserModel[]> => {
    const response = await fetch(`http://localhost:5000/user`, {
        next: {
            revalidate: 0
        }
    });
    return response.json();
}

export const registerUser = async (user: UserModel): Promise<UserModel> => {
    const response = await fetch(`http://localhost:5000/user`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        } 
    });
    return response.json();
}

export const deleteUser = async (email: string): Promise<string> => {
    const response = await fetch(`http://localhost:5000/user/${email}`, {
        method: 'DELETE'
    });
    return response.json();
}

// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//   }