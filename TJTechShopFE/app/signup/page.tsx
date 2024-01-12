"use client"

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { registerUser } from "../api/user";
import ShopLogo from "../components/shop-logo";
import { UserModel } from "../models/user";
import getDate from "../scripts/get-current-date";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState<UserModel>({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        password: "",
        role_id: 1,
        age: 0
    });
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    }

    const RegisterUser = (user: UserModel) => {
        user.create_time! = getDate();
        setEmail(user.email);
        registerUser(user).then((result) => {
            if (result.first_name == undefined) {
                setShowErrorMessage(result.first_name == undefined)
                // setTimeout(() => {
                //     setShowErrorMessage(false)
                //     setEmail("");
                // }, 3000)
            } else {
                router.push("/");
            }

            setLoginData({
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                create_time: "",
                role_id: 1,
                age: 0,
                phone_number: ""
            })
        })
    }

    return (
        <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center justify-center h-auto bg-black bg-opacity-50 rounded p-5 mb-24">
                    <ShopLogo />
                    <div className="flex">
                        <input type="text" name="first_name" placeholder="First Name"
                            value={loginData.first_name} onChange={changeHandler} className="p-2 m-3 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70 w-1/2" />
                        <input type="text" name="last_name" placeholder="Last Name"
                            value={loginData.last_name} onChange={changeHandler} className="p-2 m-3 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70 w-1/2" />
                    </div>
                    <input type="email" name="email" placeholder="Email"
                        value={loginData.email} onChange={changeHandler} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                    <input type="tel" name="phone_number" placeholder="Phone #"
                        value={loginData.phone_number} onChange={changeHandler} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                    <input type="number" min={1} value={loginData.age == 0 ? "" : loginData.age} placeholder="Age"
                        name="age" onChange={changeHandler} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                    <input type="password" name="password" placeholder="Password"
                        value={loginData.password} onChange={changeHandler} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                    {
                        showErrorMessage
                            ?
                            <p className="text-red-400 opacity-70 text-sm text-center italic">Account Already Exists for: <span className="font-bold">{email}</span></p>
                            :
                            <>
                            </>
                    }
                    <button type="submit" className="nav-button border-b w-24"
                        disabled={loginData.email == "".trim() || loginData.password == "".trim() || loginData.first_name == "".trim() || loginData.last_name == "".trim()
                            || loginData.phone_number == "".trim() || loginData.age < 1} onClick={() => RegisterUser(loginData)}>Sign Up</button>
                    <div className="flex flex-col text-center text-sm mt-3">
                        <p className="p-2 opacity-50">Already Have an Account?</p>
                        <Link href="/" className="btn-hover">Login</Link>
                    </div>
                    <div className="flex flex-col items-center justify-start w-full mt-5 border-t">
                        <p className="p-2 opacity-50 text-sm mt-5 italic">TJCoding</p>
                        <div className="flex items-center justify-center w-full mt-5">
                            <a href="https://twitter.com/TJoostema71515" className="bg-white rounded btn-hover hover:cursor-pointer m-2 shadow-white"><Image src="https://tjcoding.sirv.com/website-images/icons8-twitterx.svg" alt="Twitter Logo" width={30} height={30} /></a>
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

export default SignUp;