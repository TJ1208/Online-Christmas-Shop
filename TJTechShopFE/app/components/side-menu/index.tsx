"use client"

import { CategoryModel } from "@/app/models/category";
import { faBars, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ModalToggle from "@/app/scripts/modal";
import ShopLogo from "../shop-logo";

function SideMenu(userData: any) {
    const path = usePathname();
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [showCategories, setShowCategories] = useState<boolean>(false);
    const [showBrands, setShowBrands] = useState<boolean>(false);
    const [showProfile, setShowProfile] = useState<boolean>(false);
    const [showSideBar, setShowSideBar] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://tjtechbe.tcjcoding.com/category');
            const categories: CategoryModel[] = await response.json();
            setCategories(categories);
        }
        fetchData();
    }, [])



    const toggleSideBar = () => {
        ModalToggle("side-menu", "modal-backdrop-menu");
        setShowSideBar(old => !old);
    }

    return (
        !usePathname().includes("admin")
            ?
            <>
                <FontAwesomeIcon icon={faBars} className="font-awesome-icon" onClick={() => setShowSideBar(old => !old)} />
                <dialog open={showSideBar} id="side-menu" className="side-menu mx-0 z-40 bg-black bg-opacity-80">
                    <div className="">
                        <FontAwesomeIcon icon={faXmark} className="nav-button shadow shadow-white border-b absolute right-0 top-2" onClick={toggleSideBar} />
                    </div>
                    <div className="mt-14">
                        <div>
                            <div className="text-blue-200 font-semibold p-5 border-b border-t border-gray-500 opacity-80 hover:opacity-100 hover:cursor-pointer flex items-center justify-between " onClick={() => setShowCategories(old => !old)}>
                                <p>Shop By Category</p>
                                <img src="https://tjcoding.sirv.com/website-images/icons8-sort-down-40.png" alt="Dropdown Arrow" className="h-4 mx-5" />
                            </div>
                            <div className="grid grid-cols-2 opacity-90">
                                {
                                    showCategories
                                        ?
                                        categories.map(category => (
                                            <li className="side-menu-button" key={category.category_id}>
                                                <p className="border-l px-5 w-fit">{category.name}</p>
                                            </li>
                                        ))
                                        :
                                        <>
                                        </>
                                }
                            </div>
                        </div>
                        <div className="text-blue-200 font-semibold p-5 border-b border-t border-gray-500 opacity-80 hover:opacity-100 hover:cursor-pointer flex items-center justify-between ">
                            <p>Best Deals</p>
                        </div>
                        <div>
                            <div className="text-blue-200 font-semibold p-5 border-b border-t border-gray-500 opacity-80 hover:opacity-100 hover:cursor-pointer flex items-center justify-between " onClick={() => setShowBrands(old => !old)}>
                                <p>Top Tech Brands</p>
                                <img src="https://tjcoding.sirv.com/website-images/icons8-sort-down-40.png" alt="Dropdown Arrow" className="h-4 mx-5" />
                            </div>
                            <div className="opacity-90">
                                {
                                    showBrands
                                        ?
                                        <ul className="grid grid-cols-2">
                                            <li className="side-menu-button">
                                                <p className="border-l px-5 w-fit">Samsung</p>
                                            </li>
                                            <li className="side-menu-button">
                                                <p className="border-l px-5 w-fit">Lenovo</p>
                                            </li>
                                            <li className="side-menu-button">
                                                <p className="border-l px-5 w-fit">Alienware</p>
                                            </li>
                                            <li className="side-menu-button">
                                                <p className="border-l px-5 w-fit">MSI</p>
                                            </li>
                                            <li className="side-menu-button">
                                                <p className="border-l px-5 w-fit">HP</p>
                                            </li>
                                            <li className="side-menu-button">
                                                <p className="border-l px-5 w-fit">Logitech</p>
                                            </li>
                                        </ul>
                                        :
                                        <>
                                        </>
                                }
                            </div>
                        </div>
                        <div className="text-blue-200 font-semibold p-5 border-b border-t border-gray-500 opacity-80 hover:opacity-100 hover:cursor-pointer flex items-center justify-between ">
                            <p>New Tech</p>
                        </div>
                        <div>
                            <div className="text-blue-200 font-semibold p-5 border-b border-t border-gray-500 opacity-80 hover:opacity-100 hover:cursor-pointer flex items-center justify-between " onClick={() => setShowProfile(old => !old)}>
                                <p className="">{userData.first_name}&apos;s Profile</p><FontAwesomeIcon icon={faUser} />
                                <img src="https://tjcoding.sirv.com/website-images/icons8-sort-down-40.png" alt="Dropdown Arrow" className="ml-36 h-4 mx-5" />
                            </div>
                            <div className="opacity-90">
                                {
                                    showProfile
                                        ?
                                        <ul className="grid grid-cols-2">
                                            <li className="side-menu-button">
                                                <p className="border-l px-5 w-fit">Account</p>
                                            </li>
                                            <li className="side-menu-button">
                                                <p className="border-l px-5 w-fit">Orders</p>
                                            </li>
                                            <li className="side-menu-button">
                                                <p className="border-l px-5 w-fit">Cart</p>
                                            </li>
                                            <li className="side-menu-button">
                                                <p className="border-l px-5 w-fit">Lists</p>
                                            </li>
                                        </ul>
                                        :
                                        <>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 mb-5 flex flex-col items-center justify-center opacity-80 w-full">
                        <ShopLogo />
                        <p className="text-white text-xs space-x-1"><span className="text-blue-200">&ldquo;Buy Today,</span>&nbsp;<span className="text-red-400">Love Tomorrow&ldquo;</span></p>
                    </div>
                </dialog>
                <dialog open={showSideBar} className="modal-backdrop-menu z-30" id="modal-backdrop-menu" onClick={toggleSideBar} />
            </>
            :
            <>
                <div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faBars} className="font-awesome-icon" onClick={() => setShowSideBar(old => !old)} />
                        <dialog open={showSideBar} id="side-menu" className="side-menu mx-0 z-40 bg-black bg-opacity-80">
                            <div>
                                <FontAwesomeIcon icon={faXmark} className="nav-button shadow shadow-white border-b absolute right-0 top-2" onClick={toggleSideBar} />
                            </div>
                            <div className="flex flex-col mt-14">
                                <Link href="/admin/user" className={`side-menu-button ${path == '/admin/user' ? 'border' : ''}`}
                                    onClick={toggleSideBar}>Users</Link>
                                <Link href="/admin/product" className={`side-menu-button ${path == '/admin/product' ? 'border' : ''}`}
                                    onClick={toggleSideBar}>Products</Link>
                                <Link href="/admin/image" className={`side-menu-button ${path == '/admin/image' ? 'border' : ''}`}
                                    onClick={toggleSideBar}>Images</Link>
                                <Link href="/admin/order" className={`side-menu-button ${path == '/admin/order' ? 'border' : ''}`}
                                    onClick={toggleSideBar}>Orders</Link>
                                <Link href="/admin/past-order" className={`side-menu-button ${path == '/admin/past-order' ? 'border' : ''}`}
                                    onClick={toggleSideBar}>Past Orders</Link>
                                <Link href="/admin/category" className={`side-menu-button ${path == '/admin/category' ? 'border' : ''}`}
                                    onClick={toggleSideBar}>Categories</Link>
                            </div>
                        </dialog>
                    </div>
                    <dialog open={showSideBar} className="modal-backdrop-menu z-30" id="modal-backdrop-menu" onClick={toggleSideBar} />
                </div>
            </>

    )
}

export default SideMenu;