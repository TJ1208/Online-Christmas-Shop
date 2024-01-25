import { redirect } from "next/navigation";
import { getTokenClaims } from "@/app/api/jwt-token";
import Navbar from "@/app/(public)/navbar";

export default async function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    await getTokenClaims().then((result) => {
        if (!result || result.role != 2) {
            redirect('/techshop');
        }
    })

    return (
        <>



            <div className=" xl:px-44 sticky top-0 overflow-x-clip">
                <Navbar />
            </div>
            <main className="sm:flex sm:flex-col items-center min-h-screen overflow-hidden">
                {children}
            </main>
        </>

    );
}