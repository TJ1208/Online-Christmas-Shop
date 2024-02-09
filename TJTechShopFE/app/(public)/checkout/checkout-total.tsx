import { CartProductModel } from "@/app/models/cart_product";
import CheckoutItem from "./checkout-item";
import Link from "next/link";

const CheckoutTotal = (data: {cartItems: CartProductModel[], orderTotal: {total: any, shippingPrice: any}}) => {
    var cartItems = data.cartItems;
    return (
        <>
            <div className="w-full border-t my-5">


                {
                    cartItems.map(cart => (
                        <Link href={`/cart?user_id=${cartItems[0].cart?.user_id}`} className="flex w-full items-center justify-between shadow-xl btn-hover" key={cart.product?.product_id}>
                            <CheckoutItem {...cart} />
                        </Link>

                    ))
                }
                <div className="flex flex-col gap-5 p-2 font-medium text-white my-5">
                    <div className="w-full flex justify-between items-center">
                        <p>Subtotal:</p>
                        <span>${data.orderTotal.total}</span>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p>Shipping:</p>
                        {
                            parseFloat(data.orderTotal.shippingPrice) > 0
                                ?
                                <p>${data.orderTotal.shippingPrice}</p>
                                :
                                <sup className="text-slate-400 flex">* Calculated At Shipping</sup>
                        }
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <p>Sales Taxes:</p>
                        <span>${(data.orderTotal.total * .0475).toFixed(2)}</span>
                    </div>
                    <div className="w-full flex justify-between items-center border-t pt-5">
                        <p>Total:</p>
                        <span>${(parseFloat(data.orderTotal.total) + parseFloat(data.orderTotal.shippingPrice) + (data.orderTotal.total * .0475)).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutTotal;