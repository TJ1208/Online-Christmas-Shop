import { ShippingMethodModel } from "../models/shipping-method";

export const getAllShippingMethods = async (): Promise<ShippingMethodModel[]> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/shipping_method`, {
        next: {
            revalidate: 0
        }
    });
    const data = response.json();
    return data;
}

export const getShippingMethod = async (name: string): Promise<ShippingMethodModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/shipping_method/${name}`);
    const data = response.json();
    return data;
}

export const getShippingMethodById = async (shipping_id: number): Promise<ShippingMethodModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/shipping_method/id/${shipping_id}`);
    const data = response.json();
    return data;
}

export const addShippingMethod = async (shippingMethod: ShippingMethodModel): Promise<ShippingMethodModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/shipping_method`, {
        method: 'POST',
        body: JSON.stringify(shippingMethod),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}

export const updateShippingMethod = async (shippingMethod: ShippingMethodModel, name: string): Promise<ShippingMethodModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/shipping_method/${name}`, {
        method: 'PUT',
        body: JSON.stringify(shippingMethod),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    const data = response.json();
    return data;
}

export const deleteShippingMethod = async (name: string): Promise<ShippingMethodModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/shipping_method/${name}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
}