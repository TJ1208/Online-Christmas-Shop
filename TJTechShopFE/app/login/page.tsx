"use client"

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { login } from "../api/user";
import ShopLogo from "../components/shop-logo";

const Login = () => {
    const [loginData, setLoginData] = useState({ email: "", password: "" })
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    }

    const LoginUser = () => {
        login(loginData).then((result) => {
            if (!result) {
                setShowErrorMessage(true);
                setTimeout(() => {
                    setShowErrorMessage(false);
                }, 2000);
            }
        })
    }

    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center justify-center h-auto bg-black bg-opacity-50 rounded p-5 mb-24">
                    <ShopLogo />
                    <input type="email" name="email" placeholder="Email"
                        value={loginData.email} onChange={changeHandler} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                    <input type="password" name="password" placeholder="Password"
                        value={loginData.password} onChange={changeHandler} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                    {
                        showErrorMessage
                            ?
                            <p className="text-red-400 opacity-50 text-sm">Incorrent Email / Password</p>
                            :
                            <>
                            </>
                    }
                    <button type="submit" className="nav-button border-b w-24"
                        disabled={loginData.email == "".trim() || loginData.password == "".trim()} onClick={() => LoginUser()}>Login</button>
                    <div className="flex flex-col text-center text-sm mt-3">
                        <p className="p-2 opacity-50">Don&apos;t have an account?</p>
                        <Link href="/signup" className="btn-hover">Sign Up</Link>
                    </div>
                    <div className="flex items-center justify-start w-full mt-5 border-t">
                        <p className="p-2 opacity-50 text-sm mt-5">TJCoding:</p>
                        <div className="flex mt-5">
                            <a href="https://twitter.com/TJoostema71515" className="bg-white rounded btn-hover hover:cursor-pointer m-2"><Image src="https://tjcoding.sirv.com/website-images/icons8-twitterx.svg" alt="Twitter Logo" width={30} height={30} /></a>
                            <a href="https://www.facebook.com/taylor.joostema.7" className="bg-white rounded btn-hover hover:cursor-pointer m-2"><Image src="https://tjcoding.sirv.com/website-images/icons8-facebook.svg" alt="Facebook Logo" width={30} height={30} /></a>
                            <a href="https://github.com/TJ1208" className="bg-white rounded btn-hover hover:cursor-pointer m-2"><Image src="https://tjcoding.sirv.com/website-images/icons8-github.svg" alt="Github Logo" width={30} height={30} /></a>
                            <a href="https://www.linkedin.com/in/taylor-joostema-26ba66244/" className="bg-white rounded btn-hover hover:cursor-pointer m-2"><Image src="https://tjcoding.sirv.com/website-images/icons8-linkedin.svg" alt="LinkedIn Logo" width={30} height={30} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;