import { ProductModel } from "@/app/models/product";
import Link from "next/link";

function ProductCard(product: ProductModel) {
    return (
        <>
            <Link href={`/product?product_id=${product.product_id}`} className="lg:flex-col hover:cursor-pointer hover:bg-gray-800 hover:transition-all flex shadow-xl bg-slate-900 bg-opacity-10 items-center justify-between rounded w-full p-5" key={product.product_id}>

                <img src={product.images![0].url} className="object-contain w-40 lg:min-w-[200px] lg:max-w-[200px] 2xl:min-w-[250px] 2xl:max-w-[250px] lg:min-h-[300px] lg:max-h-[300px]" />
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
        </>
    )
}

export default ProductCard;