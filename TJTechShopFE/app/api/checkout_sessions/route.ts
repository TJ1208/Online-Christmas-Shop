import { CartProductModel } from "@/app/models/cart_product";
import { NextRequest, NextResponse } from "next/server";
import { getStripePrices } from "../stripe-price";
import { getTokenClaims } from "../jwt-token";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
    const userData = await getTokenClaims();
    const response: CartProductModel[] = await req.json();
    const prices = await getStripePrices();
    console.log(prices);
    var newResponse = [];
    var i = 0
    var j = 0
    while (response[i]) {
        while (prices.data[j]) {
            if (prices.data[j].product == response[i].product_id.toString()) {
                newResponse.push({ price: prices.data[j].id, quantity: response[i].quantity })
            }
            j += 1;
        }
        i += 1;
        j = 0;
    }
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            customer_email: userData.sub,
            line_items: 
                newResponse
            ,
            mode: 'payment',
            return_url:
                `${req.headers.get("origin")}/techshop?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json(({ clientSecret: session.client_secret }));
    } catch (err: any) {
        // console.log(err);
        console.log(newResponse);
        // res.status(err.statusCode || 500).json(err.message);
    }
}

export async function GET(req: NextRequest, res: Response) {
    try {
        const session =
            await stripe.checkout.sessions.retrieve(req.nextUrl.searchParams.get("session_id"));

        return NextResponse.json(({
            status: session.status,
            customer_email: session.customer_details.email
        })).json();
    } catch (err: any) {
        return NextResponse.json((err.statusCode || 500).json(err.message));
    }
}
