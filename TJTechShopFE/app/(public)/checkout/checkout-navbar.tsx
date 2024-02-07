import { CartProductModel } from "@/app/models/cart_product";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CheckoutNavbar = (data: { cartItems: CartProductModel[], currentPage: string }) => {
    const router = useRouter();
    const cartItems = data.cartItems;
    return (
        <>
            <Link href={`/cart?user_id=${cartItems[0].cart?.user_id}`} className={`border-b ${data.currentPage == "cart" ? "p-2 m-1 rounded" : "nav-button"}`}><sub>Cart</sub></Link>
            <a href={`/checkout${data.currentPage.replace("&payment=true", "").replace("&review=true", "")}`} className={`border-b ${data.currentPage.includes("cart_id") && !(data.currentPage.includes("payment") || data.currentPage.includes("review")) ? "p-2 m-1 rounded" : "nav-button"}`} onClick={() => router.refresh()}><sub>Shipping</sub></a>
            {
                data.currentPage.includes("payment=true")
                    ?
                    <Link href={`/checkout${data.currentPage.replace("&payment=true", "").concat("&review=true")}`} className={`border-b ${data.currentPage.includes("review") ? "p-2 m-1 rounded" : "nav-button"}`} ><sub>Review</sub></Link>
                    :
                    <p className={`border-b ${data.currentPage.includes("review") ? "p-2 m-1 rounded" : "nav-button hover:cursor-default"}`}><sub>Review</sub></p>
            }
            <p className={`border-b ${data.currentPage.includes("payment") ? "p-2 m-1 rounded" : "nav-button hover:cursor-default"}`}><sub>Payment</sub></p>
        </>
    )
}

export default CheckoutNavbar;