"use client"

import Link from "next/link"
import SideMenu from "../../components/side-menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from "next/navigation"
import { useState } from "react"
import ShopLogo from "../../components/shop-logo"

const AdminNavBar = () => {
    const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
    const path = usePathname();
    return (
        <>
            {
                usePathname().includes("admin")
                    ?
                    <div className="lg:flex w-full md:justify-between items-center justify-center font-bold">
                        <Link href="/techshop" className="nav-button lg:flex hidden"><FontAwesomeIcon icon={faArrowLeft} className="w-full" /></Link>
                        <div className="justify-center w-full  text-center hidden lg:flex">
                            <Link href="/admin/user" className={`text-white hover:text-white p-2 m-1 px-3 ${path == '/admin/user' ? 'text-white' : 'text-opacity-50'}`}>Users</Link>
                            <Link href="/admin/product" className={`text-white hover:text-white p-2 m-1 px-3 ${path == '/admin/product' ? '' : 'text-opacity-50'}`}>Products</Link>
                            <Link href="/admin/image" className={`text-white hover:text-white p-2 m-1 px-3 ${path == '/admin/image' ? '' : 'text-opacity-50'}`}>Images</Link>
                            <Link href="/admin/order" className={`text-white hover:text-white p-2 m-1 px-3 ${path == '/admin/order' ? '' : 'text-opacity-50'}`}>Orders</Link>
                            <Link href="/admin/past-order" className={`text-white hover:text-white p-2 m-1 px-3 ${path == '/admin/past-order' ? '' : 'text-opacity-50'}`}>Past Orders</Link>
                            <Link href="/admin/category" className={`text-white hover:text-white p-2 m-1 px-3 ${path == '/admin/category' ? '' : 'text-opacity-50'}`}>Categories</Link>
                            <Link href="/admin/sub-category" className={`text-white hover:text-white p-2 m-1 px-3 ${path == '/admin/sub-category' ? '' : 'text-opacity-50'}`}>Sub-Categories</Link>
                            <Link href="/admin/brand" className={`text-white hover:text-white p-2 m-1 px-3 ${path == '/admin/brand' ? '' : 'text-opacity-50'}`}>Brands</Link>

                        </div>
                        <div className="items-center justify-center w-full pb-1 lg:hidden flex flex-col">
                            <div className="flex items-center rounded w-full justify-center">
                                <div className="flex items-center rounded w-full justify-start">
                                    <div className="flex items-center">
                                        <Link href="/" className="lg:hidden h-11 p-1 px-2"><FontAwesomeIcon icon={faArrowLeft} className="nav-button" /></Link>
                                        <SideMenu />
                                    </div>
                                </div>
                                <div className="flex items-center rounded w-full justify-center px-14">
                                    <ShopLogo />
                                </div>
                                <div className="flex items-center rounded w-full justify-end p-2 " >
                                    <div className="btn-hover p-2 pr-5 hover:cursor-pointer" onClick={() => setShowUserDropdown(old => !old)} >
                                        <div className={`relative inline-block p-1`} >
                                            <button >
                                                <FontAwesomeIcon icon={faCircleUser} className="h-5" />
                                            </button>
                                            <div className={`absolute -left-8 bg-black ${showUserDropdown ? "block" : "hidden"} text-center p-1`}>
                                                <button className="btn-hover p-2" onClick={() => setShowUserDropdown(old => !old)}>Account</button>
                                                <button className="btn-hover p-2" onClick={() => setShowUserDropdown(old => !old)}><Link href="/admin">Admin</Link></button>
                                                <button className="btn-hover p-2" onClick={() => setShowUserDropdown(old => !old)}>Logout</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex">
                            <div className="flex items-center justify-center p-0.5">
                                <div className="btn-hover p-2">
                                    <div className={`relative inline-block  p-1`}>
                                        <button>
                                            <FontAwesomeIcon icon={faCircleUser} className="h-5" onClick={() => setShowUserDropdown(old => !old)} />
                                        </button>
                                        <div className={`absolute -left-5 z-1 ${showUserDropdown ? "block" : "hidden"} bg-black w-full text-center`}>
                                            <button className="btn-hover w-full p-2" onClick={() => setShowUserDropdown(old => !old)}>Account</button>
                                            <button className="btn-hover w-full p-2" onClick={() => setShowUserDropdown(old => !old)}><Link href="/admin">Admin</Link></button>
                                            <button className="btn-hover w-full p-2" onClick={() => setShowUserDropdown(old => !old)}>Logout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <>
                    </>
            }
        </>
    )
}

export default AdminNavBar;