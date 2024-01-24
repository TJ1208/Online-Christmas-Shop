"use client"

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCategoryById } from "@/app/api/category";
import { getAllProducts } from "@/app/api/product";
import { useEffect, useState } from "react";
import { ProductModel } from "@/app/models/product";
import CategoryModel from "@/app/models/category";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function ProductsPage() {
    const router = useRouter();
    const path = usePathname();
    const params = useSearchParams();
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [category, setCategory] = useState<CategoryModel>();
    const [categoryId, setCategoryId] = useState<string>("");
    const [brandId, setBrandId] = useState<string>("");
    const [onSale, setOnSale] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    if (categoryId != params.get("category_id") && params.get("category_id")) {
        setCategoryId(params.get("category_id") || "");
    }

    if (brandId != params.get("brand_id") && params.get("brand_id")) {
        setBrandId(params.get("brand_id") || "");
    }

    if (onSale != params.get("on_sale") && params.get("on_sale")) {
        setOnSale(params.get("on_sale") || "");
    }


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setCategoryId(params.get("category_id") || "");
            setBrandId(params.get("brand_id") || "");
            setOnSale(params.get("on_sale") || "");
            const products = await getAllProducts();
            setProducts(products);
            const category = await getCategoryById(categoryId);
            setCategory(category);
            setIsLoading(false);

        }
        fetchData()
    }, [categoryId, brandId, onSale])

    return (
        <>
            {
                isLoading
                    ?
                    <div className="w-full min-h-screen items-center justify-center text-center">
                        <FontAwesomeIcon icon={faCircleNotch} spin className="min-h-screen md:w-16 w-10 flex items-center justify-center" />
                    </div>
                    :
                    <div className="flex m-5">


                        <div className="lg:flex hidden w-96 border-r rounded border-blue-200 my-5">
                            <div className="nav-button h-fit">
                                <label>On Sale</label>
                                <input type="checkbox"  value={document.getElementById("onSale")?.getAttribute("checked") ? "true" : "false"} id="onSale" className="mx-2" onClick={() => {
                                    var checkbox = document.getElementById("onSale")?.nodeValue;
                                    console.log(checkbox);
                                    // checkbox!.addEventListener("change", () => {
                                    //     if (checkbox?.ariaChecked) {
                                    //         console.log("hey!");
                                    //         var newPath = path.includes("on_sale") ? path.replace("on_sale=false", "on_sale=true") : path.concat("on_sale=true");
                                    //         router.replace(newPath);
                                    //     } else {
                                    //         console.log("ho!");
                                    //         // router.push(`/products?`)
                                    //     }
                                    // })
                                }}/>
                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="lg:grid lg:grid-cols-4 lg:grid-flow-row xl:grid-cols-5 p-10 justify-center">
                            {
                                categoryId != ""
                                    ?
                                    category?.sub_categories?.map(sub_category => products.filter(product => product.category_id == sub_category.id).map(product => (
                                        <Link href={`/product?product_id=${product.product_id}`} className="lg:flex-col hover:cursor-pointer hover:bg-gray-800 hover:transition-all flex shadow-xl bg-slate-900 bg-opacity-10 items-center justify-between rounded w-full p-5" key={product.product_id}>

                                            <img src={product.images![0].url} className="object-contain w-40 lg:min-w-[200px] lg:max-w-[200px] 2xl:min-w-[300px] 2xl:max-w-[300px] lg:min-h-[300px] lg:max-h-[300px]" />
                                            <div className="w-full flex flex-col justify-between h-full">
                                                <div className="flex items-center">
                                                    <p className="rounded px-3 py-3 underline-offset-8 underline text-blue-300 font-normal">{product.brand?.name}</p>
                                                    {
                                                        product.sale_price > 0
                                                            ?
                                                            <p className="lg:flex hidden rounded font-light text-sm text-red-200 italic shadow-sm shadow-red-50 h-fit p-1 ">-{100 - Math.round(((product.sale_price / product.price * 100)))}%</p>
                                                            :
                                                            <>
                                                            </>
                                                    }
                                                </div>
                                                <p className="rounded px-3">{product.name}</p>
                                                {
                                                    product.sale_price > 0
                                                        ?
                                                        <div className="flex justify-between">
                                                            <div className="flex">

                                                                <p className="rounded font-light md:text-lg text-lg m-2 italic text-green-200">${product.sale_price}</p>
                                                                <p className="rounded font-light md:text-lg m-2 line-through italic text-red-200">${product.price}</p>
                                                            </div>
                                                            <p className="lg:hidden rounded font-light text-sm text-red-200 italic shadow-sm shadow-red-50 h-fit p-1 my-2">-{100 - Math.round(((product.sale_price / product.price * 100)))}%</p>
                                                        </div>
                                                        :
                                                        <p className="rounded font-light md:text-lg text-lg m-2 italic text-green-200">${product.price}</p>
                                                }

                                            </div>
                                        </Link>
                                    )))
                                    :
                                    <>
                                    </>
                            }
                            {
                                brandId != ""
                                    ?
                                    products.filter(product => product.brand_id == parseInt(brandId)).map(product => (
                                        <Link href={`/product?product_id=${product.product_id}`} className="lg:flex-col hover:cursor-pointer hover:bg-gray-800 hover:transition-all flex shadow-xl bg-slate-900 bg-opacity-10 items-center justify-between rounded w-full p-5" key={product.product_id}>

                                            <img src={product.images![0].url} className="object-contain w-40 lg:min-w-[200px] lg:max-w-[200px] 2xl:min-w-[300px] 2xl:max-w-[300px] lg:min-h-[300px] lg:max-h-[300px]" />
                                            <div className="w-full flex flex-col justify-between h-full">
                                                <div className="flex items-center">
                                                    <p className="rounded px-3 py-3 underline-offset-8 underline text-blue-300 font-normal">{product.brand?.name}</p>
                                                    {
                                                        product.sale_price > 0
                                                            ?
                                                            <p className="lg:flex hidden rounded font-light text-sm text-red-200 italic shadow-sm shadow-red-50 h-fit p-1 ">-{100 - Math.round(((product.sale_price / product.price * 100)))}%</p>
                                                            :
                                                            <>
                                                            </>
                                                    }
                                                </div>
                                                <p className="rounded px-3">{product.name}</p>
                                                {
                                                    product.sale_price > 0
                                                        ?
                                                        <div className="flex justify-between">
                                                            <div className="flex">

                                                                <p className="rounded font-light md:text-lg text-lg m-2 italic text-green-200">${product.sale_price}</p>
                                                                <p className="rounded font-light md:text-lg m-2 line-through italic text-red-200">${product.price}</p>
                                                            </div>
                                                            <p className="lg:hidden rounded font-light text-sm text-red-200 italic shadow-sm shadow-red-50 h-fit p-1 my-2">-{100 - Math.round(((product.sale_price / product.price * 100)))}%</p>
                                                        </div>
                                                        :
                                                        <p className="rounded font-light md:text-lg text-lg m-2 italic text-green-200">${product.price}</p>
                                                }

                                            </div>
                                        </Link>
                                    ))
                                    :
                                    <>
                                    </>
                            }
                            {
                                onSale != ""
                                    ?
                                    products.filter(product => product.sale_price > 0).map(product => (
                                        <Link href={`/product?product_id=${product.product_id}`} className="lg:flex-col hover:cursor-pointer hover:bg-gray-800 hover:transition-all flex shadow-xl bg-slate-900 bg-opacity-10 items-center justify-between rounded w-full p-5" key={product.product_id}>

                                            <img src={product.images![0].url} className="object-contain w-40 lg:min-w-[200px] lg:max-w-[200px] 2xl:min-w-[300px] 2xl:max-w-[300px] lg:min-h-[300px] lg:max-h-[300px]" />
                                            <div className="w-full flex flex-col justify-between h-full">
                                                <div className="flex items-center">
                                                    <p className="rounded px-3 py-3 underline-offset-8 underline text-blue-300 font-normal">{product.brand?.name}</p>
                                                    {
                                                        product.sale_price > 0
                                                            ?
                                                            <p className="lg:flex hidden rounded font-light text-sm text-red-200 italic shadow-sm shadow-red-50 h-fit p-1 ">-{100 - Math.round(((product.sale_price / product.price * 100)))}%</p>
                                                            :
                                                            <>
                                                            </>
                                                    }
                                                </div>
                                                <p className="rounded px-3">{product.name}</p>
                                                <div className="flex justify-between">
                                                    <div className="flex">

                                                        <p className="rounded font-light md:text-lg text-lg m-2 italic text-green-200">${product.sale_price}</p>
                                                        <p className="rounded font-light md:text-lg m-2 line-through italic text-red-200">${product.price}</p>
                                                    </div>
                                                    <p className="lg:hidden rounded font-light text-sm text-red-200 italic shadow-sm shadow-red-50 h-fit p-1 my-2">-{100 - Math.round(((product.sale_price / product.price * 100)))}%</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                    :
                                    <>
                                    </>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default ProductsPage;