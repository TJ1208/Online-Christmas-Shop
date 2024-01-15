import Link from "next/link"
import { useRouter } from "next/navigation";
import { logout } from "../api/jwt-token";
import { useEffect, useState } from "react";

function UserDropdown(userData: any) {
    const router = useRouter();

    const LogOut = async () => {
        await logout().then(() => {
            router.push("/login");
        })
    }

    return (
        <>

            {
                userData.role == 2
                    ?
                    <>
                        <div className="border-t">
                            <button className="btn-hover w-full p-2">Account</button>
                            <button className="btn-hover w-full p-2"><Link href="/admin">Admin</Link></button>
                            <button className="btn-hover w-full p-2" onClick={() => LogOut()}>Logout</button>
                        </div>
                    </>
                    :
                    <>
                        <div className="border-t">
                            <button className="btn-hover w-full p-2">Account</button>
                            <button className="btn-hover w-full p-2">Orders</button>
                            <button className="btn-hover w-full p-2" onClick={() => LogOut()}>Logout</button>
                        </div>
                    </>

            }

        </>
    )
}

export default UserDropdown;