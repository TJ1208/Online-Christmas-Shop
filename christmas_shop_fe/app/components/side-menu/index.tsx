"use client"

import { CategoryModel } from "@/app/models/category";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { LoadingCompoent } from "../loading-component";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { faArrowAltCircleDown, faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import ModalToggle from "@/app/scripts/modal";

export const SideMenu = () => {

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showSideBar, setShowSideBar] = useState<boolean>(false);
    const [isUsers, setToggleUsers] = useState<boolean>(false);
    const [isProducts, setToggleProducts] = useState<boolean>(false);
    const [isImages, setToggleImages] = useState<boolean>(false);
    const [isOrders, setToggleOrders] = useState<boolean>(false);
    const [isPastOrders, setTogglePastOrders] = useState<boolean>(false);
    const [isCategories, setToggleCategories] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/category');
            const categories: CategoryModel[] = await response.json();
            setCategories(categories);
            setLoading(false);
        }
        fetchData();
    }, [])

    const toggleUsers = () => {
        setToggleUsers(old => !old);
    }

    const toggleProducts = () => {
        setToggleProducts(old => !old);
    }

    const toggleImages = () => {
        setToggleImages(old => !old);
    }

    const toggleOrders = () => {
        setToggleOrders(old => !old);
    }

    const togglePastOrders = () => {
        setTogglePastOrders(old => !old);
    }

    const toggleCategories = () => {
        setToggleCategories(old => !old);
    }

    const toggleSideBar = () => {
        ModalToggle("side-menu", "side-menu-backdrop");
        setShowSideBar(old => !old);
    }

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";

    const transUserClass = isUsers
        ?
        "flex"
        :
        "hidden";

    const transProductClass = isProducts
        ?
        "flex"
        :
        "hidden";

    const transImageClass = isImages
        ?
        "flex"
        :
        "hidden";

    const transOrderClass = isOrders
        ?
        "flex"
        :
        "hidden";

    const transPastOrderClass = isPastOrders
        ?
        "flex"
        :
        "hidden";

    const transCategoryClass = isCategories
        ?
        "flex"
        :
        "hidden";

    return (
        !usePathname().includes("admin")
            ?
            <>
                <div className="flex">
                    <FontAwesomeIcon icon={faBars} className="font-awesome-icon" onClick={() => setShowSideBar(old => !old)} />
                    <dialog open={showSideBar} id="side-menu" className="side-menu mx-0 z-40">
                        <div className="flex justify-between border-b">
                            <h1 className="text-lg text-left px-5 p-3 ">Menu</h1>
                            <FontAwesomeIcon icon={faXmark} className="p-3 m-1 bg-slate-100 rounded-full h-4 btn-hover hover:cursor-pointer" onClick={() => {
                                var modal = document.getElementById("side-menu")
                                modal?.setAttribute('closing', "");
                                modal?.addEventListener('animationend', () => {
                                    modal?.removeAttribute('closing');
                                    setShowSideBar(old => !old);
                                }, { once: true })
                            }} />
                        </div>
                        {
                            isLoading
                                ?
                                <LoadingCompoent />

                                :
                                <></>
                        }
                        <h1 className="text-xl p-4 hover:underline hover:cursor-pointer">Categories</h1>
                        <div className="grid gap-4 grid-cols-4 auto-rows-auto border-b">

                            {

                                categories.slice(0, 6).map((category: CategoryModel) =>
                                    <div key={category.category_id} className="flex flex-col p-2 hover:underline hover:cursor-pointer" onClick={toggle}>
                                        <img src={category.image?.url} className="object-cover h-16 border rounded-full shadow" />
                                        <p className="text-sm rounded p-1 text-center font-light">{category.name}</p>

                                    </div>

                                )

                            }
                        </div>
                        <h1 className="text-xl p-4 hover:underline hover:cursor-pointer">Deals</h1>
                        <div className="grid gap-4 grid-cols-4 auto-rows-auto border-b">
                            <div className="flex flex-col p-2 hover:underline hover:cursor-pointer" onClick={toggle}>
                                <img src="https://tjcoding.sirv.com/website-images/deals-tag.png" className=" object-fill border border-white shadow bg-slate-50 h-16 rounded-full" />
                                <p className="text-sm rounded p-1 text-center font-light">Top Deals</p>

                            </div>
                            <div className="flex flex-col p-2 hover:underline hover:cursor-pointer" onClick={toggle}>
                                <img src="https://tjcoding.sirv.com/website-images/cheap-deals.jpg" className=" object-fill shadow  bg-slate-50 h-16 rounded-full" />
                                <p className="text-sm rounded p-1 text-center font-light">Under $25</p>

                            </div>
                            <div className="flex flex-col p-2 hover:underline hover:cursor-pointer" onClick={toggle}>
                                <img src="https://tjcoding.sirv.com/website-images/top-brands.jpg" className=" object-fill bg-slate-50  shadow h-16 rounded-full" />
                                <p className="text-sm rounded p-1 text-center font-light">Top Brands</p>

                            </div>
                            <div className="flex flex-col p-2 hover:underline hover:cursor-pointer" onClick={toggle}>
                                <img src="https://tjcoding.sirv.com/website-images/new-item.jpg" className=" object-fill bg-slate-50  shadow h-16 rounded-full" />
                                <p className="text-sm rounded p-1 text-center font-light">New Items</p>

                            </div>
                        </div>
                        <h1 className="text-xl p-4 hover:underline hover:cursor-pointer">Top Rated</h1>
                        <div className="grid gap-4 grid-cols-4 auto-rows-auto border-b">

                            {

                                categories.map((category: CategoryModel) =>
                                    <div key={category.category_id} className="flex flex-col p-2 hover:underline hover:cursor-pointer" onClick={toggle}>
                                        <img src={category.image?.url} className="object-cover h-16 border rounded-full shadow" />
                                        <p className="text-sm rounded p-1 text-center font-light">{category.name}</p>

                                    </div>

                                )

                            }
                        </div>
                    </dialog>
                </div>
            </>
            :
            <>
                <div className="flex">
                    <FontAwesomeIcon icon={faBars} className="font-awesome-icon" onClick={() => setShowSideBar(old => !old)} />
                    <dialog open={showSideBar} id="side-menu" className="side-menu mx-0 z-40">
                        {/* <div className={`absolute inset-0 z-30 w-96 min-h-screen max-h-screen overflow-x-scroll flex flex-col bg-white rounded-md ${transClass}`}> */}
                            <div className="flex justify-between border-b">
                                <h1 className="text-lg text-left px-5 p-3 ">Menu</h1>
                                <FontAwesomeIcon icon={faXmark} className="p-3 m-1 bg-slate-100 rounded-full h-4 btn-hover hover:cursor-pointer" onClick={() => {
                                    var modal = document.getElementById("side-menu")
                                    modal?.setAttribute('closing', "");
                                    modal?.addEventListener('animationend', () => {
                                        modal?.removeAttribute('closing');
                                        setShowSideBar(old => !old);
                                    }, { once: true })
                                }} />
                            </div>
                            <div className="flex items-center">
                                <button className="text-md p-4 btn-hover text-left w-full relative" onClick={toggleUsers}>Users</button>
                                {
                                    isUsers
                                        ?
                                        <FontAwesomeIcon icon={faArrowAltCircleDown} className="absolute left-80 h-5" />
                                        :
                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="absolute left-80 h-5" />
                                }
                            </div>

                            <ul className={`grid grid-rows-4 auto-rows-auto border-b text-sm font-normal px-10 ${transUserClass}`}>
                                <Link href="" className="nav-button" onClick={toggle}>View Users</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Register Users</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Update Users</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Delete Users</Link>
                            </ul>
                            <div className="flex items-center">
                                <button className="text-md p-4 btn-hover w-full text-left" onClick={toggleProducts}>Products</button>
                                {
                                    isProducts
                                        ?
                                        <FontAwesomeIcon icon={faArrowAltCircleDown} className="absolute left-80 h-5" />
                                        :
                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="absolute left-80 h-5" />
                                }
                            </div>
                            <ul className={`grid grid-rows-4 auto-rows-auto text-sm font-normal px-10 ${transProductClass}`}>
                                <Link href="" className="nav-button" onClick={toggle}>View Products</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Add Products</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Update Products</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Delete Products</Link>
                            </ul>
                            <div className="flex items-center">
                                <button className="text-md p-4 btn-hover w-full text-left" onClick={toggleImages}>Images</button>
                                {
                                    isImages
                                        ?
                                        <FontAwesomeIcon icon={faArrowAltCircleDown} className="absolute left-80 h-5" />
                                        :
                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="absolute left-80 h-5" />
                                }
                            </div>
                            <ul className={`grid grid-rows-4 auto-rows-auto text-sm font-normal px-10 ${transImageClass}`}>
                                <Link href="" className="nav-button" onClick={toggle}>View Images</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Register Images</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Add Images</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Delete Images</Link>
                            </ul>
                            <div className="flex items-center">
                                <button className="text-md p-4 btn-hover w-full text-left" onClick={toggleOrders}>Orders</button>
                                {
                                    isOrders
                                        ?
                                        <FontAwesomeIcon icon={faArrowAltCircleDown} className="absolute left-80 h-5" />
                                        :
                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="absolute left-80 h-5" />
                                }
                            </div>
                            <ul className={`grid grid-rows-4 auto-rows-auto text-sm font-normal px-10 ${transOrderClass}`}>
                                <Link href="" className="nav-button" onClick={toggle}>View Orders</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Register Orders</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Update Orders</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Delete Orders</Link>
                            </ul>
                            <div className="flex items-center">
                                <button className="text-md p-4 btn-hover w-full text-left" onClick={togglePastOrders}>Past Orders</button>
                                {
                                    isPastOrders
                                        ?
                                        <FontAwesomeIcon icon={faArrowAltCircleDown} className="absolute left-80 h-5" />
                                        :
                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="absolute left-80 h-5" />
                                }
                            </div>
                            <ul className={`grid grid-rows-4 auto-rows-auto text-sm font-normal px-10 ${transPastOrderClass}`}>
                                <Link href="" className="nav-button" onClick={toggle}>View Order History</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Add Order History</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Update Order History</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Delete Order History</Link>
                            </ul>
                            <div className="flex items-center">
                                <button className="text-md p-4 btn-hover w-full text-left" onClick={toggleCategories}>Categories</button>
                                {
                                    isCategories
                                        ?
                                        <FontAwesomeIcon icon={faArrowAltCircleDown} className="absolute left-80 h-5" />
                                        :
                                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="absolute left-80 h-5" />
                                }
                            </div>
                            <ul className={`grid grid-rows-4 auto-rows-auto text-sm font-normal px-10 ${transCategoryClass}`}>
                                <Link href="/admin/category" className="nav-button" onClick={toggle}>View Categories</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Add Categories</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Update Categories</Link>
                                <Link href="" className="nav-button" onClick={toggle}>Delete Categories</Link>
                            </ul>
                        {/* </div> */}
                    </dialog>
                </div>
            </>

    )
}

export default SideMenu;