"use client"

import getCartByUserId, { addProductToCart, updateProductToCart } from "@/app/api/cart";
import { getTokenClaims } from "@/app/api/jwt-token";
import { getUser } from "@/app/api/user";
import { ProductModel } from "@/app/models/product";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AddToCartFP(product: ProductModel) {
    const router = useRouter();
    const [quantity, setQuantity] = useState({ quantity: 1 });
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [message, setMessage] = useState({
        isError: false
    })

    const addToCart = () => {
        getTokenClaims().then((result) => {
            getUser(result.sub).then((user) => {
                getCartByUserId(user.user_id!.toString()).then((cart) => {
                    cart.products!.find(findProduct => findProduct.product_id == product.product_id)
                        ?
                        updateProductToCart({ cart_id: cart.cart_id!, product_id: product.product_id!, quantity: quantity.quantity }, cart.cart_id!, product.product_id!).then((cartResult) => {
                            setMessage({ isError: cartResult.quantity == undefined ? true : false })
                            setShowMessage(old => !old)
                            router.refresh();
                            setTimeout(() => {
                                setShowMessage(old => !old)
                            }, 3000)
                        })
                        :
                        addProductToCart({ cart_id: cart.cart_id!, product_id: product.product_id!, quantity: quantity.quantity }).then((cartResult) => {
                            setMessage({ isError: cartResult.quantity == undefined ? true : false })
                            setShowMessage(old => !old)
                            router.refresh();
                            setTimeout(() => {
                                setShowMessage(old => !old)
                            }, 3000)
                        })
                })
            })
        })
    }

    return (
        <>
            {
                showMessage && !message.isError
                    ?
                    <>
                            <img src="https://tjcoding.sirv.com/website-images/checkmark-circle-svgrepo-com.png" className="h-10 object-contain rounded p-3 shadow-sm m-3 w-1/2 font-semibold bg-green-200" />
                    </>


                    :
                    showMessage && message.isError
                        ?
                        <>
                                <img src="https://tjcoding.sirv.com/website-images/error-circle-fail-failure-disallowed-x-cross-bad-svgrepo-com.png" className="h-10 object-contain rounded p-3 shadow-sm m-3 w-1/2 font-semibold bg-red-400" />
                        </>
                        :
                        <button className="bg-slate-500 rounded p-3 shadow-sm home-button m-3 w-1/2 font-semibold text-gray-300" onClick={() => addToCart()}>Add To Cart</button>
            }


        </>
    )
}

export default AddToCartFP;