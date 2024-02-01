import { getProduct } from "@/app/api/product";
import { CartProductModel } from "@/app/models/cart_product";
import CartQuantity from "./cart-quantity";
import CartDelete from "./cart-delete";
import Link from "next/link";

const CartItem = async (cartProduct: CartProductModel) => {
    const product = await getProduct(cartProduct.product_id?.toString() || "0");

    return (
        <>
            <div className="w-full flex flex-col">
                <div className="m-5 flex">
                    <Link href={`/product?product_id=${product.product_id}`} className="hover:opacity-80 hover:transition-all">
                        <img src={product.images ? product.images[0].url : ""} alt="Product Image" className="object-contain h-40" />
                    </Link>
                    <div>
                        <div className="flex items-center justify-between flex-col pl-5">
                            <p className="text-gray-200 font-medium">{product.name}</p>
                            <p className=" w-full mt-5 text-blue-300 font-semibold rounded">{product.brand?.name} | {product.sub_category?.name.endsWith("s") ? product.sub_category?.name : product.sub_category?.name + "s"}</p>
                        </div>
                        <div className="flex mx-5 my-5">
                            <CartQuantity {...cartProduct} />
                            <CartDelete {...cartProduct} />
                        </div>
                    </div>
                </div>
                {
                    product.sale_price > 0
                        ?
                        <div className="flex w-full justify-end pr-5">
                            <p className="rounded font-light m-2 italic text-green-200">${product.sale_price}</p>
                            <p className="rounded font-light m-2 my-1 line-through italic text-red-200">${product.price}</p>
                        </div>
                        :
                        <div className="flex w-full justify-end pr-5">
                            <p className="rounded font-light m-2 italic text-green-200">${product.price}</p>
                        </div>
                }
            </div>
        </>
    )
}

export default CartItem;