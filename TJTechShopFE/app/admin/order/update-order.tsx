"use client"

import getAllCategories from "@/app/api/category";
import { updateOrder } from "@/app/api/order";
import { OrderModel } from "@/app/models/order";
import { UserModel } from "@/app/models/user";
import ModalToggle from "@/app/scripts/modal";
import { faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function UpdateOrderButton(data: { order: OrderModel, users: UserModel[] }) {
    let router = useRouter();
    const order = data.order;
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [orderUpdate, setOrderUpdate] = useState<OrderModel>(order);
    const [message, setMessage] = useState({ isError: false });
    const changeHandler = (event: ChangeEvent<any>) => {
        setOrderUpdate({
            ...orderUpdate,
            [event.target.name]: event.target.value
        })
    }

    const toggleModal = () => {
        ModalToggle("modal", "modal-backdrop-menu");
        setShowUpdateForm(old => !old);
        setOrderUpdate(order);
    }

    const UpdateOrder = (orderData: OrderModel) => {
        updateOrder(orderData).then((result) => {
            setMessage({ isError: result.user_id == undefined ? true : false })
            setShowMessage(old => !old)
            setTimeout(() => {
                setShowMessage(old => !old)
            }, 3000)
            getAllCategories().then(() => {
                router.refresh();
            })
        })
    }
    return (
        <>
            <FontAwesomeIcon icon={faPenToSquare} className="nav-button " onClick={() => setShowUpdateForm(old => !old)} />
            <dialog open={showUpdateForm} className="modal z-40" id="modal">
                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Update Order</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon absolute right-0 bg-slate-400" onClick={toggleModal} />
                </div>
                <div className="border p-1">
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Buyer: </label>
                        <select name="user_id" value={orderUpdate.user_id} className="input" onChange={changeHandler} >
                            <option value="" disabled hidden key={0}>Select Buyer</option>
                            {
                                data.users.map((user) => (
                                    <option value={user.user_id} key={user.user_id}>{user.last_name}, {user.first_name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <label className="p-2">Products </label>
                    <div className="flex items-center justify-center">
                        {
                            showMessage && !message.isError
                                ?
                                <>
                                    <button className="shadow m-2 p-2 bg-green-100 hover:opacity-90 flex items-center justify-cente rounded">
                                        <p>Order Updated</p>
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
                                    <button className="bg-slate-200 hover:bg-slate-300 border m-2 p-2 rounded" disabled={(orderUpdate.user_id < 1)} onClick={() => UpdateOrder(orderUpdate)}>
                                        Update Order
                                    </button>
                        }
                    </div>

                </div>
            </dialog>

            <dialog open={showUpdateForm} className="modal-backdrop-menu z-30" id="modal-backdrop-menu" onClick={toggleModal} />
        </>
    )
}

export default UpdateOrderButton;