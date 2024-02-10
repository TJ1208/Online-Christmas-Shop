import getUserAddresses from "@/app/api/address";
import getCartByUserId, { GetCartItems, removeProductFromCart } from "@/app/api/cart";
import { addOrder, addProductToOrder, sendOrderReviewEmail } from "@/app/api/order";
import { getUser } from "@/app/api/user";
import Link from "next/link";
import CheckoutItem from "../checkout/checkout-item";
import getDate from "@/app/scripts/get-current-date";
import { getTokenClaims } from "@/app/api/jwt-token";
import { redirect } from "next/navigation";

const OrderConfirmation = async () => {
    const userToken = await getTokenClaims();
    const userData = await getUser(userToken ? userToken.sub : "");
    const address = (await getUserAddresses(userData.user_id || 0)).find(address => address.active == true)
    const cart = await getCartByUserId(userData.user_id?.toString() || "0");
    const cartItems = await GetCartItems(cart.cart_id || 0);
    if (cartItems.length == 0) {
        redirect('/techshop');
    }
    var initialValue: number = 0;
    var shippingAndHandling: number = 0;
    initialValue = parseFloat(cartItems.reduce((total, cartProduct) => total += cartProduct.product!.sale_price > 0 ? cartProduct.product!.sale_price * cartProduct.quantity : cartProduct.product!.price * cartProduct.quantity, initialValue).toFixed(2));
    addOrder({ user_id: userData.user_id || 0, address_id: address?.address_id || 0, shipping_id: 2, total: initialValue, create_time: getDate() }).then((newOrder) => {
        shippingAndHandling = newOrder.shipping_method?.rate || 0;
        cartItems.forEach(cartItem => addProductToOrder({ order_id: newOrder.order_id || 0, product_id: cartItem.product_id, quantity: cartItem.quantity }))
        setTimeout(() => {
            sendOrderReviewEmail(newOrder.order_id || 0).then(() => {
                cartItems.forEach(cartItem => removeProductFromCart(cartItem.cart_id, cartItem.product_id))
            })
        }, 2000)
    })

    return (
        <>
            <div className="sm:w-9/12 text-center lg:w-1/2 mx-5 flex flex-col gap-5 mb-10">
                <p className="text-2xl  border-b m-5 p-5 text-blue-300">Order <span className="text-red-300">Confirmed!</span></p>
                <div className="text-center">
                    <p className="p-1">Thank you for your order, <span className="text-blue-400">{userData?.first_name}!</span></p>
                    <p className="p-1">Please review your order details below.</p>
                </div>
                <div className="gap-5 flex flex-col">
                    {
                        cartItems.map(cartProduct => (
                            <div className="nav-button border" key={cartProduct.product_id}>

                                <CheckoutItem {...cartProduct} />
                            </div>
                        ))
                    }
                </div>
                <div className="font-medium border rounded">
                    <div className="p-3 my-10 flex w-full justify-between">
                        <p className="text-blue-200">Sales Taxes :</p>
                        <p className="text-green-200">${(initialValue * .0475).toFixed(2)}</p>
                    </div>
                    <div className="p-3 my-10 flex w-full justify-between">
                        <p className="text-blue-200">Shipping & Handling :</p>
                        <p className="text-green-200">${shippingAndHandling}</p>
                    </div>
                    <div className="p-3 my-10 flex w-full justify-between">
                        <p className="text-blue-200">Total + Shipping & Handling :</p>
                        <p className="text-green-200">${(initialValue + (initialValue * .0475) + shippingAndHandling).toFixed(2)}</p>
                    </div>
                </div>

                <Link href="/techshop" className="home-button p-3 rounded font-medium">Back To Shop</Link>
            </div>
        </>
    )
}

export default OrderConfirmation;