"use client"

import { addImage } from "@/app/api/image";
import { addProduct, addProductToImage, getAllProducts } from "@/app/api/product";
import { BrandModel } from "@/app/models/brand";
import { ImageModel } from "@/app/models/image";
import { ProductModel } from "@/app/models/product";
import SubCategoryModel from "@/app/models/sub-category";
import FetchImage from "@/app/scripts/fetch-image";
import getDate from "@/app/scripts/get-current-date";
import ModalToggle from "@/app/scripts/modal";
import { faSquarePlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const CreateProduct = () => {
    let router = useRouter();
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [categories, setCategories] = useState<SubCategoryModel[]>([]);
    const [brands, setBrands] = useState<BrandModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://tjtechbe.tcjcoding.com/sub/category`);
            const data = await response.json();
            setCategories(data);
            const brandResponse = await fetch(`https://tjtechbe.tcjcoding.com/brand`);
            const brandData = await brandResponse.json();
            setBrands(brandData);
        }
        fetchData();
    }, [])

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
        sale_price: 0,
        create_time: "",
        category_id: 0,
        brand_id: 0
    })

    const [image, setImage] = useState({
        url: '',
        create_time: ''
    })

    const [message, setMessage] = useState({
        isError: false
    })

    const changeHandler = (event: ChangeEvent<any>) => {
        setProduct({
            ...product,
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


    const CreateProduct = (productData: ProductModel, imageData: ImageModel) => {
        const number = Math.random() * 100;
        productData.name = productData.name.trim();
        imageData.url = imageData.url.replaceAll(" ", "");
        imageData.create_time = getDate();
        productData = {
            name: productData.name.trim(),
            description: productData.description,
            price: Math.round(productData.price *100) / 100,
            sale_price: Math.round(productData.sale_price *100) / 100,
            create_time: getDate(),
            category_id: productData.category_id,
            brand_id: productData.brand_id
        };
        FetchImage(imageData.url, number.toString(), "products");
        imageData = {
            url: `https://tjcoding.sirv.com/products/${number.toString()}.jpg`,
            create_time: getDate()
        }
        addImage(imageData).then((resultImage) => {
            addProduct(productData).then((resultProduct) => {
                setMessage({ isError: resultProduct.name == undefined ? true : false })
                addProductToImage({ product_id: resultProduct.product_id!, image_id: resultImage.image_id! });
                setShowMessage(old => !old)
                setTimeout(() => {
                    setShowMessage(old => !old)
                }, 3000)
                setProduct({
                    name: "",
                    description: "",
                    price: 0,
                    sale_price: 0,
                    create_time: "",
                    category_id: 0,
                    brand_id: 0
                });
                setImage({
                    url: "",
                    create_time: ""
                })
                getAllProducts().then(() => {
                    router.refresh();
                })
            })
        })
    }
    return (
        <>
            <FontAwesomeIcon icon={faSquarePlus} className="hover:cursor-pointer hover:text-green-200 nav-button" onClick={() => setShowForm(old => !old)} />

            <dialog open={showForm} className="modal z-40" id="modal">


                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">Add product</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon bg-slate-400 hover:bg-slate-500 absolute right-0" onClick={toggleModal} />
                </div>
                <div>

                </div>
                <div className="border p-1">
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Name: </label>
                        <input type="text" name="name" value={product.name} placeholder="Product Name" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Description:</label>
                        <textarea name="description" value={product.description} placeholder="Product Description" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Price: </label>
                        <input type="number" name="price" value={product.price == 0 ? "" : product.price} className="input" placeholder="e.g. 19.99" onChange={(changeHandler)} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">Sales Price: </label>
                        <input type="number" name="sale_price" value={product.sale_price == 0 ? "" : product.sale_price} placeholder="e.g. 9.99" step="none" className="input" onChange={changeHandler} />
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Category: </label>
                        <select name="category_id" value={product.category_id != 0 ? product.category_id : ""} className="input " onChange={changeHandler} >
                            <option value="" disabled hidden>Select Category</option>
                            {
                                categories.map((category) => (
                                    <option value={category.id} key={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Brand: </label>
                        <select name="brand_id" value={product.brand_id != 0 ? product.brand_id : ""} className="input mx-6" onChange={changeHandler} >
                            <option value="" disabled hidden>Select Brand</option>
                            {
                                brands.map((brand) => (
                                    <option value={brand.brand_id} key={brand.brand_id}>{brand.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex items-center p-2">
                        <label className="p-2">*&nbsp;Image(s): </label>
                        <textarea name="url" value={image.url} placeholder="Image URL" className="input" onChange={changeHandlerImage} />
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            showMessage && !message.isError
                                ?
                                <>
                                    <button className="shadow m-2 p-2 bg-green-100 hover:opacity-90 flex items-center justify-cente rounded">
                                        <p>Product Added</p>
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
                                    <button className="border m-2 p-2 bg-gray-300 hover:bg-slate-400 rounded" disabled={(product.name == "" || product.description == "" || image.url == ""
                                        || product.price == 0 || product.category_id == 0 || product.brand_id == 0)} onClick={() => CreateProduct(product, image)}>
                                        Add Product
                                    </button>
                        }
                    </div>

                </div>
            </dialog>

            <dialog open={showForm} className="modal-backdrop-menu z-30" id="modal-backdrop-menu" onClick={toggleModal} />

        </>
    )
}

export default CreateProduct;