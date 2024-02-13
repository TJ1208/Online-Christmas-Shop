import { CartProductModel } from "@/app/models/cart_product";
import { NextRequest, NextResponse } from "next/server";
import { getStripePrices } from "../stripe-price";
import { getTokenClaims } from "../jwt-token";

const stripe = require('stripe')("sk_test_51LkwQ6AvRlTvliZhCLzxAaZzbMcvpFm6gaqJX55mxKdn8QeNXnoRc4ez34obobhhusHaFOUaw7Rww6KxEtTfTECx00SGxxgQAJ");

export async function POST(req: NextRequest, res: NextResponse) {
    const userData = await getTokenClaims();
    const response: CartProductModel[] = await req.json();
    const prices = await getStripePrices();
    var newResponse = [];
    var i = 0
    while (response[i]) {
        newResponse.push({ price: prices.data.find((price: any) => price.product == response[i].product_id.toString()).id, quantity: response[i].quantity });
        i += 1;
    }
    try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            customer_email: userData.sub,
            line_items:
                newResponse
            ,
            automatic_tax: {
                enabled: true,
            },
            mode: 'payment',
            return_url:
                `${req.headers.get("origin")}/order-confirmation?session_id={CHECKOUT_SESSION_ID}&user_info=${userData.sub}`,
        });

        return NextResponse.json(({ clientSecret: session.client_secret }));
    } catch (err: any) {
        console.log(err);
    }
}

export async function GET(req: NextRequest, res: Response) {
    try {
        const session =
            await stripe.checkout.sessions.retrieve(req.nextUrl.searchParams);

        return NextResponse.json(({
            status: session.status,
            customer_email: session.customer_details.email
        })).json();
    } catch (err: any) {
        return NextResponse.json((err.statusCode || 500));
    }
}
