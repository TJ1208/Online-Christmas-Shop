import { notFound } from "next/navigation";
import { ProductModel } from "../models/product";
import { ProductImageModel } from "../models/product_image";

export const getAllProducts = async (): Promise<ProductModel[]> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/product`, {
        next: {
            revalidate: 0
        }
    })
    const data = await response.json();
    return data;
}

export const getProduct = async (id: string): Promise<ProductModel> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/product/${id}`, {
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
    const response = await fetch(`https://techspecbe.azurewebsites.net/product`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const addProductToImage = async (productImage: ProductImageModel): Promise<ProductImageModel> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/product_image`, {
        method: 'POST',
        body: JSON.stringify(productImage),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}

export const deleteProductToImage = async(productId: number, imageId: number): Promise<string> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/product_image/${productId}/${imageId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}


export const updateProduct = async (product: ProductModel, id: number): Promise<ProductModel> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/product/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}

export const deleteProduct = async (id: number): Promise<{message: string, code: number}> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/product/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}