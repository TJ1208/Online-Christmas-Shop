"use client"
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export const UserDropdown = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";

    return (
        <>
            <div className="relative">
                <div className="hidden lg:flex items-center justify-center nav-button" onClick={toggle}>
                    <FontAwesomeIcon icon={faCircleUser} className="h-6 p-1" />
                    <p className="truncate font-normal px-1 w-full text-start">Sign In</p>
                </div>
                <div className="lg:hidden flex items-center justify-center">
                    <FontAwesomeIcon onClick={toggle} icon={faCircleUser} className="font-awesome-icon" />
                </div>

                <div>
                    <button className={`absolute top-12 left-0 z-30 w-[50px] min-h-[50px] max-h-[50px] flex flex-col bg-white 
                            ${transClass} rotate-45`}></button>

                    <div className={`absolute top-12 -left-7  z-30 w-[120px] min-h-[120px] max-h-[150px] flex flex-col bg-white rounded-md ${transClass}`}>
                        <p className="hover:bg-blue-100 duration-200 hover:text-zinv-500 px-4 py- border-b rounded p-3 text-left font-normal w-full">Account</p>
                        <Link href="/admin" className="hover:bg-blue-100 duration-200 hover:text-zinv-500 px-4 py- border-b rounded p-3 text-left font-normal w-full"
                            onClick={toggle}>Admin</Link>
                        <p className="hover:bg-blue-100 duration-200 hover:text-zinv-500 px-4 py- border-b rounded p-3 text-left font-normal w-full">Logout</p>
                    </div>
                </div>
            </div>
            {
                isOpen
                    ?
                    <div className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40" onClick={toggle}>
                    </div>
                    :
                    <></>
            }
        </>
    )
}