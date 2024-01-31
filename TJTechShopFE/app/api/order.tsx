import { OrderModel } from "../models/order";
import { OrderProductModel } from "../models/order_product";

export const getAllOrders = async (): Promise<OrderModel[]> => {
    const response = fetch(`https://tjtechbe.tcjcoding.com/order`, {
        next: {
            revalidate: 0
        }
    });
    const data = (await response).json();
    return data;
}

export const getOrderProduct = async (order_id: number, product_id: number): Promise<OrderProductModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/order_product/${order_id}/${product_id}`);
    return response.json();
}

export const getAllOrderProducts = async (): Promise<OrderProductModel[]> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/order_product`);
    return response.json();
}

export const addOrder = async (order: OrderModel): Promise<OrderModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/order`, {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const updateOrder = async (order: OrderModel): Promise<OrderModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/order/${order.order_id}`, {
        method: 'PUT',
        body: JSON.stringify(order),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const addProductToOrder = async (orderToProduct: OrderProductModel): Promise<OrderProductModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/order_product`, {
        method: 'POST',
        body: JSON.stringify(orderToProduct),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}