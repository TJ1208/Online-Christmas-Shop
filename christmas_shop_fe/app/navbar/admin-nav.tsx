"use client"

import Link from "next/link"
import SideMenu from "../components/side-menu"
import { UserDropdown } from "../components/user-dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from "next/navigation"

export const AdminNavBar = () => {
    const path = usePathname();
    return (
        <>
            {
                usePathname().includes("admin")
                    ?
                    <div className="lg:flex w-full md:justify-between items-center justify-center font-bold">
                        <Link href="/" className="nav-button lg:flex hidden"><FontAwesomeIcon icon={faArrowLeft} className="w-full" /></Link>
                        <div className="justify-center w-full  text-center hidden lg:flex">


                            <Link href="/admin/user" className={`nav-button px-3 ${path == '/admin/user' ? 'bg-orange-100' : ''}`}>Users</Link>
                            <Link href="/admin/product" className={`nav-button px-3 ${path == '/admin/product' ? 'bg-orange-100' : ''}`}>Products</Link>
                            <Link href="/admin/image" className={`nav-button px-3 ${path == '/admin/image' ? 'bg-orange-100' : ''}`}>Images</Link>
                            <Link href="/admin/order" className={`nav-button px-3 ${path == '/admin/order' ? 'bg-orange-100' : ''}`}>Orders</Link>
                            <Link href="/admin/past-order" className={`nav-button px-3 ${path == '/admin/past-order' ? 'bg-orange-100' : ''}`}>Past Orders</Link>
                            <Link href="/admin/category" className={`nav-button px-3 ${path == '/admin/category' ? 'bg-orange-100' : ''}`}>Categories</Link>
                        </div>
                        <div className="items-center justify-center w-full pb-1 lg:hidden flex flex-col">
                            <li className="flex items-center rounded w-full justify-center">
                                <div className="flex items-center rounded w-full justify-start">
                                    <div className="flex items-center">
                                        <Link href="/" className="lg:hidden h-11 px-2"><FontAwesomeIcon icon={faArrowLeft} className="nav-button" /></Link>
                                        <SideMenu />                                    </div>
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