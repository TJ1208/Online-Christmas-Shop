"use client"

import CategoryModel from "@/app/models/category";
import { useRouter } from "next/navigation"

function ProductFilter(category: CategoryModel) {
    const router = useRouter();
    return (
        <>
            <div onClick={() => router.push(`/products?category_id=${category.category_id}`)}>
                <img src={category.image?.url || ""} alt="Category Image" className="object-contain w-full min-h-[250px] max-h-[250px]" />
                <p className="text-semibold md:text-xl text-blue-200 font-semibold italic text-md">{category.name}</p>
            </div>

        </>
    )
}

export default ProductFilter