"use client"

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { login } from "../api/user";

const Login = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' })


    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    }

    const LoginUser = () => {
        login(loginData).then((result) => {
            console.log(result);
        })
    }

    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center justify-center h-auto bg-black bg-opacity-50 rounded p-5 mb-24">
                    <img src="https://tjcoding.sirv.com/website-images/Screenshot%202024-01-06%20211930.png" alt="Shop Icon" className="h-24" />
                    <input type="email" name="email" placeholder="Email"
                        value={loginData.email} onChange={changeHandler} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                    <input type="password" name="password" placeholder="Password"
                        value={loginData.password} onChange={changeHandler} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                    <button type="submit" className="nav-button border-b w-24"
                    disabled={loginData.email == "".trim() || loginData.password == "".trim()} onClick={() => LoginUser()}>Login</button>
                    <div className="flex flex-col text-center text-sm mt-3">
                        <p className="p-2 opacity-50">Don't have an account?</p>
                        <Link href="/login" className="btn-hover">Sign Up</Link>
                    </div>
                    <div className="flex items-center justify-start w-full mt-5 border-t">
                        <p className="p-2 opacity-50 text-sm mt-5">TJCoding:</p>
                        <div className="flex mt-5">
                            <a href="" className="bg-white rounded btn-hover hover:cursor-pointer m-2"><Image src="https://tjcoding.sirv.com/website-images/icons8-twitterx.svg" alt="Twitter Logo" width={30} height={30} /></a>
                            <a href="https://www.facebook.com/taylor.joostema.7" className="bg-white rounded btn-hover hover:cursor-pointer m-2"><Image src="https://tjcoding.sirv.com/website-images/icons8-facebook.svg" alt="Facebook Logo" width={30} height={30} /></a>
                            <a href="https://github.com/TJ1208" className="bg-white rounded btn-hover hover:cursor-pointer m-2"><Image src="https://tjcoding.sirv.com/website-images/icons8-github.svg" alt="Github Logo" width={30} height={30} /></a>
                            <a href="https://www.facebook.com/taylor.joostema.7" className="bg-white rounded btn-hover hover:cursor-pointer m-2"><Image src="https://tjcoding.sirv.com/website-images/icons8-linkedin.svg" alt="LinkIn Logo" width={30} height={30} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;