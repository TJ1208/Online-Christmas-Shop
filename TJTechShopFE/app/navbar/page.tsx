import Link from "next/link";
import { UserNavBar } from "./user-nav";
import { AdminNavBar } from "./admin-nav";

export const Navbar = () => {

    return (
        <>
            {/* User NavBar */}
            <nav className="bg-black rounded-b w-full">
                <ul className="flex items-center justify-between shadow px-2">
                    <li>
                        <Link href="/"><img src="https://tjcoding.sirv.com/website-images/Screenshot%202024-01-06%20211930.png"
                            alt="Shop Icon" className="h-24 lg:flex hidden" /></Link>
                    </li>
                    <UserNavBar />
                    <AdminNavBar />
                </ul>
            </nav>
        </>
    )
}

export default Navbar;