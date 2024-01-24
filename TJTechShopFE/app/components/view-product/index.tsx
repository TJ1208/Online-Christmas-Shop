"use client"

import { ProductModel } from "@/app/models/product";
import { useRouter } from "next/navigation";

function ViewProduct(product: ProductModel) {
    const router = useRouter();
    return (
        <>
            <button className="bg-slate-500 rounded p-3 shadow-sm home-button m-3 w-1/2 font-semibold text-gray-300" onClick={() => {
                router.push(`/product?product_id=${product.product_id}`)
            }}>View Product</button>
        </>
    )
}

export default ViewProduct;