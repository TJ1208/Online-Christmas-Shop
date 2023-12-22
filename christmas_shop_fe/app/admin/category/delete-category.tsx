"use client"

import { deleteCategory, getAllCategories } from "@/app/api/category"
import CategoryModel from "@/app/models/category"
import DeleteImage from "@/app/scripts/delete-image"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"

export function DeleteButton(category: CategoryModel) {
    let router = useRouter();

    const removeCategory = (name: string) => {
        DeleteImage(name);
        deleteCategory(name).then((res) => {
            console.log(res);
            getAllCategories().then(() => {
                router.refresh();
            })
        })
    }

    return (
        <FontAwesomeIcon icon={faTrashCan} className="hover:bg-red-200 hover:cursor-pointer text-red-700 nav-button" onClick={() => removeCategory(category.name)} />
    )

}


export default DeleteButton
