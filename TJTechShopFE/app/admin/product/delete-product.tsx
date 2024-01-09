"use client"

import { deleteProduct, getAllProducts } from "@/app/api/product";
import { ProductModel } from "@/app/models/product";
import DeleteImage from "@/app/scripts/delete-image";
import ModalToggle from "@/app/scripts/modal";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteProductButton = (product: ProductModel) => {
    const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);
    let router = useRouter();

    const removeProduct = (id: number) => {
        DeleteImage(product.name, "products");
        deleteProduct(id).then((res) => {
            toggleModal();
            console.log(res);
            getAllProducts().then(() => {
                router.refresh();
            })
        })
    }

    const toggleModal = () => {
        ModalToggle("modal2", "modal-backdrop-menu2");
        setShowDeleteMessage(old => !old);
    }

    return (
        <>
            <FontAwesomeIcon icon={faTrashCan} className="hover:cursor-pointer hover:text-red-300 nav-button" onClick={() => setShowDeleteMessage(old => !old)} />
            <dialog open={showDeleteMessage} className="modal z-40" id="modal2">
                <div className="border rounded font-medium shadow">
                    <p className="p-3 border-b w-full">Delete the product, <strong>{product.name}</strong>?</p>
                    <div className="flex items-center justify-end p-3">
                        <button className="nav-button bg-red-600 hover:bg-red-400" onClick={() => {
                            removeProduct(product.product_id!)
                        }}>Delete</button>
                        <button className="nav-button  bg-slate-600 hover:bg-slate-400" onClick={toggleModal}>Cancel</button>
                    </div>
                </div>
            </dialog>

            <dialog open={showDeleteMessage} className="modal-backdrop-menu z-30" id="modal-backdrop-menu2" onClick={toggleModal} />

        </>
    )
}

export default DeleteProductButton;