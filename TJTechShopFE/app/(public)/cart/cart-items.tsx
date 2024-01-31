"use client"

import getCartByUserId from "@/app/api/cart";
import { CartModel } from "@/app/models/cart";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../product/product-card";
import ProductLoad from "../products/product-load";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const CartItems = () => {
    const params = useSearchParams();
    const [userId, setUserId] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userCart, setUserCart] = useState<CartModel>();

    if (userId != params.get("user_id") && params.get("user_id")) {
        setUserId(params.get("user_id") || "");
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setUserId(params.get("user_id") || "");
            const userCart = await getCartByUserId(userId);
            setUserCart(userCart);
            setIsLoading(false);

        }
        fetchData()
    }, [userId])

    return (
        <>
            {
                isLoading
                    ?
                    <ProductLoad />
                    :
                    userCart?.products!.length! > 0
                        ?
                        userCart?.products!.map(product => (
                            <ProductCard {...product} key={product.product_id} />
                        ))
                        :
                        <div className="flex flex-col items-center justify-center my-24 gap-10">

                            <FontAwesomeIcon icon={faCartShopping} size="2xl" className="text-gray-300 border rounded-full p-5 border-gray-500" />
                            <p className="italic text-gray-400 text-lg">Cart is Empty</p>
                        </div>
            }
        </>
    )
}

export default CartItems;