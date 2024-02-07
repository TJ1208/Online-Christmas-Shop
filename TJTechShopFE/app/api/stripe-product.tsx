import { ProductModel } from "../models/product";

const stripe = require('stripe')('sk_test_51LkwQ6AvRlTvliZhCLzxAaZzbMcvpFm6gaqJX55mxKdn8QeNXnoRc4ez34obobhhusHaFOUaw7Rww6KxEtTfTECx00SGxxgQAJ');

export const addStripeProduct = async (product: ProductModel) => {
    const stripeProduct = await stripe.products.create({
        id: product.product_id,
        name: product.name,
        description: product.description,
        active: true,
        url: `https://tjtechbe.tcjcoding.com/product?product_id=${product.product_id}`,
        images: product.images?.map(product => product.url)
    });
}

export const getStripeProduct = async (product_id: string): Promise<any> => {
    const stripeProduct = await stripe.products.retrieve(`${product_id}`);
    return stripeProduct;
}