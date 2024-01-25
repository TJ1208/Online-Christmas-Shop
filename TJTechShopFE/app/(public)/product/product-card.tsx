import { getProduct } from "@/app/api/product";
import AddToCart from "@/app/components/add-to-cart";
import ImageCarousel from "@/app/components/image-carousel";

async function ProductCard(productId: { params: {}, searchParams: { product_id: string } }) {
    const product = await getProduct(productId.searchParams.product_id);
    return (
        <>
            <div className="flex shadow-xl bg-slate-900 bg-opacity-10 items-center justify-between rounded w-full p-5 " key={product.product_id}>

                <div className="w-full flex flex-col justify-between h-full">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center w-full">
                            <div className="my-3 flex flex-col text-left w-full">
                                <p className="rounded px-3 py-3 underline-offset-8 underline text-blue-300 font-normal text-left w-full">{product.brand?.name}</p>
                                <div className="flex items-center">
                                    <p className="rounded px-3 text-left w-full">{product.name}</p>
                                    {
                                        product.sale_price > 0
                                            ?
                                            <p className="rounded text-sm text-black font-semibold bg-red-400 italic shadow-md shadow-red-400 h-fit p-1 m-2 whitespace-nowrap">On Sale</p>
                                            :
                                            <></>
                                    }
                                </div>
                            </div>
                            <div className="w-96">
                                <ImageCarousel images={product.images!} />
                            </div>
                        </div>
                    </div>
                    {
                        product.sale_price > 0
                            ?
                            <div className="flex justify-between w-full p-1 items-center">
                                <AddToCart {...product} />
                                <div className="flex w-full justify-end">
                                    <p className="rounded font-light md:text-lg text-lg m-2 italic text-green-200">${product.sale_price}</p>
                                    <p className="rounded font-light md:text-lg m-2 line-through italic text-red-200">${product.price}</p>
                                </div>
                                <p className="rounded font-light text-sm text-red-200 italic shadow-sm shadow-red-50 h-fit p-1 m-2">-{100 - Math.round(((product.sale_price / product.price * 100)))}%</p>
                            </div>

                            :
                            <div className="flex">
                                <AddToCart {...product} />
                                <p className="text-right w-full my-5 rounded font-light md:text-lg text-lg italic text-green-200">${product.price}</p>
                            </div>
                    }
                    <p className="rounded mx-8 mb-5 underline-offset-8 underline text-red-200 font-normal text-left w-full">About Product</p>
                    <p className="rounded px-10 text-left w-full">{product.description}</p>
                </div>
            </div>
        </>
    )
}

export default ProductCard;