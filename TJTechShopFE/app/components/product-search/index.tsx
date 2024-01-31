"use client"

import { ChangeEvent, useEffect, useState } from "react";
import { getAllProducts } from "@/app/api/product";
import { ProductModel } from "@/app/models/product";
import Link from "next/link";
import ModalToggle from "@/app/scripts/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function ProductSearch() {
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const [inputString, setInputString] = useState<string>("");
    const [products, setProducts] = useState<ProductModel[]>([]);
    // const [showSearchBar, setShowSearchBar] = useState<boolean>(data.showSearchBar);

    const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputString(event.target.value);

    }

    const toggleSideBar = () => {
        ModalToggle("", "modal-backdrop-input");
        setShowSearchBar(old => !old);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            getAllProducts().then((result) => {
                setProducts(result);
            })
            setShowSearchBar(old => !old);
        }
        fetchProducts();
    }, [])

    return (
        <>
            <li className=" btn-hover">
                <button onClick={() => { setShowSearchBar(old => !old) }} >
                    <p className="p-1">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5" />
                    </p>
                </button>
            </li>
            {

                showSearchBar
                    ?
                    <div className="absolute inset-0 flex justify-center md:w-9/12 md:mx-32 xl:mx-52 2xl:mx-72 my-24 w-full">
                        <div className="flex flex-col items-center w-10/12">
                            <div className="flex flex-col w-full justify-center max-h-screen pb-28">
                                <input type="text" placeholder="What are you looking for?" autoFocus value={inputString} className="p-2 border-b border-gray-500 px-2 outline-none bg-black flex justify-center items-center w-full" onChange={changeEventHandler} />
                                <div className="overflow-y-scroll overflow-x-hidden">
                                    {
                                        inputString.length > 1
                                            ?
                                            products.filter((product => product.name.concat(`${product.brand?.name}${product.sub_category?.name}s`).toLowerCase().includes(inputString.toLowerCase().trim()))).map(product => (
                                                <Link href={`/product?product_id=${product.product_id}`} className="flex items-center justify-between nav-button w-full" key={product.product_id} onClick={() => setShowSearchBar(old => !old)}>
                                                    <img src={product.images ? product.images[0].url : ""} alt="Product Image" className="w-24 object-cover rounded p-2" />
                                                    <p className=" p-2 border-x whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</p>
                                                    <p className="italic p-2">${product.price}</p>
                                                </Link>
                                            ))
                                            :
                                            <>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                        <dialog open={showSearchBar} className="modal-backdrop z-30" id="modal-backdrop-input" onClick={toggleSideBar} />
                    </div>
                    :
                    <>
                    </>
            }
        </>
    )
}

export default ProductSearch;