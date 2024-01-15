const ShopLogo = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="flex">
                    <img src="https://tjcoding.sirv.com/website-images/icons8-t-32.png" alt="Shop Icon" className={`h-8 absolute left-26`} />
                    <img src="https://tjcoding.sirv.com/website-images/icons8-j-32.png" alt="Shop Icon" className={`h-8 pl-8`} />
                </div>
                <p className="space-x-2 text-lg font-semibold"><span className="text-blue-400 opacity-80">Tech</span><span className="text-red-400 opacity-80">Shop</span></p>
            </div>

        </>
    )
}
export default ShopLogo;