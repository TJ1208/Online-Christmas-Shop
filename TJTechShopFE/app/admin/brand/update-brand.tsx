"use client"

import getAllBrands, { updateBrand } from "@/app/api/brand";
import { BrandModel } from "@/app/models/brand";
import ModalToggle from "@/app/scripts/modal";
import { faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function UpdateBrandButton(brand: BrandModel) {
    let router = useRouter();
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [brandUpdate, setbrandUpdate] = useState<BrandModel>(brand);
    const [message, setMessage] = useState({ isError: false });

    const changeHandler = (event: ChangeEvent<any>) => {
        setbrandUpdate({
            ...brandUpdate,
            [event.target.name]: event.target.value
        })
    }

    const toggleModal = () => {
        ModalToggle("modal", "modal-backdrop-menu");
        setShowUpdateForm(old => !old);
        setbrandUpdate(brand);
    }

    const UpdateBrand = (brandData: BrandModel) => {
        brandData = {
            name: brandData.name.trim(),
            brand_id: brandData.brand_id
        }
        updateBrand(brandData, brand.name).then((result) => {
            setMessage({ isError: result.name == undefined ? true : false })
            setShowMessage(old => !old)
            setTimeout(() => {
                setShowMessage(old => !old)
            }, 3000)
            getAllBrands().then(() => {
                router.refresh();
            })
        })
    }
    return (
        <>
            <FontAwesomeIcon icon={faPenToSquare} className="nav-button " onClick={() => setShowUpdateForm(old => !old)} />
            <dialog open={showUpdateForm} className="modal z-40" id="modal">


                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Update Brand</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon absolute right-0 bg-slate-400" onClick={toggleModal} />
                </div>
                <div>

                </div>
                <div className="border p-1">
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Name: </label>
                        <input type="text" name="name" value={brandUpdate.name} placeholder="brand Name" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            showMessage && !message.isError
                                ?
                                <>
                                    <button className="shadow m-2 p-2 bg-green-100 hover:opacity-90 flex items-center justify-cente rounded">
                                        <p>Brand Updated</p>
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
                                    <button className="bg-slate-200 hover:bg-slate-300 border m-2 p-2 rounded" disabled={(brandUpdate.name == "")} onClick={() => UpdateBrand(brandUpdate)}>
                                        Update Brand
                                    </button>
                        }
                    </div>

                </div>
            </dialog>

            <dialog open={showUpdateForm} className="modal-backdrop-menu z-30" id="modal-backdrop-menu" onClick={toggleModal} />
        </>
    )
}

export default UpdateBrandButton;