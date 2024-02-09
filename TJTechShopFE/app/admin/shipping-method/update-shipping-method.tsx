"use client"

import { getAllShippingMethods, updateShippingMethod } from "@/app/api/shipping-method";
import { ShippingMethodModel } from "@/app/models/shipping-method";
import ModalToggle from "@/app/scripts/modal";
import { faPenToSquare, faSquarePlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function UpdateShippingMethodButton(shippingMethod: ShippingMethodModel) {
    let router = useRouter();
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [shippingMethodUpdate, setShippingMethodUpdate] = useState<ShippingMethodModel>(shippingMethod);
    const [message, setMessage] = useState({ isError: false });

    const changeHandler = (event: ChangeEvent<any>) => {
        setShippingMethodUpdate({
            ...shippingMethodUpdate,
            [event.target.name]: event.target.value
        })
    }

    const toggleModal = () => {
        ModalToggle("modal", "modal-backdrop-menu");
        setShowUpdateForm(old => !old);
        setShippingMethodUpdate(shippingMethod);
    }

    const UpdateShippingMethod = (shippingMethodData: ShippingMethodModel) => {
        updateShippingMethod(shippingMethodData, shippingMethod.name).then((result) => {
            setMessage({ isError: result.name == undefined ? true : false })
            setShowMessage(old => !old)
            setTimeout(() => {
                setShowMessage(old => !old)
            }, 3000)
            getAllShippingMethods().then(() => {
                router.refresh();
            })
        })
    }
    return (
        <>
            <FontAwesomeIcon icon={faPenToSquare} className="nav-button " onClick={() => setShowUpdateForm(old => !old)} />

            <dialog open={showUpdateForm} className="modal z-40" id="modal">


                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Update Shipping Method</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon absolute right-0 bg-slate-400" onClick={toggleModal} />
                </div>
                <div>

                </div>
                <div className="border p-1">
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Name: </label>
                        <input type="text" name="name" value={shippingMethodUpdate.name} placeholder="Shipping Method Name" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Rate: </label>
                        <input type="number" name="rate" value={shippingMethodUpdate.rate == 0 ? "" : shippingMethodUpdate.rate} className="input" placeholder="e.g. 4.99" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Early Arrival: </label>
                        <input type="number" name="early_arrival" value={shippingMethodUpdate.early_arrival == 0 ? "" : shippingMethodUpdate.early_arrival} className="input" placeholder="e.g. 3 (In Days)" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Late Arrival: </label>
                        <input type="number" name="late_arrival" value={shippingMethodUpdate.late_arrival == 0 ? "" : shippingMethodUpdate.late_arrival} className="input" placeholder="e.g. 5 (In Days)" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            showMessage && !message.isError
                                ?
                                <>
                                    <button className="shadow m-2 p-2 bg-green-100 hover:opacity-90 flex items-center justify-cente rounded">
                                        <p>Shipping Method Updated</p>
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
                                    <button className="bg-slate-200 hover:bg-slate-300 border m-2 p-2 rounded" disabled={(shippingMethodUpdate.name == "")} onClick={() => UpdateShippingMethod(shippingMethodUpdate)}>
                                        Update Shipping Method
                                    </button>
                        }
                    </div>

                </div>
            </dialog>

            <dialog open={showUpdateForm} className="modal-backdrop-menu z-30" id="modal-backdrop-menu" onClick={toggleModal} />

        </>
    )
}

export default UpdateShippingMethodButton;