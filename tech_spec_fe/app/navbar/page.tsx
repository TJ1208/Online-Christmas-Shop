import Link from "next/link";
import { UserNavBar } from "./user-nav";
import { AdminNavBar } from "./admin-nav";

export const Navbar = () => {

    return (
        <>
            {/* User NavBar */}
            <nav className="banner-image w-full border pt-8"></nav>
            <nav className="bg-white rounded-b sticky top-0">
                <ul className="flex items-center justify-between shadow px-2">
                    <li>
                        <Link href="/"><img src="https://tjcoding.sirv.com/website-images/shop-logo.png"
                            alt="Shop Icon" className="h-24 md:flex hidden" /></Link>
                    </li>
                    <UserNavBar />
                    <AdminNavBar />
                </ul>
            </nav>
        </>
    )
}

export default Navbar;