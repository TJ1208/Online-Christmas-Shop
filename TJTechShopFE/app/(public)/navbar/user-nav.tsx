import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import SideMenu from "../../components/side-menu"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import CategoryModel from "../../models/category"
import Link from "next/link"
import ShopLogo from "../../components/shop-logo"
import UserDropdown from "./user-dropdown"
import ProductSearch from "../../components/product-search"
import { BrandModel } from "@/app/models/brand"
import getCartByUserId from "@/app/api/cart"
import { getUser } from "@/app/api/user"

async function UserNavBar(data: { userData: any, categories: CategoryModel[], brands: BrandModel[] }) {
    const userData = data.userData;
    const user = await getUser(data.userData.sub);
    const userCart = await getCartByUserId(user.user_id!.toString());

    return (

        <>
            <div className="w-full">


                <div className="lg:flex w-full md:justify-between justify-center font-bold">
                    <div className="flex flex-col w-full">
                        <div className="justify-evenly w-full text-center pb-1 hidden lg:flex">
                            <div className="relative inline-block dropdown hover:border-b border-blue-300">
                                <div className="flex btn-hover">
                                    <button className="py-2 my-1 text-blue-300" id="popup-category">Categories</button>
                                    <img src="https://tjcoding.sirv.com/website-images/icons8-category-48.png" alt="Category Carrot text-white bg-white" className="h-5 my-5 " />
                                </div>
                                <div className="absolute hidden dropdown-content bg-black bg-opacity-50">

                                    <div className="grid grid-flow-col grid-rows-3">
                                        {
                                            data.categories.map(category =>
                                                <Link className="dropdown-button"
                                                    href={`/products?category_id=${category.category_id}`} key={category.category_id}>{category.name}</Link>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="btn-hover rounded truncate items-center flex justify-center p-0 m-0">
                                <Link href={`/products?on_sale=${true}`} className="py-2 my-1 text-yellow-500">Flash Sales</Link>
                                <img src="https://tjcoding.sirv.com/website-images/sparkling.png" alt="Flash Sale Symbol" className="h-5" />
                            </div>
                            <div className="btn-hover rounded truncate items-center flex justify-center p-0 m-0">
                                <button className="py-2 my-1 text-red-300">New Items</button>
                                <img src="https://tjcoding.sirv.com/website-images/icons8-new-item-100.png" alt="New Item SVG" className="h-8" />
                            </div>
                            <div className="relative inline-block dropdown hover:border-b border-red-400">
                                <div className="flex btn-hover">
                                    <button className="py-2 my-1 text-red-400" id="popup-category">Top Brands</button>
                                    <img src="https://tjcoding.sirv.com/website-images/icons8-brand-100.png" alt="Top Brands SVG" className="h-5 my-5" />
                                </div>
                                <div className="absolute hidden dropdown-content bg-black bg-opacity-50">

                                    <div className="grid grid-flow-col grid-rows-5">
                                        {
                                            data.brands.map(brand => (
                                                <Link className="dropdown-button" href={`/products?brand_id=${brand.brand_id}`} key={brand.brand_id}>{brand.name}</Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="items-center justify-center w-full pb-1 lg:hidden flex flex-col">

                        <div className="flex items-center rounded w-full justify-center">
                            <div className="flex items-center rounded w-full justify-start">
                                <div className="">
                                    <SideMenu {...userData} />
                                </div>
                            </div>
                            <Link href="/techshop" className="flex items-center rounded w-full justify-center mt-2">
                                <ShopLogo />
                            </Link>
                            <div className="flex items-center rounded w-full justify-end p-2">
                                <ProductSearch />
                                <li className="btn-hover px-3">
                                    <div className={`relative inline-block`}>
                                        <UserDropdown {...userData} />
                                    </div>
                                </li>
                                <li className=" btn-hover p-1 m-1">
                                    <Link href={`/cart?user_id=${user.user_id}`} className="flex items-center justify-center">
                                        <p className="px-3 font-semibold text-green-200 text-md mx-2 rounded-full border border-gray-700">{userCart?.products!.length}</p>
                                        <p className="p-1">
                                            <FontAwesomeIcon icon={faCartShopping} className="h-5" />
                                        </p>
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </div>
                    <div className="items-center justify-center w-96 pb-1 hidden lg:flex">
                        <ProductSearch />
                        <li>
                            <div className="relative inline-block dropdown items-center justify-center p-1 m-1 ml-5">
                                <UserDropdown {...userData} />
                            </div>
                        </li>
                        <li className=" btn-hover p-1 m-1 ml-5">
                            <Link href={`/cart?user_id=${user.user_id}`} className="flex items-center justify-center">
                                <p className="px-3 font-semibold text-green-200 text-lg mx-2 rounded-full border border-gray-700">{userCart?.products!.length}</p>
                                <p className="p-1">
                                    <FontAwesomeIcon icon={faCartShopping} className="h-5" />
                                </p>
                            </Link>
                        </li>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserNavBar;