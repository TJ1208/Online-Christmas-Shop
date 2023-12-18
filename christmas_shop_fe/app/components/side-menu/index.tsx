"use client"

import { CategoryModel } from "@/app/models/category";
import { faBars, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export const SideMenu = () => {

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/category');
            const categories: CategoryModel[] = await response.json();
            setCategories(categories);
            setLoading(false);
        }
        fetchData();
    }, [])

    const toggle = () => {
        setIsOpen(old => !old);
    }

    const transClass = isOpen
        ?
        "flex"
        :
        "hidden";

    return (
        <>
            <div className="flex">
                <FontAwesomeIcon icon={faBars} className="font-awesome-icon" onClick={toggle} />
                <div className={`absolute inset-0 z-30 w-96 min-h-screen max-h-screen overflow-x-scroll flex flex-col bg-white rounded-md ${transClass}`}>
                    <div className="flex justify-between border-b">
                        <h1 className="text-lg text-left px-5 p-3 ">Menu</h1>
                        <FontAwesomeIcon icon={faXmark} className="p-3 m-1 bg-slate-100 rounded-full h-4 btn-hover hover:cursor-pointer" onClick={toggle} />
                    </div>
                    {
                        isLoading
                            ?
                            <div className="flex flex-col items-center justify-center p-5">
                                <p>Loading...</p>
                                <FontAwesomeIcon icon={faSpinner} spin className="mt-10 h-5 text-amber-600" />
                            </div>

                            :
                            <></>
                    }
                    <h1 className="text-xl p-4 hover:underline hover:cursor-pointer">Categories</h1>
                    <div className="grid gap-4 grid-cols-4 auto-rows-auto border-b">

                        {

                            categories.map((category: CategoryModel) =>
                                <div key={category.category_id} className="flex flex-col p-2 hover:underline hover:cursor-pointer" onClick={toggle}>
                                    <img src={category.image.url} className="object-cover h-16 border rounded-full shadow" />
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
                </div>
            </div>
            {
                isOpen
                    ?
                    <div className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40" onClick={toggle}>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

export default SideMenu;