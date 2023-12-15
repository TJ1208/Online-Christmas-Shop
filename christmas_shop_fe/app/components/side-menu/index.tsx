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
                <div className={`absolute inset-0 z-30 sm:w-1/2 w-3/4 min-h-screen max-h-screen overflow-x-scroll flex flex-col bg-white rounded-md overflow-y-scroll ${transClass}`}>
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
                    {

                        categories.map((category: CategoryModel) =>
                            <div key={category.category_id} className="grid grid-flow-col grid-cols-3">
                                <img src={category.image.url} className=""/>
                                <Link className="hover:bg-blue-100 duration-200 hover:text-zinv-500 px-4 py- border-b rounded p-3 text-left font-normal"
                                    href="" onClick={toggle}>{category.name}</Link>
                            </div>

                        )
                    }




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