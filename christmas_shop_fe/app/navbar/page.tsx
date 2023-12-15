import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faCartShopping, faHamburger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownMenu from "../components/dropdown-menu";
import SideMenu from "../components/side-menu";

export const Navbar = () => {

    return (
        <>
            <nav className="banner-image w-full border pt-8"></nav>
            <nav className="bg-white rounded-b sticky top-0">
                <ul className="flex items-center justify-between shadow px-2">
                    <li>
                        <a href=""><img src="https://tjcoding.sirv.com/website-images/shop-logo.png"
                            alt="Shop Icon" className="h-24 md:flex hidden" /></a>
                    </li>

                    <div className="lg:flex w-full md:justify-between justify-center font-bold">
                        <div className="justify-evenly w-full mobile-text text-center pb-1 hidden lg:flex">
                            <DropdownMenu />
                            <div className="border-b-2 btn-hover p-2 m-1 rounded truncate flex items-center justify-center">
                                <button>Flash Sales</button>
                                <img src="https://tjcoding.sirv.com/website-images/sparkling.png" alt="Flask Sale Symbol" className="h-5" />
                            </div>

                            <button className="border-b-2 btn-hover p-2 m-1 rounded truncate">New Items</button>
                            <button className="border-b-2 btn-hover p-2 m-1 rounded truncate">Top Brands</button>
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
                                    <p>
                                        <FontAwesomeIcon icon={faCircleUser} className="font-awesome-icon" />
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faCartShopping} className="font-awesome-icon" />
                                    </p>
                                </div>
                            </li>
                            <div className="flex items-center w-full">
                                <li className="w-full">
                                    <a><input type="text" placeholder="What are you looking for?" className="p-2 bg-slate-200 w-full mobile-text px-2 border-b-2 rounded" /></a>
                                </li>
                            </div>

                        </div>
                        <div className="relative items-center justify-center w-full pb-1 hidden lg:flex">
                            <li className="w-full mx-5">
                                <a><input type="text" placeholder="What are you looking for?" className="p-2 bg-slate-200 w-full mobile-text px-2 border-b-2 rounded" /></a>
                            </li>
                            <li className="border-b-2 rounded btn-hover">
                                <button className="flex items-center p-1 m-1">
                                    <p className="px-1"><FontAwesomeIcon icon={faCircleUser} className="h-5" /></p>
                                    <p className="px-1 truncate font-normal">Sign In</p>
                                </button>
                            </li>
                            <li className="border-b-2 btn-hover p-1 m-1 ml-5 rounded">
                                <button>
                                    <p className="p-1">
                                        <FontAwesomeIcon icon={faCartShopping} className="h-5" />
                                    </p>
                                </button>
                            </li>
                        </div>
                    </div>



                </ul>
            </nav>
        </>
    )
}

export default Navbar;