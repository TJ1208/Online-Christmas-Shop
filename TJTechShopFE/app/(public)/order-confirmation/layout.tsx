"use server"

import { getTokenClaims } from "../../api/jwt-token";
import { redirect } from "next/navigation";
import ShopLogo from "@/app/components/shop-logo";
import Link from "next/link";
import { Suspense } from "react";
import ProductLoad from "../products/product-load";

async function OrderConfirmationLayout({
    children
}: {
    children: React.ReactNode
}) {
    await getTokenClaims().then((result) => {
        if (!result) {
            redirect('/login');
        }
    })

    return (
        <>


            <Suspense fallback={<ProductLoad />}>
                <div className="mt-5">
                    <Link href="/techshop"><ShopLogo /></Link>
                </div>
                <main className="sm:flex sm:flex-col items-center min-h-screen overflow-hidden">
                    {children}
                </main>
            </Suspense>
        </>

    );
}

export default OrderConfirmationLayout;