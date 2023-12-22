"use client"

import CategoryModel from "@/app/models/category"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function DeleteButton(category: CategoryModel) {

    return (
        <FontAwesomeIcon icon={faTrashCan} className="hover:bg-red-200 hover:cursor-pointer text-red-700 nav-button"/>
    )
}

export default DeleteButton
