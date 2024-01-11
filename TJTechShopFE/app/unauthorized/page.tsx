"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Unauthorized = () => {
    const router = useRouter();
    
    useEffect(() => {
        setTimeout(() => {
            router.push("/techshop")
        }, 3000)
    }, [])
    return (
        <>
            <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-center">
                <h1 className="opacity-60 text-xl p-2">Oops! Looks like you don&apos;t belong here...</h1>
                <p className="opacity-60 text-sm italic p-2 border-b">Redirecting...<span className="font-semibold text-white"></span></p>
            </div>

        </>
    )
}

export default Unauthorized;