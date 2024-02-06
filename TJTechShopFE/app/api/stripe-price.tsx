import { ProductModel } from "../models/product";

const stripe = require('stripe')('sk_test_51LkwQ6AvRlTvliZhCLzxAaZzbMcvpFm6gaqJX55mxKdn8QeNXnoRc4ez34obobhhusHaFOUaw7Rww6KxEtTfTECx00SGxxgQAJ');

export const getStripePrices = async (): Promise<any> => {
    const prices = await stripe.prices.list({
        limit: 20,
    });
    return prices;
}

const addStripePrice = async (product: ProductModel) => {
    const stripePrice = await stripe.prices.create({
        currency: "usd",
        billing_scheme: "per_unit",
        product: product.product_id,
        unit_amount_decimal: product.sale_price > 0 ? product.sale_price : product.price,
        active: true,
    });
}

export default addStripePrice;
