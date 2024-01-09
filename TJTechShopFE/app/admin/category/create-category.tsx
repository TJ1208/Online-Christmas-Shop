"use client"

import getAllCategories, { addCategory } from "@/app/api/category";
import { addImage } from "@/app/api/image";
import CategoryModel from "@/app/models/category";
import { ImageModel } from "@/app/models/image";
import { FetchImage } from "@/app/scripts/fetch-image";
import getDate from "@/app/scripts/get-current-date";
import ModalToggle from "@/app/scripts/modal";
import { faSquarePlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function CreateCategory() {
    let router = useRouter();
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [category, setCategory] = useState({
        name: '',
        image_id: 0
    })
    const [image, setImage] = useState({
        url: "",
        create_time: ""
    })
    const [message, setMessage] = useState({
        isError: false
    })

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCategory({
            ...category,
            [event.target.name]: event.target.value
        })
    }

    const changeHandlerImage = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setImage({
            ...image,
            [event.target.name]: event.target.value
        })
    }
    const toggleModal = () => {
        ModalToggle("modal", "modal-backdrop-menu");
        setShowForm(old => !old);
    }


    const CreateCategory = (categoryData: CategoryModel, imageData: ImageModel) => {
        categoryData.name = categoryData.name.trim();
        imageData.url = imageData.url.replaceAll(" ", "");
        imageData.create_time = getDate();
        FetchImage(imageData.url, categoryData.name, "categories");
        imageData.url = `https://tjcoding.sirv.com/categories/${categoryData.name}.jpg`;
        addImage(imageData).then(result => {
            categoryData.image_id = result.image_id || 0;
            addCategory(categoryData).then((result) => {
                setMessage({ isError: result.name == undefined ? true : false })
                setShowMessage(old => !old)
                setTimeout(() => {
                    setShowMessage(old => !old)
                }, 3000)
                setImage({ url: "", create_time: "" })
                setCategory({ name: "", image_id: 0 })
                getAllCategories().then(() => {
                    router.refresh();
                })
            })
        })
    }

    return (
        <>
            <FontAwesomeIcon icon={faSquarePlus} className="hover:text-green-200 hover:cursor-pointer nav-button" onClick={() => setShowForm(old => !old)} />

            <dialog open={showForm} className="modal z-40" id="modal">


                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Add Category</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon absolute right-0 bg-slate-400" onClick={toggleModal} />
                </div>
                <div>

                </div>
                <div className="border p-1">
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Name: </label>
                        <input type="text" name="name" value={category.name} placeholder="Category Name" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center p-2">
                            <label className="p-2">*&nbsp;Image:</label>
                            <textarea name="url" value={image.url.trim()} placeholder="Image URL" className="input h-auto" onChange={changeHandlerImage} />
                        </div>
                        <div className="flex flex-col items-center p-2 border">
                            <label className="border-b w-full text-center">Preview</label>
                            <img src={image.url} alt="" className=" object-cover min-h-[180px] max-h-[180px]" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            showMessage && !message.isError
                                ?
                                <>
                                    <button className="shadow m-2 p-2 bg-green-100 hover:opacity-90 flex items-center justify-cente rounded">
                                        <p>Category Added</p>
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
                                    <button className="bg-slate-200 hover:bg-slate-300 border m-2 p-2 rounded" disabled={(image.url == "" || category.name == "")} onClick={() => CreateCategory(category, image)}>
                                        Add Category
                                    </button>
                        }
                    </div>

                </div>
            </dialog>

            <dialog open={showForm} className="modal-backdrop-menu z-30" id="modal-backdrop-menu" onClick={toggleModal} />

        </>
    )
}

export default CreateCategory;