"use client"

import { ProductModel } from "@/app/models/product";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export const SimilarProducts = (data: { products: ProductModel[], product: ProductModel }) => {

    const product = data.product;
    const products = data.products.filter(filterProduct => filterProduct.category_id == product.category_id && filterProduct.product_id != product.product_id);
    const length = products.length;
    const [productRange, setProductRange] = useState({ low: 0, high: 6 });

    return (
        <>
            <div >

                <div className="flex flex-col items-start shadow-xl bg-slate-900 bg-opacity-10 justify-start">

                    <p className="top-0 text-slate-200 font-semibold md:text-lg text-sm border rounded-full p-1 px-3 border-slate-700 m-5 shadow-xl">Similar Products</p>
                    <div className="flex items-center justify-center">
                        <button className="rounded text-gray-50 p-1 bg-slate-900 bg-opacity-10 h-52 hover:bg-opacity-30 m-2" onClick={() => productRange.low != 0 ? setProductRange({ low: 0, high: 6 }) : setProductRange({ low: length < 12 && length > 6 ? length - 6 : 0, high: length < 12 ? length : 12 })}>
                            <FontAwesomeIcon icon={faChevronLeft} size="xl" className="p-2" />
                        </button>
                        <div className="grid lg:grid-cols-6 grid-cols-3 mt-10">
                            {
                                products.splice(productRange.low, productRange.high).map(product => (
                                    <Link href={`/product?product_id=${product.product_id}`} className="container mx:auto shadow-xl" key={product.product_id}>
                                        <div className="m-2 p-2 hover:opacity-80 hover:transition-all">
                                            <img src={product.images?.at(0)!.url} alt="Product Image" className="w-full h-40 sm:object-contain object-cover mt-5" />
                                            <p className="text-left w-full">{product.name}</p>
                                            {
                                                product.sale_price > 0
                                                    ?
                                                    <div className="flex justify-between w-full p-1 items-center">
                                                        <div className="flex flex-col w-full">
                                                            <p className="rounded font-light md:text-lg pl-2 line-through italic text-red-200">${product.price}</p>
                                                            <p className="rounded font-light md:text-lg text-sm italic text-green-200">${product.sale_price}</p>
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
                        <button className="rounded text-gray-50 p-1 bg-slate-900 bg-opacity-10 h-52 hover:bg-opacity-30 m-2" onClick={() => productRange.low != 0 ? setProductRange({ low: 0, high: 6 }) : setProductRange({ low: length < 12 && length > 6 ? length - 6 : 0, high: length < 12 ? length : 12 })}>
                            <FontAwesomeIcon icon={faChevronRight} size="xl" className="p-2" />
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SimilarProducts;