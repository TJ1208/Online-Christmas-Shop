"use client"

import { getAllUsers, registerUser } from "@/app/api/user";
import { UserModel } from "@/app/models/user";
import getDate from "@/app/scripts/get-current-date";
import ModalToggle from "@/app/scripts/modal";
import { faSquarePlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const CreateUser = () => {
    const router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [message, setMessage] = useState({
        isError: false
    })
    const [user, setUser] = useState<UserModel>({
        username: "",
        email: "",
        password: "",
        create_time: "",
        age: 0
    });

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const toggleModal = () => {
        ModalToggle("modal-user", "modal-backdrop-user");
        setShowForm(old => !old);
    }

    const CreateUser = (user: UserModel) => {
        user.create_time! = getDate();
        registerUser(user).then((result) => {
            setMessage({ isError: result.username == undefined ? true : false })
            setShowMessage(old => !old)
            setTimeout(() => {
                setShowMessage(old => !old)
            }, 3000)
            setUser({
                username: "",
                email: "",
                password: "",
                create_time: "",
                age: 0
            })
            getAllUsers().then(() => {
                router.refresh();
            })
        })
    }

    return (
        <>
            <FontAwesomeIcon icon={faSquarePlus} className="hover:bg-green-200 hover:cursor-pointer text-green-700 nav-button" onClick={() => setShowForm(old => !old)} />

            <dialog open={showForm} className="modal z-40" id="modal-user">


                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Register User</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon border-2 absolute right-0" onClick={toggleModal} />
                </div>
                <div>

                </div>
                <div className="border p-1">
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Username: </label>
                        <input type="text" name="username" value={user.username} placeholder="Username" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Email: </label>
                        <input type="text" name="email" value={user.email} placeholder="Email" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Password: </label>
                        <input type="password" name="password" value={user.password} placeholder="Password (minimum 8 characters)" className="input placeholder:text-xs" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Age: </label>
                        <input type="number" name="age" min={1} value={user.age == 0 ? "" : user.age} placeholder="Age" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            showMessage && !message.isError
                                ?
                                <>
                                    <button className="shadow m-2 p-2 bg-green-100 hover:opacity-90 flex items-center justify-cente rounded">
                                        <p>User Added</p>
                                        <img src="https://tjcoding.sirv.com/website-images/checkmark-circle-svgrepo-com.png" className="h-5 px-2" />
                                    </button>
                                </>


                                :
                                showMessage && message.isError
                                    ?
                                    <>
                                        <button className="shadow m-2 p-2 bg-red-300 hover:opacity-90 flex items-center justify-center rounded">
                                            <p>An Error Occurred</p>
                                            <img src="https://tjcoding.sirv.com/website-images/error-circle-fail-failure-disallowed-x-cross-bad-svgrepo-com.png" className="h-5 px-2" />
                                        </button>
                                    </>
                                    :
                                    <button className="border m-2 p-2 bg-blue-100 rounded" disabled={user.username == "" || user.age <= 0 || user.email == "" || (user.password == "" || user.password.length < 8)} onClick={() => CreateUser(user)}>
                                        Add User
                                    </button>
                        }
                    </div>

                </div>
            </dialog>

            <dialog open={showForm} className="modal-backdrop z-30" id="modal-backdrop-user" onClick={toggleModal} />

        </>
    )
}

export default CreateUser;