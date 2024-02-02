"use client"

import getCartByUserId, { addProductToCart, updateProductToCart } from "@/app/api/cart";
import { getTokenClaims } from "@/app/api/jwt-token";
import { getUser } from "@/app/api/user";
import { ProductModel } from "@/app/models/product";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

function AddToCart(product: ProductModel) {
    const router = useRouter();
    const [quantity, setQuantity] = useState({ quantity: 1 });
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [message, setMessage] = useState({
        isError: false
    })

    const changeHandler = (event: ChangeEvent<any>) => {
        setQuantity({
            ...quantity,
            [event.target.name]: event.target.value
        })
    }

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
                        addProductToCart({ cart_id: cart.cart_id!, product_id: product.product_id!, quantity: quantity.quantity }, cart.cart_id || 0).then((cartResult) => {
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
            <div className="flex flex-col p-3">
                {
                    showMessage && !message.isError
                        ?
                        <>
                            <button className="rounded-full px-3 p-2 shadow-sm font-medium w-full">
                                <img src="https://tjcoding.sirv.com/website-images/checkmark-circle-svgrepo-com.png" className="h-9 object-contain rounded-full px-3 p-2 shadow-sm font-medium w-full bg-green-200" />
                            </button>
                        </>


                        :
                        showMessage && message.isError
                            ?
                            <>
                                <button className="rounded-full px-3 p-2 shadow-sm font-medium w-full">
                                    <img src="https://tjcoding.sirv.com/website-images/error-circle-fail-failure-disallowed-x-cross-bad-svgrepo-com.png" className="h-9 object-contain rounded-full px-3 p-2 shadow-sm font-medium w-full bg-red-400" />
                                </button>
                            </>
                            :
                            <button className="bg-slate-500 rounded-full px-3 p-2 shadow-sm home-button font-medium text-gray-300" onClick={() => { addToCart() }}>Add To Cart</button>
                }
                <select name="quantity" value={quantity.quantity} className="home-button px-3 p-2 my-3 rounded-full text-center text-blue-200 font-medium hover:cursor-pointer" onChange={changeHandler}>
                    <option value={1} className="bg-black text-white bg-opacity-60 text-center">Quantity: 1</option>
                    <option value={2} className="bg-black text-white bg-opacity-60 text-center">Quantity: 2</option>
                    <option value={3} className="bg-black text-white bg-opacity-60 text-center">Quantity: 3</option>
                    <option value={4} className="bg-black text-white bg-opacity-60 text-center">Quantity: 4</option>
                    <option value={5} className="bg-black text-white bg-opacity-60 text-center">Quantity: 5</option>
                    <option value={6} className="bg-black text-white bg-opacity-60 text-center">Quantity: 6</option>
                    <option value={7} className="bg-black text-white bg-opacity-60 text-center">Quantity: 7</option>
                    <option value={8} className="bg-black text-white bg-opacity-60 text-center">Quantity: 8</option>
                    <option value={9} className="bg-black text-white bg-opacity-60 text-center">Quantity: 9</option>
                    <option value={10} className="bg-black text-white bg-opacity-60 text-center">Quantity: 10</option>

                </select>
            </div>

        </>
    )
}

export default AddToCart;