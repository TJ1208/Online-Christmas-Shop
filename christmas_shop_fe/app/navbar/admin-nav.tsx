"use client"

import Link from "next/link"
import SideMenu from "../components/side-menu"
import { UserDropdown } from "../components/user-dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from "next/navigation"

export const AdminNavBar = () => {
    return (
        <>
            {
                usePathname().includes("admin")
                    ?
                    <div className="lg:flex w-full md:justify-between items-center justify-center font-bold">
                        <Link href="/" className="nav-button lg:flex hidden"><FontAwesomeIcon icon={faArrowLeft} className="w-full" /></Link>
                        <div className="justify-center w-full  text-center hidden lg:flex">


                            <button className="nav-button px-3">Users</button>
                            <button className="nav-button px-3">Products</button>
                            <button className="nav-button px-3">Images</button>
                            <button className="nav-button px-3">Orders</button>
                            <button className="nav-button px-3">Past Orders</button>
                            <button className="nav-button px-3">Categories</button>
                        </div>
                        <div className="items-center justify-center w-full pb-1 lg:hidden flex flex-col">
                            <li className="flex items-center rounded w-full justify-center">
                                <div className="flex items-center rounded w-full justify-start">
                                    <div className="">
                                        <SideMenu />
                                    </div>
                                </div>
                                <div className="flex items-center rounded w-full justify-center px-14">
                                    <img src="/favicon.ico" className="h-7 border rounded-2xl shadow" />
                                </div>
                                <div className="flex items-center rounded w-full justify-end p-2">
                                    <UserDropdown />
                                </div>
                            </li>
                        </div>
                        <div className="hidden lg:flex">
                            <li>
                                <div className="flex items-center justify-center p-0.5">
                                    <UserDropdown />
                                </div>
                            </li>
                        </div>
                    </div>
                    :
                    <>
                    </>
            }
        </>
    )
}