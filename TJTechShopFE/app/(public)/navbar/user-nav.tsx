"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SideMenu from "../../components/side-menu"
import { faCartShopping, faCircleUser, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ModalToggle from "../../scripts/modal"
import CategoryModel from "../../models/category"
import Link from "next/link"
import ShopLogo from "../../components/shop-logo"
import UserDropdown from "./user-dropdown"
import ProductSearch from "../../components/product-search"
import { BrandModel } from "@/app/models/brand"

function UserNavBar(userData: any) {
    const router = useRouter();
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
    const [brands, setBrands] = useState<BrandModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://tjtechbe.tcjcoding.com/category');
            const categories = await response.json();
            setCategories(categories);
            const brandResponse = await fetch('https://tjtechbe.tcjcoding.com/brand');
            const brands = await brandResponse.json();
            setBrands(brands);
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
                                    <div className="relative inline-block dropdown hover:border-b border-blue-300">
                                        <div className="flex btn-hover">
                                            <button className="py-2 my-1 text-blue-300" id="popup-category">Categories</button>
                                            <img src="https://tjcoding.sirv.com/website-images/icons8-category-48.png" alt="Category Carrot text-white bg-white" className="h-5 my-5 " />
                                        </div>
                                        <div className="absolute hidden dropdown-content bg-black bg-opacity-50">

                                            <div className="grid grid-flow-col grid-rows-3">
                                                {
                                                    categories.map(category =>
                                                        <Link className="dropdown-button"
                                                            href={`/products?category_id=${category.category_id}`} key={category.category_id}>{category.name}</Link>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-hover rounded truncate items-center flex justify-center p-0 m-0">
                                        <button className="py-2 my-1 text-yellow-500">Flash Sales</button>
                                        <img src="https://tjcoding.sirv.com/website-images/sparkling.png" alt="Flash Sale Symbol" className="h-5" />
                                    </div>
                                    <div className="btn-hover rounded truncate items-center flex justify-center p-0 m-0">
                                        <button className="py-2 my-1 text-red-300">New Items</button>
                                        <img src="https://tjcoding.sirv.com/website-images/icons8-new-item-100.png" alt="New Item SVG" className="h-8" />
                                    </div>
                                    <div className="relative inline-block dropdown hover:border-b border-red-400">
                                        <div className="flex btn-hover">
                                            <button className="py-2 my-1 text-red-400" id="popup-category">Top Brands</button>
                                            <img src="https://tjcoding.sirv.com/website-images/icons8-brand-100.png" alt="Top Brands SVG" className="h-5 my-5" />
                                        </div>
                                        <div className="absolute hidden dropdown-content bg-black bg-opacity-50">

                                            <div className="grid grid-flow-col grid-rows-5">
                                                {
                                                    brands.map(brand => (
                                                        <Link className="dropdown-button" href={`/products?brand_id=${brand.brand_id}`} key={brand.brand_id}>{brand.name}</Link>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="items-center justify-center w-full pb-1 lg:hidden flex flex-col">

                                <div className="flex items-center rounded w-full justify-center">
                                    <div className="flex items-center rounded w-full justify-start">
                                        <div className="">
                                            <SideMenu {...userData} />
                                        </div>
                                    </div>
                                    <Link href="/techshop" className="flex items-center rounded w-full justify-center mt-2">
                                        <ShopLogo />
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
                                                <div className={`absolute -left-5 ${showUserDropdown ? "block" : "hidden"} w-full text-center bg-opacity-50`}>
                                                    <UserDropdown {...userData} />
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
                                            <p className="truncate font-normal px-1 w-full text-start italic">Hello, {userData.first_name}</p>
                                        </div>
                                        <div className={`absolute hidden dropdown-content bg-black w-full text-center z-30 bg-opacity-50`}>
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
                                    <ProductSearch {...categories} />
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

export default UserNavBar;