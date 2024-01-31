"use client"

import getAllSubCategories, { updateSubCategory } from "@/app/api/sub-category";
import CategoryModel from "@/app/models/category";
import SubCategoryModel from "@/app/models/sub-category";
import ModalToggle from "@/app/scripts/modal";
import { faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function UpdateSubCategoryButton(data: {subCategory: SubCategoryModel, categories: CategoryModel[]}) {
    let router = useRouter();
    const category = data.subCategory;
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [categoryUpdate, setCategoryUpdate] = useState<SubCategoryModel>(category);
    const [message, setMessage] = useState({ isError: false });

    const changeHandler = (event: ChangeEvent<any>) => {
        setCategoryUpdate({
            ...categoryUpdate,
            [event.target.name]: event.target.value
        })
    }

    const toggleModal = () => {
        ModalToggle("modal", "modal-backdrop-menu");
        setShowUpdateForm(old => !old);
        setCategoryUpdate(category);
    }

    const UpdateSubCategory = (categoryData: SubCategoryModel) => {
        categoryData = {
            name: categoryData.name.trim(),
            category_id: categoryData.category_id
        }
        updateSubCategory(categoryData, category.name).then((result) => {
            setMessage({ isError: result.name == undefined ? true : false })
            setShowMessage(old => !old)
            setTimeout(() => {
                setShowMessage(old => !old)
            }, 3000)
            getAllSubCategories().then(() => {
                router.refresh();
            })
        })
    }
    return (
        <>
            <FontAwesomeIcon icon={faPenToSquare} className="nav-button " onClick={() => setShowUpdateForm(old => !old)} />
            <dialog open={showUpdateForm} className="modal z-40" id="modal">


                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Update Category</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon absolute right-0 bg-slate-400" onClick={toggleModal} />
                </div>
                <div>

                </div>
                <div className="border p-1">
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Name: </label>
                        <input type="text" name="name" value={categoryUpdate.name} placeholder="Category Name" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Parent Category: </label>
                        <select name="category_id" value={categoryUpdate.category_id != 0 ? categoryUpdate.category_id : ""} className="input" onChange={changeHandler} >
                            <option value="" disabled hidden key={0}>Select Category</option>
                            {
                                data.categories.map((category) => (
                                    <option value={category.category_id} key={category.category_id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            showMessage && !message.isError
                                ?
                                <>
                                    <button className="shadow m-2 p-2 bg-green-100 hover:opacity-90 flex items-center justify-cente rounded">
                                        <p>Category Updated</p>
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
                                    <button className="bg-slate-200 hover:bg-slate-300 border m-2 p-2 rounded" disabled={(categoryUpdate.name == "")} onClick={() => UpdateSubCategory(categoryUpdate)}>
                                        Update Category
                                    </button>
                        }
                    </div>

                </div>
            </dialog>

            <dialog open={showUpdateForm} className="modal-backdrop-menu z-30" id="modal-backdrop-menu" onClick={toggleModal} />
        </>
    )
}

export default UpdateSubCategoryButton;