"use client"

import { ChangeEvent, useEffect, useState } from "react";
import { getAllProducts } from "@/app/api/product";
import { ProductModel } from "@/app/models/product";
import CategoryModel from "@/app/models/category";

function ProductSearch(categories: CategoryModel[]) {
    const [inputString, setInputString] = useState<string>("");
    const [products, setProducts] = useState<ProductModel[]>([]);
    const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputString(event.target.value);

    }

    useEffect(() => {
        const fetchProducts = async () => {
            getAllProducts().then((result) => {
                setProducts(result);
            })
        }
        fetchProducts();
    }, [])

    return (
        <>
            <div className="flex flex-col items-center w-10/12">
                <div className="flex flex-col w-full justify-center ">
                    <input type="text" placeholder="What are you looking for?" autoFocus value={inputString} className="p-2 border-b border-gray-500 px-2 outline-none bg-black flex justify-center items-center w-full" onChange={changeEventHandler} />
                    {
                        inputString.length > 2
                            ?
                            products.filter((product => product.name.toLowerCase().includes(inputString.toLowerCase()))).map(product => (
                                <div className="flex items-center justify-between nav-button w-full" key={product.product_id}>
                                    <img src={product.images ? product.images[0].url : ""} alt="Product Image" className="w-24 object-cover rounded p-2" />
                                    <p className=" p-2 border-x whitespace-nowrap overflow-hidden text-ellipsis">{product.name}</p>
                                    <p className="italic p-2">${product.price}</p>
                                    {/* <p>{product.sale_price}</p> */}
                                </div>
                            ))
                            :
                            <>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductSearch;