import { notFound } from "next/navigation";
import { ProductModel } from "../models/product";
import CategoryModel from "../models/category";
import { ProductImageModel } from "../models/product_image";

export const getAllProducts = async (): Promise<ProductModel[]> => {
    const response = await fetch(`http://localhost:5000/product`, {
        next: {
            revalidate: 0
        }
    })
    const data = await response.json();
    return data;
}

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

export const addProduct = async (product: ProductModel): Promise<ProductModel> => {
    const response = await fetch(`http://localhost:5000/product`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const addProductToImage = async (productImage: ProductImageModel): Promise<ProductImageModel> => {
    const response = await fetch(`http://localhost:5000/product_image`, {
        method: 'POST',
        body: JSON.stringify(productImage),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}

export const deleteProduct = async (id: number): Promise<{message: string, code: number}> => {
    const response = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}