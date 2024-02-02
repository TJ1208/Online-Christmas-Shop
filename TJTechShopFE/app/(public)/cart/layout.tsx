"use server"

import Navbar from "../navbar";
import { getTokenClaims } from "../../api/jwt-token";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProductLoad from "../products/product-load";

async function CartLayout({
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



            <div className=" xl:px-44 sticky top-0 overflow-x-clip">
                <Navbar />
            </div>
            <Suspense fallback={<ProductLoad />}>
                <main className="sm:flex sm:flex-col items-center min-h-screen overflow-hidden">
                    {children}
                </main>
            </Suspense>
        </>

    );
}

export default CartLayout;