"use client"

import { useRouter } from "next/navigation"

function ProductFilter(productData: { url: string, name: string }) {
    const router = useRouter();
    return (
        <>
            <div onClick={() => router.push(`/product?name=${productData.name}`)}>
                <img src={productData.url} alt="Category Image" className="object-contain w-full min-h-[250px] max-h-[250px]" />
                <p className="text-semibold md:text-xl text-blue-200 font-semibold italic text-md">{productData.name}</p>
            </div>

        </>
    )
}

export default ProductFilter