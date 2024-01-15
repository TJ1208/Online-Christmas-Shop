"use client"

import { addImage } from "@/app/api/image";
import { addProductToImage, getAllProducts, updateProduct } from "@/app/api/product";
import CategoryModel from "@/app/models/category";
import { ImageModel } from "@/app/models/image";
import { ProductModel } from "@/app/models/product";
import FetchImage from "@/app/scripts/fetch-image";
import getDate from "@/app/scripts/get-current-date";
import ModalToggle from "@/app/scripts/modal";
import { faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export function UpdateProductButton(product: ProductModel) {
    let router = useRouter();
    const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [productUpdate, setProductUpdate] = useState<ProductModel>(product);
    const [image, setImage] = useState<any>(product.images!.length == 0 ? product.images![0] = {image_id: 0, create_time: "", url: ""} : product.images![0]);
    const [message, setMessage] = useState({ isError: false });
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/category`);
            const data = await response.json();
            setCategories(data);
        }
        fetchData();
    }, [])

    const changeHandler = (event: ChangeEvent<any>) => {
        setProductUpdate({
            ...productUpdate,
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
        ModalToggle("modal4", "modal-backdrop-menu4");
        setShowUpdateForm(old => !old);
        setProductUpdate(product);
    }

    const UpdateProduct = (productData: ProductModel, imageData: ImageModel) => {
        productData.name = productData.name.trim();
        if (imageData.url != product.images![0].url) {
            console.log(imageData.url);
            imageData.url = imageData.url.replaceAll(" ", "");
            console.log(imageData.url);
            FetchImage(imageData.url, productData.name, "products");
            imageData = {
                url: `https://tjcoding.sirv.com/products/${productData.name}.jpg`,
                create_time: getDate()
            }
            addImage(imageData).then(resultImage => {
                productData = {
                    name: productUpdate.name,
                    description: productUpdate.description,
                    price: productUpdate.price,
                    sale_price: productUpdate.sale_price,
                    category_id: productUpdate.category_id
                }
                updateProduct(productData, product.product_id!).then((resultProduct) => {
                    addProductToImage({ product_id: product.product_id!, image_id: resultImage.image_id! });
                    setMessage({ isError: resultProduct.name == undefined ? true : false })
                    setShowMessage(old => !old)
                    setTimeout(() => {
                        setShowMessage(old => !old)
                    }, 3000)
                    getAllProducts().then(() => {
                        router.refresh();
                    })
                })
            })
        }
        else {
            productData = {
                name: productUpdate.name,
                description: productUpdate.description,
                price: productUpdate.price,
                sale_price: productUpdate.sale_price <= 0 ? 0 : productUpdate.sale_price,
                category_id: productUpdate.category_id
            }
            updateProduct(productData, product.product_id!).then((result) => {
                setMessage({ isError: result.name == undefined ? true : false })
                setShowMessage(old => !old)
                setTimeout(() => {
                    setShowMessage(old => !old)
                }, 3000)
                getAllProducts().then(() => {
                    router.refresh();
                })
            })
        }
    }
    return (
        <>
            <FontAwesomeIcon icon={faPenToSquare} className="nav-button hover:text-gray-200" onClick={() => setShowUpdateForm(old => !old)} />
            <dialog open={showUpdateForm} className="modal z-40" id="modal4">
                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Update Product</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon absolute right-0 bg-gray-400 hover:bg-gray-500" onClick={toggleModal} />
                </div>
                <div className="border p-1">
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Name: </label>
                        <input type="text" name="name" value={productUpdate.name} placeholder="Product Name" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Description:</label>
                        <textarea name="description" value={productUpdate.description} placeholder="Product Description" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Price: </label>
                        <input type="number" min="0" name="price" value={productUpdate.price == 0 ? "" : productUpdate.price} className="input" placeholder="e.g. 19.99" onChange={(changeHandler)} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">Sales Price: </label>
                        <input type="number" min="0" name="sale_price" value={productUpdate.sale_price == 0 ? "" : productUpdate.sale_price} placeholder="e.g. 9.99" step="none" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Category: </label>
                        <select name="category_id" value={productUpdate.category_id != 0 ? productUpdate.category_id : ""} className="input" onChange={changeHandler} >
                            <option value="" disabled hidden key={0}>Select Category</option>
                            {
                                categories.map((category) => (
                                    <option value={category.category_id} key={category.category_id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Image(s): </label>
                        <textarea name="url" value={product.images!.length == 0 ? "" : image.url} placeholder="Image URL" className="input" onChange={changeHandlerImage} />
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            showMessage && !message.isError
                                ?
                                <>
                                    <button className="shadow m-2 p-2 bg-green-100 hover:opacity-90 flex items-center justify-cente rounded">
                                        <p>Product Updated</p>
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
                                    <button className="border m-2 p-2 bg-gray-300 hover:bg-gray-400 rounded" disabled={(productUpdate.name == "" || productUpdate.description == "" || 
                                    (product.images!.length == 0 ? false : image.url == "")
                                        || productUpdate.price <= 0 || productUpdate.sale_price < 0 || productUpdate.category_id == 0)} onClick={() => UpdateProduct(product, image)}>
                                        Update Product
                                    </button>
                        }
                    </div>

                </div>
            </dialog>

            <dialog open={showUpdateForm} className="modal-backdrop-menu z-30" id="modal-backdrop-menu4" onClick={toggleModal} />
        </>
    )
}

export default UpdateProductButton;