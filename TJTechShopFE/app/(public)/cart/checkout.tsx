const Checkout = () => {
    return (
        <>
            <div className="lg:hidden w-full flex items-center justify-center my-16 flex-col gap-10">
                <p className="checkout-button rounded-full p-3 text-center mx-5 font-semibold text-md w-1/2">Proceed To Checkout</p>
            </div>
            <div className="lg:flex hidden items-center justify-between flex-col my-5 w-1/2 shadow-xl h-fit">
                <p className=" w-full px-3 text-lg italic text-slate-400 font-semibold underline underline-offset-8 my-5">Checkout</p>
                <p className="checkout-button rounded-full p-3 text-center mx-5 font-semibold text-md w-1/2 my-5">Checkout</p>

            </div>
        </>
    )
}

export default Checkout;