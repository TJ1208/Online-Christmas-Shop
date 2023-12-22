import { notFound } from "next/navigation";
import { ProductModel } from "../models/product";

export const getProduct = async (id: string): Promise<ProductModel> => {
    const response = await fetch(`http://localhost:5000/product/${id}`, {
        next: {
            revalidate: 60
        }
    })

    if (!response.ok) {
        notFound()
    }
    return response.json();
}