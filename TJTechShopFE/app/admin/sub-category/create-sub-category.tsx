"use client"

import getAllSubCategories, { addSubCategory } from "@/app/api/sub-category";
import CategoryModel from "@/app/models/category";
import SubCategoryModel from "@/app/models/sub-category";
import ModalToggle from "@/app/scripts/modal";
import { faSquarePlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export function CreateSubCategory() {
    let router = useRouter();
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [category, setCategory] = useState({
        name: '',
        category_id: 0
    })
    const [message, setMessage] = useState({
        isError: false
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://tjtechbe.tcjcoding.com/category`);
            const data = await response.json();
            setCategories(data);
        }
        fetchData();
    }, [])

    const changeHandler = (event: ChangeEvent<any>) => {
        setCategory({
            ...category,
            [event.target.name]: event.target.value
        })
    }

    const toggleModal = () => {
        ModalToggle("modal", "modal-backdrop-menu");
        setShowForm(old => !old);
    }


    const CreateCategory = (categoryData: SubCategoryModel) => {
        categoryData.name = categoryData.name.trim();

        addSubCategory(categoryData).then((result) => {
            setMessage({ isError: result.name == undefined ? true : false })
            setShowMessage(old => !old)
            setTimeout(() => {
                setShowMessage(old => !old)
            }, 3000)

            setCategory({ name: "", category_id: 0 })
            getAllSubCategories().then(() => {
                router.refresh();
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
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Parent Category: </label>
                        <select name="category_id" value={category.category_id != 0 ? category.category_id : ""} className="input" onChange={changeHandler} >
                            <option value="" disabled hidden key={0}>Select Category</option>
                            {
                                categories.map((category) => (
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
                                    <button className="bg-slate-200 hover:bg-slate-300 border m-2 p-2 rounded" disabled={(category.name == "")} onClick={() => CreateCategory(category)}>
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

export default CreateSubCategory;