"use client"

import getAllCategories, { addCategory } from "@/app/api/category";
import { addImage } from "@/app/api/image";
import CategoryModel from "@/app/models/category";
import { ImageModel } from "@/app/models/image";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export function CreateCategory() {
    let router = useRouter();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [category, setCategory] = useState({
        name: '',
        image_id: 0
    })
    const [image, setImage] = useState({
        url: "",
        create_time: ""
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

    const CreateCategory = (categoryData: CategoryModel, imageData: ImageModel) => {
        imageData.create_time = getDate();
        addImage(imageData).then(result => {
            categoryData.image_id = result.image_id || 0;
            addCategory(categoryData).then(() => {
                getAllCategories().then(() => {
                    router.refresh();
                });
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
                showForm
                    ?
                    <div className="modal">
                        <div>
                            <h1 className="text-center border-b pb-2 font-semibold text-base">Add Category</h1>
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
                    </div>
                    :
                    <>
                    </>
            }
            {
                showForm
                    ?
                    <div className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black/40" onClick={() => setShowForm(old => !old)}>
                    </div>
                    :
                    <>
                    </>
            }
        </>
    )
}

export default CreateCategory;