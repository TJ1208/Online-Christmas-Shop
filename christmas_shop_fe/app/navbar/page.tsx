import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Navbar = () => {
    return (
        <>
            <nav className="h-10 banner-image w-full border"></nav>
            <nav className="bg-white rounded-b sticky top-0 md:mt-0 mt-2">
                <ul className="flex items-center justify-between shadow px-2">
                    <li>
                        <a href=""><img src="https://tjcoding.sirv.com/website-images/shop-logo.png"
                            alt="Shop Icon" className="h-24" /></a>
                    </li>
                    <div className="md:flex w-full md:justify-between justify-center font-bold">
                        <div className="flex justify-evenly w-full mobile-text text-center pb-1">
                            <button className="border-b-2 btn-hover p-2 m-1 rounded truncate">Categories</button>
                            <div className="border-b-2 btn-hover p-2 m-1 rounded truncate flex items-center justify-center">
                                <button>Flash Sales</button>
                                <img src="https://tjcoding.sirv.com/website-images/sparkling.png" alt="Flask Sale Symbol" className="h-5"/>
                            </div>
                            
                            <button className="border-b-2 btn-hover p-2 m-1 rounded truncate">New Items</button>
                            <button className="border-b-2 btn-hover p-2 m-1 rounded truncate">Top Brands</button>
                        </div>
                        <div className="relative flex items-center justify-center w-full pb-1">
                            <li className="w-full mx-5">
                                <a><input type="text" placeholder="What are you looking for?" className="p-2 bg-slate-200 w-full mobile-text px-2 border-b-2 rounded" /></a>
                            </li>
                            {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 absolute w-full p-1 m-1"/> */}
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