"use client"

import getAllCategories, { updateCategory } from "@/app/api/category";
import { addImage } from "@/app/api/image";
import CategoryModel from "@/app/models/category";
import { ImageModel } from "@/app/models/image";
import FetchImage from "@/app/scripts/fetch-image";
import getDate from "@/app/scripts/get-current-date";
import ModalToggle from "@/app/scripts/modal";
import { faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function UpdateCategoryButton(category: CategoryModel) {
    let router = useRouter();
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [categoryUpdate, setCategoryUpdate] = useState<CategoryModel>(category);
    const [image, setImage] = useState<ImageModel>(category.image!);
    const [message, setMessage] = useState({ isError: false });

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCategoryUpdate({
            ...categoryUpdate,
            [event.target.name]: event.target.value
        })
        console.log(event.target.value);
    }

    const changeHandlerImage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setImage({
            ...image,
            [event.target.name]: event.target.value
        })
    }

    const toggleModal = () => {
        ModalToggle("modal", "modal-backdrop-menu");
        setShowUpdateForm(old => !old);
        setCategoryUpdate(category);
    }

    const UpdateCategory = (categoryData: CategoryModel, imageData: ImageModel) => {
        const number = Math.random() * 100;
        categoryData.name = categoryData.name.trim();
        if (imageData.url != category.image?.url) {
            imageData.url = imageData.url.replaceAll(" ", "");
            FetchImage(imageData.url, number.toString(), "categories");
            imageData = {
                url: `https://tjcoding.sirv.com/categories/${number.toString()}.jpg`,
                create_time: getDate()
            }
            addImage(imageData).then(result => {
                categoryData = {
                    name: categoryUpdate.name,
                    image_id: result.image_id!
                }
                updateCategory(categoryData, category.name).then((result) => {
                    setMessage({ isError: result.name == undefined ? true : false })
                    setShowMessage(old => !old)
                    setTimeout(() => {
                        setShowMessage(old => !old)
                    }, 3000)
                    getAllCategories().then(() => {
                        router.refresh();
                    })
                })
            })
        }
        else {
            categoryData = {
                name: categoryUpdate.name,
                image_id: categoryUpdate.image_id
            }
            updateCategory(categoryData, category.name).then((result) => {
                setMessage({ isError: result.name == undefined ? true : false })
                setShowMessage(old => !old)
                setTimeout(() => {
                    setShowMessage(old => !old)
                }, 3000)
                getAllCategories().then(() => {
                    router.refresh();
                })
            })
        }
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
                    <div className="flex flex-col">
                        <div className="flex items-center p-2">
                            <label className="p-2">*&nbsp;Image:</label>
                            <textarea name="url" value={image ? image.url.trim() : ""} placeholder="Image URL" className="input h-auto" onChange={changeHandlerImage} />
                        </div>
                        <div className="flex flex-col items-center p-2 border">
                            <label className="border-b w-full text-center">Preview</label>
                            <img src={image ? image.url.trim() : ""} alt="" className=" object-cover min-h-[180px] max-h-[180px]" />
                        </div>
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
                                    <button className="bg-slate-200 hover:bg-slate-300 border m-2 p-2 rounded" disabled={(image ? image.url.trim() == "" : true || categoryUpdate.name == "")} onClick={() => UpdateCategory(category, image)}>
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

export default UpdateCategoryButton;