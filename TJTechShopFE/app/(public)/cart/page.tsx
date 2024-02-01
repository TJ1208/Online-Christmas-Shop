import CartItems from "./cart-items";
import Checkout from "./checkout";

const Cart = () => {
    return (
        <>
            <div className="lg:hidden flex flex-col container">
                <CartItems />
                <Checkout />
            </div>
            <div className="lg:flex hidden container">
                <CartItems />
                <Checkout />
            </div>
        </>
    )
}

export default Cart;