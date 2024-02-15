import { CartModel } from "../models/cart";
import { CartProductModel } from "../models/cart_product";

export const getCartByUserId = async (id: string): Promise<CartModel> => {
    const response = await fetch(`http://localhost:5000/cart/${id}`)
    const data = await response.json();
    return data;
}

export const addCart = async (cart: CartModel): Promise<CartModel> => {
    const response = await fetch(`http://localhost:5000/cart`, {
        method: 'POST',
        body: JSON.stringify(cart),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const GetCartItems = async (cart_id: number): Promise<CartProductModel[]> => {
    const response = await fetch(`http://localhost:5000/cart_product/${cart_id}`, {
        next: {
            revalidate: 0
        }
    })
    const data = await response.json();
    return data;
}

export const addProductToCart = async (cartProduct: CartProductModel, cart_id: number): Promise<CartProductModel> => {
    const response = await fetch(`http://localhost:5000/cart_product/${cart_id}`, {
        method: 'POST',
        body: JSON.stringify(cartProduct),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const updateProductToCart = async (cartProduct: CartProductModel, cart_id: number, product_id: number): Promise<CartProductModel> => {
    const response = await fetch(`http://localhost:5000/cart_product/${cart_id}/${product_id}`, {
        method: 'PUT',
        body: JSON.stringify(cartProduct),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}

export const removeProductFromCart = async (cart_id: number, product_id: number): Promise<CartModel> => {
    const response = await fetch(`http://localhost:5000/cart_product/${cart_id}/${product_id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}

export default getCartByUserId;