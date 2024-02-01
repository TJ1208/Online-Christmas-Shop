"use client"

import { updateProductToCart } from "@/app/api/cart";
import { CartProductModel } from "@/app/models/cart_product";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

const CartQuantity = (cartProduct: CartProductModel) => {
    const router = useRouter();
    const [quantity, setQuantity] = useState(cartProduct.quantity);

    const changeHandler = (event: ChangeEvent<any>) => {
        setQuantity(event.target.value);
        updateProductToCart({ cart_id: cartProduct.cart_id!, product_id: cartProduct.product_id!, quantity: event.target.value }, cartProduct.cart_id!, cartProduct.product_id!)
            .then(() => router.refresh());
    }
    return (
        <>
            <select name="quantity" value={quantity} className="home-button px-3 p-2 my-3 rounded-full text-center text-blue-200 font-medium hover:cursor-pointer" onChange={changeHandler}>
                <option value={1} className="bg-black text-white bg-opacity-60 text-center">Qty: 1</option>
                <option value={2} className="bg-black text-white bg-opacity-60 text-center">Qty: 2</option>
                <option value={3} className="bg-black text-white bg-opacity-60 text-center">Qty: 3</option>
                <option value={4} className="bg-black text-white bg-opacity-60 text-center">Qty: 4</option>
                <option value={5} className="bg-black text-white bg-opacity-60 text-center">Qty: 5</option>
                <option value={6} className="bg-black text-white bg-opacity-60 text-center">Qty: 6</option>
                <option value={7} className="bg-black text-white bg-opacity-60 text-center">Qty: 7</option>
                <option value={8} className="bg-black text-white bg-opacity-60 text-center">Qty: 8</option>
                <option value={9} className="bg-black text-white bg-opacity-60 text-center">Qty: 9</option>
                <option value={10} className="bg-black text-white bg-opacity-60 text-center">Qty: 10</option>

            </select>
        </>
    )
}

export default CartQuantity;