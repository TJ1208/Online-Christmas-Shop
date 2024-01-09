"use client"

import { UserNavBar } from "./user-nav";
import { AdminNavBar } from "./admin-nav";
import ShopLogo from "../components/shop-logo";
import { usePathname } from "next/navigation";

export const Navbar = () => {
    const router = usePathname();
    return (
        router.includes("login") || router.includes("signup")
            ?
            <>
            </>
            :
            <>

                {/* User NavBar */}
                <nav className="bg-black rounded-b w-full">
                    <ul className="flex items-center justify-between shadow px-2">
                        <li>
                            <div className="lg:flex hidden px-5 py-2">
                                <ShopLogo height="1" />
                            </div>
                        </li>
                        <UserNavBar />
                        <AdminNavBar />
                    </ul>
                </nav>
            </>
    )
}

export default Navbar;