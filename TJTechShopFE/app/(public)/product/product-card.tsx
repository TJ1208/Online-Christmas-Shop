"use client"

import { getProduct } from "@/app/api/product";
import AddToCart from "@/app/components/add-to-cart";
import ImageCarousel from "@/app/components/image-carousel";
import { ProductModel } from "@/app/models/product";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductLoad from "../products/product-load";

function ProductCard(newProduct: ProductModel) {
    const params = useSearchParams();
    const [product, setProduct] = useState<ProductModel>(newProduct);
    const [productId, setProductId] = useState<string>(newProduct.product_id!.toString());
    const [isLoading, setIsLoading] = useState<boolean>(true);

    if (productId != params.get("product_id") && params.get("product_id")) {
        setProductId(params.get("product_id") || "");
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setProductId(params.get("product_id") || "");
            const product = await getProduct(productId);
            setProduct(product);
            setIsLoading(false);

        }
        fetchData()
    }, [productId])

    return (
        <>
            {
                isLoading
                    ?
                    <>
                        <ProductLoad />
                    </>
                    :


                    <div className="shadow-xl bg-slate-900 bg-opacity-10 rounded w-full p-5">

                        {/* Mobile View */}
                        <div className="lg:hidden w-full flex flex-col justify-between h-full">
                            <div className="flex flex-col items-center w-full">
                                <div className="my-3 flex flex-col text-left w-full">
                                    <p className="rounded px-3 py-3 underline-offset-8 underline text-blue-300 font-normal text-left w-full">{product.brand?.name}</p>
                                    <div className="flex items-center">
                                        <p className="rounded px-3 text-left w-full">{product.name}</p>
                                        {
                                            product.sale_price > 0
                                                ?
                                                <p className="rounded text-sm text-black font-semibold bg-red-400 italic shadow-md shadow-red-400 h-fit p-1 m-2 whitespace-nowrap">On Sale</p>
                                                :
                                                <></>
                                        }
                                    </div>
                                </div>
                                <div className="w-96">
                                    <ImageCarousel images={product.images!} />
                                </div>
                            </div>
                            {
                                product.sale_price > 0
                                    ?
                                    <div className="flex justify-between w-full p-1 items-center mt-5">
                                        <div className="flex w-full justify-end">
                                            <p className="rounded font-light md:text-lg text-lg m-2 italic text-green-200">${product.sale_price}</p>
                                            <p className="rounded font-light md:text-lg m-2 line-through italic text-red-200">${product.price}</p>
                                        </div>
                                        <p className="rounded font-light text-sm text-red-200 italic shadow-sm shadow-red-50 h-fit p-1 m-2">-{100 - Math.round(((product.sale_price / product.price * 100)))}%</p>
                                    </div>

                                    :
                                    <div className="flex mt-5">
                                        <p className="text-right w-full rounded font-light md:text-lg text-lg italic text-green-200">${product.price}</p>
                                    </div>
                            }
                            <div className="mt-5">
                                <p className="rounded mx-8 mb-5 underline-offset-8 underline text-red-200 font-normal text-left w-full">About Product</p>
                                <p className="rounded px-10 text-left w-full">{product.description}</p>
                            </div>
                            <div className="grid grid-cols-1 md:mx-52 mx-32 items-center justify-center my-5">
                                <AddToCart {...product} />
                            </div>
                            <div className="my-5 underline underline-offset-4">
                                <Link href={`/products?brand_id=${product.brand_id}`} className="rounded px-10 py-5 text-left w-full text-gray-300 hover:text-white hover:transition-all">Shop More Products By <span className="font-semibold text-blue-200">{product.brand?.name}</span></Link>
                            </div>
                        </div>

                        {/* Desktop View */}
                        <div className="lg:flex hidden w-full justify-betwee items-end">
                            <div className="shadow-xl bg-slate-900 bg-opacity-10 rounded w-full min-h-[500px] max-h-[500px] m-5">
                                <ImageCarousel images={product.images!} />
                            </div>
                            <div className="flex flex-col items-center justify-center w-full">
                                <p className="italic text-gray-200 text-left w-full m-5 px-10 border shadow-xl bg-slate-700 border-slate-700 rounded-md p-3"><span className="text-blue-200 underline underline-offset-4">0</span> Sold Yesterday</p>
                                <div className="shadow-xl bg-slate-900 bg-opacity-10 rounded w-full p-5 border border-slate-700">
                                    <div className="my-3 flex text-left w-full">
                                        <div>
                                            <p className="rounded px-3 text-left w-full">{product.name}</p>
                                            <p className="rounded px-3 py-3 underline-offset-8 underline text-blue-300 font-normal text-left w-full">{product.brand?.name}</p>
                                        </div>
                                        {
                                            product.sale_price > 0
                                                ?
                                                <p className="rounded text-sm text-black font-semibold bg-red-400 italic shadow-md shadow-red-400 h-fit p-1 ml-16 whitespace-nowrap">On Sale</p>
                                                :
                                                <></>
                                        }
                                    </div>
                                    <div className="m-3 grid grid-flow-row gap-5 justify-start">
                                        {
                                            product.sale_price > 0
                                                ?
                                                <div className="flex justify-between w-full p-1 items-start">

                                                    <div className="flex w-full justify-end">
                                                        <p className="rounded font-light md:text-xl text-lg m-2 italic text-green-200">${product.sale_price}</p>
                                                        <p className="rounded font-light md:text-xl m-2 my-1 line-through italic text-red-200">${product.price}</p>
                                                    </div>
                                                    <p className="rounded font-light text-sm text-red-200 italic shadow-sm shadow-red-50 h-fit p-1 m-2">-{100 - Math.round(((product.sale_price / product.price * 100)))}%</p>
                                                </div>

                                                :
                                                <div className="flex">
                                                    <p className="text-left w-full my-5 rounded font-light md:text-xl text-2xl italic text-green-200">${product.price}</p>
                                                </div>
                                        }
                                        <AddToCart {...product} />
                                    </div>

                                    <p className="rounded mx-8 mb-5 underline-offset-8 underline text-red-200 font-normal text-left w-full">About Product</p>
                                    <p className="rounded px-10 text-left w-full">{product.description}</p>
                                    <div className="my-5 underline underline-offset-4">
                                        <Link href={`/products?brand_id=${product.brand_id}`} className="rounded px-10 py-5 text-left w-full text-gray-300 hover:text-white hover:transition-all">Shop More Products By <span className="font-semibold text-blue-200">{product.brand?.name}</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default ProductCard;