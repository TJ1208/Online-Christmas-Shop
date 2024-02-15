import { OrderModel } from "../models/order";
import { OrderProductModel } from "../models/order_product";

export const getAllOrders = async (): Promise<OrderModel[]> => {
    const response = fetch(`http://localhost:5000/order`, {
        next: {
            revalidate: 0
        }
    });
    const data = (await response).json();
    return data;
}

export const getOrder = async (order_id: number): Promise<OrderModel> => {
    const response = fetch(`http://localhost:5000/order/${order_id}`)
    const data = (await response).json();
    return data;
}

export const getOrderProduct = async (order_id: number, product_id: number): Promise<OrderProductModel> => {
    const response = await fetch(`http://localhost:5000/order_product/${order_id}/${product_id}`);
    return response.json();
}

export const getOrderProductByProduct = async (product_id: number): Promise<OrderProductModel[]> => {
    const response = await fetch(`http://localhost:5000/order_product/product/${product_id}`);
    return response.json();
}

export const getAllOrderProducts = async (): Promise<OrderProductModel[]> => {
    const response = await fetch(`http://localhost:5000/order_product`);
    return response.json();
}

export const addOrder = async (order: OrderModel): Promise<OrderModel> => {
    const response = await fetch(`http://localhost:5000/order`, {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const sendOrderReviewEmail = async (order_id: number): Promise<any> => {
    const response = await fetch(`http://localhost:5000/order/${order_id}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const updateOrder = async (order: OrderModel): Promise<OrderModel> => {
    const response = await fetch(`http://localhost:5000/order/${order.order_id}`, {
        method: 'PUT',
        body: JSON.stringify(order),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const addProductToOrder = async (orderToProduct: OrderProductModel): Promise<OrderProductModel> => {
    const response = await fetch(`http://localhost:5000/order_product`, {
        method: 'POST',
        body: JSON.stringify(orderToProduct),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}