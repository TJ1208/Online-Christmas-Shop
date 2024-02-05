import { CartProductModel } from "@/app/models/cart_product";
import Link from "next/link";

const CheckoutNavbar = (data: {cartItems: CartProductModel[], currentPage: string}) => {
    const cartItems = data.cartItems;
    return (
        <>
            <Link href={`/cart?user_id=${cartItems[0].cart?.user_id}`} className={`border-b ${data.currentPage == "cart" ? "p-2 m-1 rounded" : "nav-button"}`}><sub>Cart</sub></Link>
            <Link href={`/cart?user_id=${cartItems[0].cart?.user_id}`} className={`border-b ${data.currentPage == "checkout" ? "p-2 m-1 rounded" : "nav-button"}`}><sub>Shipping</sub></Link>
            <Link href={`/cart?user_id=${cartItems[0].cart?.user_id}`} className={`border-b ${data.currentPage == "payment" ? "p-2 m-1 rounded" : "nav-button"}`}><sub>Payment</sub></Link>
            <Link href={`/cart?user_id=${cartItems[0].cart?.user_id}`} className={`border-b ${data.currentPage == "review" ? "p-2 m-1 rounded" : "nav-button"}`}><sub>Review</sub></Link>
        </>
    )
}

export default CheckoutNavbar;