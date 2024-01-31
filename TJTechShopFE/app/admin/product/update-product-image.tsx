"use client"

import { deleteProductToImage } from "@/app/api/product";
import { ProductModel } from "@/app/models/product";
import ModalToggle from "@/app/scripts/modal";
import { faChevronLeft, faChevronRight, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

function UpdateProductImageButton(product: ProductModel) {
    let router = useRouter();
    const [showUpdateImageForm, setShowUpdateImageForm] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [message, setMessage] = useState({ isError: false });
    const [carouselCounter, setCarouselCounter] = useState<number>(0);

    const toggleModal = () => {
        ModalToggle("modal3", "modal-backdrop-menu3");
        setShowUpdateImageForm(old => !old);
    }

    const DeleteImage = (productId: number, imageId: number) => {
        deleteProductToImage(productId, imageId).then((result) => {
            router.refresh();
            
        });
    }

    return (
        <>
            <img src={product.images!.length ? product.images![0].url : ""} alt="Product Image" className="w-24 h-24 object-cover rounded p-1 hover:cursor-pointer hover:" onClick={() => setShowUpdateImageForm(old => !old)} />
            <dialog open={showUpdateImageForm} className="modal z-40" id="modal3">
                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Product Image(s)</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon absolute right-0 bg-slate-400" onClick={toggleModal} />
                </div>
                <div className="border">
                    <div className="flex overflow-hidden items-center">
                        <button className="rounded p-3 m-1 fixed h-80 text-gray-50 hover: hover:bg-opacity-50" onClick={() => carouselCounter == 0 ? setCarouselCounter(product.images!.length - 1) : setCarouselCounter(carouselCounter - 1)}>
                            <FontAwesomeIcon icon={faChevronLeft} size="xl" className="p-2" />
                        </button>
                        <img src={product.images!.at(carouselCounter)?.url} alt="Product Image" className="w-96 h-96 object-cover" />
                        <button className="rounded p-3 m-1 fixed right-0 h-80 text-gray-50 hover:bg-opacity-50" onClick={() => carouselCounter == product.images!.length - 1 ? setCarouselCounter(0) : setCarouselCounter(carouselCounter + 1)}>
                            <FontAwesomeIcon icon={faChevronRight} size="xl" className="p-2" />
                        </button>
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            showMessage && !message.isError
                                ?
                                <>
                                    <button className="shadow m-2 p-2 bg-green-100 hover:opacity-90 flex items-center justify-cente rounded">
                                        <p>Product Updated</p>
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
                                    <button className="border m-2 p-2 bg-red-300 hover:bg-red-400 rounded" onClick={() => DeleteImage(product.product_id!, product.images![carouselCounter].image_id!)}>
                                        Delete Image
                                    </button>
                        }
                    </div>

                </div>
            </dialog>

            <dialog open={showUpdateImageForm} className="modal-backdrop-menu z-30" id="modal-backdrop-menu3" onClick={toggleModal} />
        </>
    )
}

export default UpdateProductImageButton;