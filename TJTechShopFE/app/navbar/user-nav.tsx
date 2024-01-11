"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SideMenu from "../components/side-menu"
import { faCartShopping, faCircleUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import ModalToggle from "../scripts/modal"
import CategoryModel from "../models/category"
import Link from "next/link"
import ShopLogo from "../components/shop-logo"
import UserDropdown from "./user-dropdown"
import ProductSearch from "../components/product-search"

export function UserNavBar(userData: any) {
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://techspecbe.azurewebsites.net/category');
            const categories = await response.json();
            setCategories(categories);
            setLoading(false);
        }
        fetchData();
    }, [])

    const toggleSideBar = () => {
        ModalToggle("", "modal-backdrop-input");
        setShowSearchBar(old => !old);
    }

    const toggleUserDropdown = () => {
        ModalToggle("", "modal-backdrop-menu");
        setShowUserDropdown(old => !old);
    }
    return (

        <>
            {
                !(usePathname().includes("admin"))
                    ?
                    <div className="w-full">


                        <div className="lg:flex w-full md:justify-between justify-center font-bold">
                            <div className="flex flex-col w-full">
                                <div className="justify-evenly w-full text-center pb-1 hidden lg:flex">
                                    <div className="relative inline-block dropdown">
                                        <div className="flex btn-hover">
                                            <button className="py-2 my-1" id="popup-category">Categories</button>
                                            <img src="https://tjcoding.sirv.com/website-images/arrow.png" alt="Category Carrot text-white bg-white" className="h-5 my-5 " />
                                        </div>
                                        <div className="absolute hidden dropdown-content bg-black">

                                            <div className="gap-5 grid-cols-5 auto-cols-auto m-2 p-2">

                                                <p className="text-white border-b-2 mx-5 text-left w-fit mb-5">Categories</p>
                                                {
                                                    categories.map(category =>
                                                        <Link className="btn-hover p-5 m-5"
                                                            href="" key={category.category_id}>{category.name}</Link>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" btn-hover rounded truncate flex items-center justify-center p-0 m-0">
                                        <button className="py-2 my-1">Flash Sales</button>
                                        <img src="https://tjcoding.sirv.com/website-images/sparkling.png" alt="Flash Sale Symbol" className="h-5" />
                                    </div>

                                    <button className=" btn-hover p-2 m-1 rounded truncate">New Items</button>
                                    <button className=" btn-hover p-2 m-1 rounded truncate">Top Brands</button>
                                </div>
                            </div>

                            <div className="items-center justify-center w-full pb-1 lg:hidden flex flex-col">

                                <div className="flex items-center rounded w-full justify-center">
                                    <div className="flex items-center rounded w-full justify-start">
                                        <div className="">
                                            <SideMenu />
                                        </div>
                                    </div>
                                    <Link href="/techshop" className="flex items-center rounded w-full justify-center mt-2">
                                        <ShopLogo height="6" />
                                    </Link>
                                    <div className="flex items-center rounded w-full justify-end p-2">
                                        <li className=" btn-hover p-2">
                                            <button onClick={() => { setShowSearchBar(old => !old) }} >
                                                <p className="p-1">
                                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5" />
                                                </p>
                                            </button>
                                        </li>
                                        <li className="btn-hover p-2">
                                            <div className={`relative inline-block  p-1`}>
                                                <button>
                                                    <FontAwesomeIcon icon={faCircleUser} className="h-5" onClick={() => setShowUserDropdown(old => !old)} />
                                                </button>
                                                <div className={`absolute -left-5 ${showUserDropdown ? "block" : "hidden"} bg-black w-full text-center`}>
                                                    <UserDropdown {...userData}/>
                                                </div>
                                            </div>
                                        </li>


                                        <li className="p-2">
                                            <button>
                                                <FontAwesomeIcon icon={faCartShopping} className="h-5 btn-hover" />
                                            </button>
                                        </li>

                                    </div>
                                </div>
                            </div>
                            <div className="items-center justify-center w-96 pb-1 hidden lg:flex">
                                <li className=" btn-hover">
                                    <button onClick={() => { setShowSearchBar(old => !old) }} >
                                        <p className="p-1">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5" />
                                        </p>
                                    </button>
                                </li>
                                <li>
                                    <div className="relative inline-block dropdown items-center justify-center p-1 m-1 ml-5">
                                        <div className="hidden lg:flex items-center justify-center nav-button">
                                            <FontAwesomeIcon icon={faCircleUser} className="h-6 p-1" />
                                            <p className="truncate font-normal px-1 w-full text-start">Sign In</p>
                                        </div>
                                        <div className={`absolute hidden dropdown-content bg-black w-full text-center z-30`}>
                                            <UserDropdown {...userData} />
                                        </div>
                                    </div>
                                </li>
                                <li className=" btn-hover p-1 m-1 ml-5">
                                    <button>
                                        <p className="p-1">
                                            <FontAwesomeIcon icon={faCartShopping} className="h-5" />
                                        </p>
                                    </button>
                                </li>
                            </div>

                        </div>
                        {
                            showSearchBar
                                ?
                                <div className="absolute flex justify-center xl:justify-start md:w-9/12 lg:mx-0 md:mx-28 my-10 w-full">
                                    <ProductSearch />
                                    <dialog open={showSearchBar} className="modal-backdrop z-30" id="modal-backdrop-input" onClick={toggleSideBar} />
                                </div>
                                :
                                <>
                                </>
                        }
                        {
                            showUserDropdown
                                ?
                                <dialog open={showUserDropdown} className="modal-backdrop-menu -z-30" id="modal-backdrop-menu" onClick={toggleUserDropdown} />
                                :
                                <>
                                </>
                        }


                    </div>
                    :
                    <>
                    </>
            }
        </>
    )
}