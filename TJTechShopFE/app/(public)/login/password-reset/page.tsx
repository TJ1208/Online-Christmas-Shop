"use client"

import ShopLogo from "@/app/components/shop-logo";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { getUser, sendPasswordResetCode, updateUser } from "@/app/api/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { UserModel } from "@/app/models/user";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

const PasswordReset = () => {
    const router = useRouter();
    const [resetEmail, setResetEmail] = useState<string>("");
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [showResetCodeForm, setShowResetCodeForm] = useState<boolean>(false);
    const [showResetPasswordForm, setShowResetPasswordForm] = useState<boolean>(false);
    const [showResetSuccess, setShowResetSuccess] = useState<boolean>(false);
    const [codeSent, setCodeSent] = useState<boolean>(false);
    const [resetCode, setResetCode] = useState<string>("");
    const [user, setUser] = useState<UserModel>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        create_time: "",
        role_id: 1,
        age: 0,
        phone_number: "",
        authenticated: false
    });
    const [newPassword, setNewPassword] = useState({ newPassword: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setResetEmail(event.target.value);
    }

    const changeHandlerResetCode = (event: ChangeEvent<HTMLInputElement>) => {
        setResetCode(event.target.value);
        resetCode.length > 4 && !(event.target.value.length < resetCode.length) ? checkResetCode(event.target.value) : "";

    }

    const sendResetCode = (email: string) => {
        const resetCode = { reset_code: (Math.random() * 1000000).toString().substring(0, 6) };
        sendPasswordResetCode(resetCode, email).then((result) => {
            showResetCodeForm ? setCodeSent(true) : setCodeSent(false);
            result.user_id == undefined ? setShowErrorMessage(true) : setShowResetCodeForm(true);
            setTimeout(() => {
                setCodeSent(false);
                setShowErrorMessage(false);
            }, 2000);
            setUser(result);
        })
    }

    const changeHandlerNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setNewPassword({
            ...newPassword,
            [event.target.name]: event.target.value
        });
        if (event.target.name == "confirmPassword") {
            newPassword.newPassword != event.target.value ? setShowErrorMessage(true) : setShowErrorMessage(false);
        }
        if (event.target.name == "newPassword" && newPassword.confirmPassword.length > 0) {
            event.target.value != newPassword.confirmPassword ? setShowErrorMessage(true) : setShowErrorMessage(false);
        }


    }

    const checkResetCode = (code: string) => {
        getUser(resetEmail).then((result) => {
            result.reset_code == code ? setShowResetPasswordForm(true) : setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 2000)
        })
    }

    const resetPassword = () => {

        const newUser: UserModel = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: newPassword.newPassword,
            age: user.age,
            role_id: user.role_id,
            phone_number: user.phone_number,
            reset_code: "",
            authenticated: user.authenticated
        }
        user?.password == newPassword.newPassword;
        updateUser(newUser, newUser.email).then((result) => {
            result.user_id == undefined ? setShowErrorMessage(true) : setShowResetSuccess(true); setShowResetPasswordForm(false);
            setShowResetPasswordForm(false);
            // showResetSuccess ? setTimeout(() => {
            //     router.push('/login')
            // }, 5000) : ""

            setTimeout(() => {
                setShowErrorMessage(false);
            }, 2000)
        })
    }

    return (
        <>
            <div className="min-h-screen">


                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className={`flex flex-col items-center justify-center h-auto bg-black bg-opacity-50 rounded p-5 mb-24`}>
                        <ShopLogo />
                        <div className={`flex flex-col items-center justify-center h-auto bg-black bg-opacity-50 rounded p-5 ${showResetCodeForm || showResetPasswordForm ? 'hidden' : ''}`}>
                            <input type="email" name="email" placeholder="Email"
                                value={resetEmail} onChange={changeHandler} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                            {
                                showErrorMessage
                                    ?
                                    <p className="text-red-400 opacity-70 text-sm text-center italic mb-3">No Account Exists for: <span className="font-bold">{resetEmail}</span></p>
                                    :
                                    <>
                                    </>
                            }
                            <button disabled={resetEmail == ''.trim()} className="btn-hover border rounded p-2" onClick={() => sendResetCode(resetEmail)}>
                                Send Code
                            </button>
                        </div>
                        <div className={`flex flex-col items-center justify-center h-auto bg-black bg-opacity-50 rounded p-5 ${showResetPasswordForm || !showResetCodeForm || showResetSuccess ? 'hidden' : ''}`}>
                            <div className="flex gap-3 items-center justify-center text-gray-300">
                                <p>Code Sent</p>
                                <FontAwesomeIcon icon={faCircleCheck} size="xl" className="text-green-200" />
                            </div>
                            <input type="text" name="resetCode" placeholder="Reset Code" maxLength={6}
                                value={resetCode} onChange={changeHandlerResetCode} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                            {
                                showErrorMessage
                                    ?
                                    <p className="text-red-400 opacity-70 text-sm text-center italic mb-3">Incorrect Code</p>
                                    :
                                    <>
                                    </>
                            }
                            <div className="flex flex-col items-center justify-center gap-3">
                                <div className="text-center">
                                    <p className="btn-hover">Didn&apos;t receive a code?</p>
                                    <sub className="opacity-50">Try sending again after 1 minute.</sub>
                                </div>
                                <button className="btn-hover border rounded p-2 w-fit" onClick={() => sendResetCode(resetEmail)}>
                                    Send Code
                                </button>
                            </div>
                        </div>
                        <div className={`flex flex-col items-center justify-center h-auto bg-black bg-opacity-50 rounded p-5 relative ${showResetPasswordForm ? '' : 'hidden'}`}>
                            <input type={`${showPassword ? 'text' : 'password'}`} name="newPassword" placeholder="New Password"
                                value={newPassword.newPassword} onChange={changeHandlerNewPassword} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                            {
                                showPassword
                                    ?
                                    <button className="btn-hover p-1 absolute top-10 right-10" onClick={() => setShowPassword(old => !old)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    :
                                    <button className="btn-hover p-1 absolute top-10 right-10" onClick={() => setShowPassword(old => !old)}>
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    </button>
                            }
                            <input type={`${showPassword ? 'text' : 'password'}`} name="confirmPassword" placeholder="Confirm Password"
                                value={newPassword.confirmPassword} onChange={changeHandlerNewPassword} className="p-2 m-4 border-b border-gray-500 px-2 outline-none bg-black input-login opacity-70" />
                            {
                                showErrorMessage
                                    ?
                                    <p className="text-red-400 opacity-70 text-sm text-center italic mb-3">Passwords Don&apos;t Match</p>
                                    :
                                    <>
                                    </>
                            }
                            <div className="flex flex-col items-center justify-center gap-3">
                                <p className="btn-hover">Didn&apos;t receive a code?</p>

                                <button disabled={newPassword.newPassword == "" || newPassword.confirmPassword == "" || newPassword.newPassword != newPassword.confirmPassword} className="btn-hover border rounded p-2 w-fit" onClick={() => resetPassword()}>
                                    Reset Password
                                </button>
                            </div>
                        </div>
                        <div className={`flex flex-col items-center justify-center h-auto bg-black bg-opacity-50 rounded p-5 ${showResetSuccess ? '' : 'hidden'}`}>
                            <p className="whitespace-nowrap text-gray-300">Password Has Been Reset For:</p>
                            <p className="p-2 text-green-200">{resetEmail}</p>
                            <Link href='/login' className="nav-button border">Login</Link>
                            {/* <sub className="opacity-50 pt-5">Will Redirect To Login In 5 seconds...</sub> */}
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
            </div>
        </>
    )
}

export default PasswordReset;