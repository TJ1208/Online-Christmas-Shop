"use client"

import { ProductModel } from "@/app/models/product";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export const SimilarProducts = (data: { products: ProductModel[], product: ProductModel }) => {
    const products = data.products.filter(product => product.category_id == data.product.category_id && product.product_id != data.product.product_id);
    const length = products.length;
    const [productRange, setProductRange] = useState({ low: 0, high: 5 });
    return (
        <>
            <div >

                <div className="flex items-center justify-center shadow-xl bg-slate-900 bg-opacity-10 relative">
                    <div>

                        <p className="absolute top-0 text-slate-200 font-semibold md:text-lg text-sm border rounded-full p-1 px-3 border-slate-700 m-5 shadow-xl">Similar Products</p>
                    </div>
                    <button className="rounded text-gray-50 p-1 bg-slate-900 bg-opacity-10 h-52 hover:bg-opacity-30 m-2" onClick={() => productRange.low != 0 ? setProductRange({ low: 0, high: 5 }) : setProductRange({ low: length < 10 && length > 5 ? length - 5 : 0, high: length < 10 ? length : 10 })}>
                        <FontAwesomeIcon icon={faChevronLeft} size="xl" className="p-2" />
                    </button>
                    <div className="grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-3 mt-10">
                        {
                            products.splice(productRange.low, productRange.high).map(product => (
                                <Link href={`/product?product_id=${product.product_id}`} className="container mx:auto shadow-xl" key={product.product_id}>
                                    <div className="m-2 p-2 opacity-80 hover:opacity-100 hover:transition-all">
                                        <img src={product.images?.at(0)!.url} alt="Product Image" className="w-full h-40 object-contain mt-5" />
                                        <p>{product.name}</p>
                                        {
                                            product.sale_price > 0
                                                ?
                                                <div className="flex justify-between w-full p-1 items-center mt-5">
                                                    <div className="flex w-full justify-start">
                                                        <p className="rounded font-light md:text-lg text-sm m-2 italic text-green-200">${product.sale_price}</p>
                                                        <p className="rounded font-light md:text-lg m-2 line-through italic text-red-200">${product.price}</p>
                                                    </div>
                                                </div>

                                                :
                                                <div className="flex">
                                                    <p className="text-left w-full rounded font-light md:text-lg text-sm italic text-green-200">${product.price}</p>
                                                </div>
                                        }
                                    </div>
                                </Link>
                            ))
                        }

                    </div>
                    <button className="rounded text-gray-50 p-1 bg-slate-900 bg-opacity-10 h-52 hover:bg-opacity-30 m-2" onClick={() => productRange.high != 10 ? setProductRange({ low: 5, high: 10 }) : setProductRange({ low: length < 10 && length > 5 ? length - 5 : 0, high: length < 10 ? length : 10 })}>
                        <FontAwesomeIcon icon={faChevronRight} size="xl" className="p-2" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default SimilarProducts;