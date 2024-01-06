"use client"

import { deleteUser, getAllUsers } from "@/app/api/user";
import { UserModel } from "@/app/models/user";
import ModalToggle from "@/app/scripts/modal";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteUserButton(user: UserModel) {
    const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);
    let router = useRouter();

    const DeleteUser = (email: string) => {
        deleteUser(user.email).then((result) => {
            toggleModal();
            console.log(result);
            getAllUsers().then(() => {
                router.refresh();
            })
        })
    }

    const toggleModal = () => {
        ModalToggle("modal-delete-user", "modal-backdrop-delete-user");
        setShowDeleteMessage(old => !old);
    }

    return (
        <>
            <FontAwesomeIcon icon={faTrashCan} className="hover:bg-red-200 hover:cursor-pointer text-red-700 nav-button" onClick={() => setShowDeleteMessage(old => !old)} />
            <dialog open={showDeleteMessage} className="modal z-40" id="modal-delete-user">
                <div className="border rounded font-medium shadow">
                    <p className="p-3 border-b w-full">Delete the account registered at, <strong>{user.email}</strong>?</p>
                    <div className="flex items-center justify-end p-3">
                        <button className="nav-button bg-red-200 hover:bg-red-300" onClick={() => {
                            DeleteUser(user.email)
                        }}>Delete</button>
                        <button className="nav-button bg-slate-200 hover:bg-slate-300" onClick={toggleModal}>Cancel</button>
                    </div>
                </div>
            </dialog>

            <dialog open={showDeleteMessage} className="modal-backdrop z-30" id="modal-backdrop-delete-user" onClick={toggleModal} />

        </>
    )
}