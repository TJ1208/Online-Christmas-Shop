"use client"

import { CategoryModel } from "@/app/models/category";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { LoadingCompoent } from "../loading-component";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ModalToggle from "@/app/scripts/modal";

const SideMenu = () => {
    const path = usePathname();
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [showSideBar, setShowSideBar] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/category');
            const categories: CategoryModel[] = await response.json();
            setCategories(categories);
            setLoading(false);
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
                <div className="flex">
                    <FontAwesomeIcon icon={faBars} className="font-awesome-icon" onClick={() => setShowSideBar(old => !old)} />
                    <dialog open={showSideBar} id="side-menu" className="side-menu mx-0 z-40 bg-gray-950 text-white">
                        <div className="flex justify-between border-b">
                            <h1 className="text-lg text-left px-5 p-3 ">Menu</h1>
                            <FontAwesomeIcon icon={faXmark} className="p-3 m-1  rounded-full h-4 btn-hover hover:cursor-pointer" onClick={toggleSideBar} />
                        </div>
                        {
                            isLoading
                                ?
                                <LoadingCompoent />

                                :
                                <></>
                        }
                        {/* <h1 className="text-xl p-4 hover:underline hover:cursor-pointer">Categories</h1>
                        <div className="grid gap-4 grid-cols-4 auto-rows-auto border-b">

                            {

                                categories.slice(0, 8).map((category: CategoryModel) =>
                                    <div key={category.category_id} className="flex flex-col p-2 hover:underline hover:cursor-pointer">
                                        <img src={category.image?.url} className="object-cover h-16 border rounded-full shadow" />
                                        <p className="text-sm rounded pt-2 text-center font-light">{category.name}</p>

                                    </div>

                                )

                            }
                        </div>
                        <h1 className="text-xl p-4 hover:underline hover:cursor-pointer">Deals</h1>
                        <div className="grid gap-4 grid-cols-4 auto-rows-auto border-b">
                            <div className="flex flex-col p-2 hover:underline hover:cursor-pointer">
                                <img src="https://tjcoding.sirv.com/website-images/deals-tag.png" className="object-cover h-16 border rounded-full shadow" />
                                <p className="text-sm rounded pt-2 text-center font-light">Top Deals</p>

                            </div>
                            <div className="flex flex-col p-2 hover:underline hover:cursor-pointer">
                                <img src="https://tjcoding.sirv.com/website-images/cheap-deals.jpg" className="object-cover h-16 border rounded-full shadow" />
                                <p className="text-sm rounded pt-2 text-center font-light">Under $25</p>

                            </div>
                            <div className="flex flex-col p-2 hover:underline hover:cursor-pointer">
                                <img src="https://tjcoding.sirv.com/website-images/top-brands.jpg" className="object-cover h-16 border rounded-full shadow" />
                                <p className="text-sm rounded pt-2 text-center font-light">Top Brands</p>

                            </div>
                            <div className="flex flex-col p-2 hover:underline hover:cursor-pointer">
                                <img src="https://tjcoding.sirv.com/website-images/new-item.jpg" className="object-cover h-16 border rounded-full shadow" />
                                <p className="text-sm rounded pt-2 text-center font-light">New Items</p>

                            </div>
                        </div>
                        <h1 className="text-xl p-4 hover:underline hover:cursor-pointer">Top Rated</h1>
                        <div className="grid gap-4 grid-cols-4 auto-rows-auto border-b">

                            {

                                categories.slice(0, 8).map((category: CategoryModel) =>
                                    <div key={category.category_id} className="flex flex-col p-2 hover:underline hover:cursor-pointer">
                                        <img src={category.image?.url} className="object-cover h-16 border rounded-full shadow" />
                                        <p className="text-sm rounded pt-2 text-center font-light">{category.name}</p>

                                    </div>

                                )

                            }
                        </div> */}
                    </dialog>
                    <dialog open={showSideBar} className="modal-backdrop-menu z-30" id="modal-backdrop-menu" onClick={toggleSideBar} />
                </div>
            </>
            :
            <>
                <div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faBars} className="font-awesome-icon" onClick={() => setShowSideBar(old => !old)} />
                        <dialog open={showSideBar} id="side-menu" className="side-menu mx-0 z-40 bg-gray-950 text-white">
                            <div className="flex justify-between border-b">
                                <h1 className="text-lg text-left px-5 p-3">Menu</h1>
                                <FontAwesomeIcon icon={faXmark} className="p-3 m-1  rounded-full h-4 btn-hover hover:cursor-pointer" onClick={toggleSideBar} />
                            </div>
                            <div className="flex flex-col">
                                <Link href="/admin/user" className={`nav-button px-3 bg-slate-600 ${path == '/admin/user' ? 'border-4' : ''}`}
                                    onClick={toggleSideBar}>Users</Link>
                                <Link href="/admin/product" className={`nav-button bg-slate-600 nav-button px-3 ${path == '/admin/product' ? 'border-4' : ''}`}
                                    onClick={toggleSideBar}>Products</Link>
                                <Link href="/admin/image" className={`nav-button bg-slate-600 nav-button px-3 ${path == '/admin/image' ? 'border-4' : ''}`}
                                    onClick={toggleSideBar}>Images</Link>
                                <Link href="/admin/order" className={`nav-button bg-slate-600 nav-button px-3 ${path == '/admin/order' ? 'border-4' : ''}`}
                                    onClick={toggleSideBar}>Orders</Link>
                                <Link href="/admin/past-order" className={`nav-button bg-slate-600 nav-button px-3 ${path == '/admin/past-order' ? 'border-4' : ''}`}
                                    onClick={toggleSideBar}>Past Orders</Link>
                                <Link href="/admin/category" className={`nav-button bg-slate-600 nav-button px-3 ${path == '/admin/category' ? 'border-4' : ''}`}
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