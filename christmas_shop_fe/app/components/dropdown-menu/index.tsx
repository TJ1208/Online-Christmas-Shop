"use client"

import { CategoryModel } from "@/app/models/category";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoadingCompoent } from "../loading-component";

export const DropdownMenu = () => {

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/category');
            const categories = await response.json();
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
            <div className="relative flex">
                <button onClick={toggle} className="text-overflow border-b-2 btn-hover p-2 m-1 rounded">Categories</button>
                <div>
                    <div className={`absolute top-11 left-0 z-30 w-[250px] min-h-[300px] max-h-[350px] flex flex-col bg-white rounded-md overflow-y-scroll ${transClass}`}>
                        <h1 className="text-lg text-center p-3 border-b">All Categories</h1>
                        {
                            isLoading
                                ?
                                <LoadingCompoent />
                                :
                                <></>
                        }
                        {
                            categories.map(category =>
                                <Link className="hover:bg-blue-100 duration-200 hover:text-zinv-500 px-4 py- border-b rounded p-3 text-left font-normal"
                                    href="" onClick={toggle} key={category.category_id}>{category.name}</Link>)
                        }
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

export default DropdownMenu;