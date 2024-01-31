"use server"

import { getTokenClaims } from "../../api/jwt-token";
import { redirect } from "next/navigation";

async function SignUpLayout({
    children
}: {
    children: React.ReactNode
}) {
    await getTokenClaims().then((result) => {
        if (result) {
            redirect('/techshop');
        } else {
            redirect('/login');
        }
    })

    return (
        <>
            <main className="sm:flex sm:flex-col items-center min-h-screen overflow-hidden w-full flex justify-center">
                {children}
            </main>
        </>

    );
}

export default SignUpLayout;