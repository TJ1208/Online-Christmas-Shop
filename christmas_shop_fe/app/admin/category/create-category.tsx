"use client"

import getAllCategories, { addCategory } from "@/app/api/category";
import { addImage } from "@/app/api/image";
import CategoryModel from "@/app/models/category";
import { ImageModel } from "@/app/models/image";
import { FetchImage } from "@/app/scripts/fetch-image";
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
        message: '',
        code: 0
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
        ModalToggle("modal", "modal-backdrop");
        setShowForm(old => !old);
    }


    const CreateCategory = (categoryData: CategoryModel, imageData: ImageModel) => {
        imageData.create_time = getDate();
        FetchImage(imageData.url, categoryData.name);
        imageData.url = `https://tjcoding.sirv.com/categories/${categoryData.name}.jpg`.replaceAll(' ', '%20');
        addImage(imageData).then(result => {
            categoryData.image_id = result.image_id || 0;
            addCategory(categoryData).then((result) => {
                console.log(result);
                setMessage({ message: result.message, code: result.code })
                setShowMessage(old => !old)
                setTimeout(() => {
                    setShowMessage(old => !old)
                }, 5000)
                setImage({ url: "", create_time: "" })
                setCategory({ name: "", image_id: 0 })
                getAllCategories().then(() => {
                    router.refresh();
                })
            })
        })
    }


    const getDate = () => {
        return new Date().toJSON()
            .substring(0, new Date().toJSON().indexOf("T"))
    }

    return (
        <>
            <FontAwesomeIcon icon={faSquarePlus} className="hover:bg-green-200 hover:cursor-pointer text-green-700 nav-button" onClick={() => setShowForm(old => !old)} />
            {
                (showMessage && message.code == 201)
                    ?
                    <p className={`modal-message bg-green-100`}>Success!</p>
                    :
                    <>
                    </>
            }
            {
                (showMessage && message.code == 500)
                    ?
                    <p className={`modal-message bg-red-100`}>Error...</p>
                    :
                    <>
                    </>
            }
            <dialog open={showForm} className="modal z-40" id="modal">


                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Add Category</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon border-2 absolute right-0" onClick={toggleModal} />
                </div>
                <div>

                </div>
                <div className="border p-1">
                    <div className="flex items-center p-2">
                        <label className="p-2">Name: </label>
                        <input type="text" name="name" value={category.name} placeholder="Category Name" className="input" onChange={changeHandler} />
                    </div>
                    <div>
                        <div className="flex items-center p-2">
                            <label className="p-2">Image:</label>
                            <textarea name="url" value={image.url} placeholder="Image URL" className="input h-auto" onChange={changeHandlerImage} />
                        </div>
                        <div className="flex flex-col items-center p-2 border">
                            <label className="border-b w-full text-center">Preview</label>
                            <img src={image.url} alt="" className=" object-cover min-h-[180px] max-h-[180px]" />
                        </div>

                    </div>
                    <button className={(image.url != "" && category.name != "") ? `w-full text-center nav-button shadow bg-slate-100`
                        : `w-full text-center nav-button hover:bg-slate-100 bg-slate-100`}
                        disabled={(image.url != "" && category.name != "") ? false : true} onClick={() => CreateCategory(category, image)}>Add</button>
                </div>
            </dialog>

            <dialog open={showForm} className="modal-backdrop z-30" id="modal-backdrop" onClick={toggleModal} />

        </>
    )
}

export default CreateCategory;