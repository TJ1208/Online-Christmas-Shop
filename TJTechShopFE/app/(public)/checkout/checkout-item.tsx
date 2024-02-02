"use client"

import { getProduct } from "@/app/api/product";
import { CartProductModel } from "@/app/models/cart_product";
import { ProductModel } from "@/app/models/product";
import { useEffect, useState } from "react";
import ProductLoad from "../products/product-load";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function CheckoutItem(cartProduct: CartProductModel) {
    const [product, setProduct] = useState<ProductModel>({
        name: "",
        description: "",
        price: 0,
        sale_price: 0,
        create_time: "",
        category_id: 0,
        brand_id: 0
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const product = await getProduct(cartProduct.product_id.toString() || "0");
            setProduct(product);
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <>
            {
                isLoading
                    ?
                    <div className="w-full items-center justify-center text-center min-h-fit">
                        <div className="shadow-xl w-full h-36 flex items-center justify-center">
                            <FontAwesomeIcon icon={faCircleNotch} spin className="md:w-16 w-10 flex items-center justify-center" />
                        </div>
                    </div>
                    :
                    <div className="flex flex-col w-full">
                        <div className="m-5 flex">
                            <img src={product.images ? product.images[0].url : ""} alt="Product Image" className="object-contain h-24" />

                            <div>
                                <div className="flex items-center justify-between flex-col pl-5">
                                    <p className="text-gray-200 font-medium">{product.name}</p>
                                </div>
                            </div>
                        </div>
                        {
                            product.sale_price > 0
                                ?
                                <div className="flex w-full justify-end pr-5">
                                    <div className="flex items-center">

                                        <p className="text-blue-200 border rounded-full px-2 font-semibold border-gray-600">{cartProduct.quantity}</p>
                                        <p className="rounded font-light m-2 italic text-green-200">${product.sale_price}</p>
                                    </div>
                                    <p className="rounded font-light m-2 my-1 line-through italic text-red-200">${product.price}</p>
                                </div>
                                :
                                <div className="flex w-full justify-end pr-5 items-center gap-5">
                                    <p className="text-blue-200 border rounded-full px-2 font-semibold border-gray-600">{cartProduct.quantity}</p>
                                    <p className="rounded font-light my-2 mr-2 italic text-green-200">${product.price}</p>
                                </div>

                        }
                    </div>
            }

        </>
    )
}

export default CheckoutItem;