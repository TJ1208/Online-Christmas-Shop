"use server"

import { getTokenClaims } from "../../api/jwt-token";
import { redirect } from "next/navigation";

async function TechShopLayout({
    children
}: {
    children: React.ReactNode
}) {
    await getTokenClaims().then((result) => {
        if (result) {
            redirect('/techshop');
        }
    })

    return (
        <>
            <main className="sm:flex sm:flex-col items-center min-h-screen overflow-hidden">
                {children}
            </main>
        </>

    );
}

export default TechShopLayout;