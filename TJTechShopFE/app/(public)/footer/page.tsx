import getAllCategories from "@/app/api/category";
import ShopLogo from "@/app/components/shop-logo";
import Image from "next/image";
import Link from "next/link";

const Footer = async () => {
    const categories = await getAllCategories();
    return (
        <>
            <div>
                <div className="w-full lg:flex justify-evenly sm:text-sm text-gray-200 border-t border-slate-300 py-10 text-center">
                    <div className="flex flex-col items-center my-5">
                        <p className="underline underline-offset-4 mb-5">About</p>
                        <div className="flex">
                            <Link href="/techshop" className="nav-button border">Tech Shop</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center my-5">
                        <p className="underline underline-offset-4 mb-5">Products</p>
                        <div className="lg:flex grid grid-cols-2 flex-col gap-3">
                            {
                                categories.map(category => (
                                    <Link href={`/products?category_id=${category.category_id}`} className="nav-button border" key={category.category_id}>{category.name}</Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col items-center my-5">
                        <p className="underline underline-offset-4 mb-5">Socials</p>
                        <div className="lg:flex grid grid-cols-2 flex-col gap-3">
                            <div className="flex items-center justify-between bg-white rounded btn-hover hover:cursor-pointer m-2">
                                <p className="text-black p-2 font-semibold">Twitter</p>
                                <a href="https://twitter.com/TJoostema71515"><Image src="https://tjcoding.sirv.com/website-images/icons8-twitterx.svg" alt="Twitter Logo" width={30} height={30} /></a>
                            </div>
                            <div className="flex items-center justify-between bg-white rounded btn-hover hover:cursor-pointer m-2">
                                <p className="text-black p-2 font-semibold">Facebook</p>
                                <a href="https://www.facebook.com/taylor.joostema.7"><Image src="https://tjcoding.sirv.com/website-images/icons8-facebook.svg" alt="Facebook Logo" width={30} height={30} /></a>
                            </div>
                            <div className="flex items-center justify-between bg-white rounded btn-hover hover:cursor-pointer m-2">
                                <p className="text-black p-2 font-semibold">GitHub</p>
                                <a href="https://github.com/TJ1208"><Image src="https://tjcoding.sirv.com/website-images/icons8-github.svg" alt="Github Logo" width={30} height={30} /></a>
                            </div>
                            <div className="flex items-center justify-between bg-white rounded btn-hover hover:cursor-pointer m-2">
                                <p className="text-black p-2 font-semibold">LinkedIn</p>
                                <a href="https://www.linkedin.com/in/taylor-joostema-26ba66244/"><Image src="https://tjcoding.sirv.com/website-images/icons8-linkedin.svg" alt="LinkedIn Logo" width={30} height={30} /></a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center my-5">
                        <p className="underline underline-offset-4 mb-5">Customer Support</p>
                        <div className="flex flex-col gap-3">
                            <p className="nav-button border">Phone #: 919-339-3801</p>
                            <p className="nav-button border">Email: TaylorJ1208@yahoo.com</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center my-5">
                    <ShopLogo />
                </div>
            </div>

        </>

    )
}

export default Footer;