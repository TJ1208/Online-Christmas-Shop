"use server"

import Navbar from "../navbar";
import { getTokenClaims } from "../../api/jwt-token";
import { redirect } from "next/navigation";
import ShopLogo from "@/app/components/shop-logo";
import Link from "next/link";

async function CheckoutLayout({
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



            <div className="mt-5">
                <Link href="/techshop"><ShopLogo /></Link>
            </div>
            <main className="sm:flex sm:flex-col items-center min-h-screen overflow-hidden">
                {children}
            </main>
        </>

    );
}

export default CheckoutLayout;