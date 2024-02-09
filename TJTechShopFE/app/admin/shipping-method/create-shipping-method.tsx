"use client"

import { addShippingMethod, getAllShippingMethods } from "@/app/api/shipping-method";
import { ShippingMethodModel } from "@/app/models/shipping-method";
import ModalToggle from "@/app/scripts/modal";
import { faSquarePlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function CreateShippingMethod() {
    let router = useRouter();
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [shippingMethod, setShippingMethod] = useState({
        name: '',
        rate: 0.0,
        early_arrival: 0,
        late_arrival: 0
    })
    const [message, setMessage] = useState({
        isError: false
    })

    const changeHandler = (event: ChangeEvent<any>) => {
        setShippingMethod({
            ...shippingMethod,
            [event.target.name]: event.target.value
        })
    }

    const toggleModal = () => {
        ModalToggle("modal", "modal-backdrop-menu");
        setShowForm(old => !old);
    }


    const CreateShippingMethod = (shippingMethodData: ShippingMethodModel) => {
        console.log(shippingMethodData);
        addShippingMethod(shippingMethodData).then((result) => {
            setMessage({ isError: result.name == undefined ? true : false })
            setShowMessage(old => !old)
            setTimeout(() => {
                setShowMessage(old => !old)
            }, 3000)

            setShippingMethod({
                name: '',
                rate: 0.0,
                early_arrival: 0,
                late_arrival: 0
            })
            getAllShippingMethods().then(() => {
                router.refresh();
            })
        })
    }

    return (
        <>
            <FontAwesomeIcon icon={faSquarePlus} className="hover:text-green-200 hover:cursor-pointer nav-button" onClick={() => setShowForm(old => !old)} />

            <dialog open={showForm} className="modal z-40" id="modal">


                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Add Shipping Method</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon absolute right-0 bg-slate-400" onClick={toggleModal} />
                </div>
                <div>

                </div>
                <div className="border p-1">
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Name: </label>
                        <input type="text" name="name" value={shippingMethod.name} placeholder="Shipping Method Name" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Rate: </label>
                        <input type="number" name="rate" value={shippingMethod.rate == 0 ? "" : shippingMethod.rate} className="input" placeholder="e.g. 4.99" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Early Arrival: </label>
                        <input type="number" name="early_arrival" value={shippingMethod.early_arrival == 0 ? "" : shippingMethod.early_arrival} className="input" placeholder="e.g. 3 (In Days)" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Late Arrival: </label>
                        <input type="number" name="late_arrival" value={shippingMethod.late_arrival == 0 ? "" : shippingMethod.late_arrival} className="input" placeholder="e.g. 5 (In Days)" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            showMessage && !message.isError
                                ?
                                <>
                                    <button className="shadow m-2 p-2 bg-green-100 hover:opacity-90 flex items-center justify-cente rounded">
                                        <p>Shipping Method Added</p>
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
                                    <button className="bg-slate-200 hover:bg-slate-300 border m-2 p-2 rounded" disabled={(shippingMethod.name == "" || shippingMethod.rate == 0 || shippingMethod.early_arrival == 0 || shippingMethod.late_arrival == 0)} onClick={() => CreateShippingMethod(shippingMethod)}>
                                        Add Shipping Method
                                    </button>
                        }
                    </div>

                </div>
            </dialog>

            <dialog open={showForm} className="modal-backdrop-menu z-30" id="modal-backdrop-menu" onClick={toggleModal} />

        </>
    )
}

export default CreateShippingMethod;