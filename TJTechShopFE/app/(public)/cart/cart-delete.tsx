"use client"

import { removeProductFromCart } from "@/app/api/cart";
import { CartProductModel } from "@/app/models/cart_product";
import { useRouter } from "next/navigation";

const CartDelete = (cartProduct: CartProductModel) => {
    const router = useRouter();
    const removeCartItem = () => {
        console.log(cartProduct);
        removeProductFromCart(cartProduct.cart_id, cartProduct.product_id).then(() => {
            router.refresh();
        })
    }
    return (
        <>
            <p className="home-button p-2 my-3 rounded-full text-center text-red-200 font-medium hover:cursor-pointer mx-2 px-6" onClick={() => removeCartItem()}>Delete</p>
        </>
    )
}

export default CartDelete;