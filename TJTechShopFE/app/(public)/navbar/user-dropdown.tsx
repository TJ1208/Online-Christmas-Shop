"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import { logout } from "../../api/jwt-token";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import ModalToggle from "@/app/scripts/modal";

function UserDropdown(userData: any) {
    const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

    const router = useRouter();

    const LogOut = async () => {
        await logout().then(() => {
            router.refresh();
        })
    }

    const toggleUserDropdown = () => {
        ModalToggle("", "modal-backdrop-menu");
        setShowUserDropdown(old => !old);
    }

    return (
        <>
            <button>
                <FontAwesomeIcon icon={faCircleUser} className="h-5" onClick={() => setShowUserDropdown(old => !old)} />
            </button>
            <div className={`absolute -left-5 ${showUserDropdown ? "block" : "hidden"} w-full text-center bg-opacity-50`}>

                {
                    userData.role == 2
                        ?
                        <>
                            <div className="border-t">
                                <button className="btn-hover w-full p-2">Account</button>
                                <button className="btn-hover w-full p-2"><Link href="">Orders</Link></button>
                                <button className="btn-hover w-full p-2"><Link href="/admin/user">Admin</Link></button>
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
                {
                    showUserDropdown
                        ?
                        <dialog open={showUserDropdown} className="modal-backdrop-menu -z-30" id="modal-backdrop-menu" onClick={toggleUserDropdown} />
                        :
                        <>
                        </>
                }
            </div>
        </>
    )
}

export default UserDropdown;