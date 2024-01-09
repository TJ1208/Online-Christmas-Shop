"use client"

import { deleteImage, getAllImages } from "@/app/api/image";
import { ImageModel } from "@/app/models/image";
import ModalToggle from "@/app/scripts/modal";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteImageButton(image: ImageModel) {
    const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);
    let router = useRouter();

    const removeImage = (id: number) => {
        // DeleteImage(name, "categories");
        deleteImage(id).then((res) => {
            toggleModal();
            console.log(res);
            getAllImages().then(() => {
                router.refresh();
            })
        })
    }

    const toggleModal = () => {
        ModalToggle("modal-image", "modal-backdrop-menu-image");
        setShowDeleteMessage(old => !old);
    }

    return (
        <>
            <FontAwesomeIcon icon={faTrashCan} className="hover:cursor-pointer hover:text-red-400 nav-button" onClick={() => setShowDeleteMessage(old => !old)} />
            <dialog open={showDeleteMessage} className="modal z-40" id="modal2">
                <div className="border rounded font-medium shadow">
                    <div className="flex flex-col items-center justify-center text-center p-2">
                        <p className="p-3 border-b w-full">Delete Image?</p>
                        <img src={image.url} alt="Image" className="w-80" />
                    </div>
                    <div className="flex items-center justify-end p-3">
                        <button className="nav-button bg-red-600 hover:bg-red-400" onClick={() => {
                            removeImage(image.image_id!);
                        }}>Delete</button>
                        <button className="nav-button bg-slate-600 hover:bg-slate-400" onClick={toggleModal}>Cancel</button>
                    </div>
                </div>
            </dialog>

            <dialog open={showDeleteMessage} className="modal-backdrop-menu z-30" id="modal-backdrop-menu2" onClick={toggleModal} />
        </>
    )
}

export default DeleteImageButton;