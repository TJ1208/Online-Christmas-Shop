import ShopLogo from "../../components/shop-logo";
import { getTokenClaims } from "../../api/jwt-token";
import Link from "next/link";
import AdminNavBar from "./admin-nav";
import UserNavBar from "./user-nav";
import getAllCategories from "@/app/api/category";
import getAllBrands from "@/app/api/brand";

export const Navbar = async () => {
    const userData = await getTokenClaims();
    const brands = await getAllBrands();
    const categories = await getAllCategories();
    return (
        <>
            <nav className="bg-black rounded-b w-full bg-opacity-50">
                <ul className="flex items-center justify-between shadow px-2">
                    <li>
                        <Link href="/techshop" className="lg:flex hidden px-5 py-2">
                            <ShopLogo />
                        </Link>
                    </li>
                    {
                           <UserNavBar {...{userData, categories, brands}}/>
                    }
                    
                    <AdminNavBar />
                </ul>
            </nav>
        </>
    )
}

export default Navbar;