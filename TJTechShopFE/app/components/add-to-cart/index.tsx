"use client"

import { ProductModel } from "@/app/models/product";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

function AddToCart(product: ProductModel) {
    const router = useRouter();
    const [quantity, setQuantity] = useState({ quantity: "1" });

    const changeHandler = (event: ChangeEvent<any>) => {
        console.log(event.target.value)
        setQuantity({
            ...quantity,
            [event.target.name]: event.target.value
        })
    }

    return (
        <>
            <div className="flex flex-col p-3">
                <button className="bg-slate-500 rounded-full px-3 p-2 shadow-sm home-button font-medium text-gray-300" onClick={() => {
                    router.push(`/product?product_id=${product.product_id}`)
                }}>Add To Cart</button>
                <select name="quantity" value={quantity.quantity} className="home-button px-3 p-2 my-3 rounded-full text-center text-blue-200 font-medium hover:cursor-pointer" onChange={changeHandler}>
                    <option value="1" disabled hidden>Quantity: &nbsp;&nbsp;1</option>
                    <option value="2" className="bg-black text-white bg-opacity-60 text-center">Quantity: 2</option>
                    <option value="3" className="bg-black text-white bg-opacity-60 text-center">Quantity: 3</option>
                    <option value="4" className="bg-black text-white bg-opacity-60 text-center">Quantity: 4</option>
                    <option value="5" className="bg-black text-white bg-opacity-60 text-center">Quantity: 5</option>
                    <option value="6" className="bg-black text-white bg-opacity-60 text-center">Quantity: 6</option>
                    <option value="7" className="bg-black text-white bg-opacity-60 text-center">Quantity: 7</option>
                    <option value="8" className="bg-black text-white bg-opacity-60 text-center">Quantity: 8</option>
                    <option value="9" className="bg-black text-white bg-opacity-60 text-center">Quantity: 9</option>
                    <option value="10" className="bg-black text-white bg-opacity-60 text-center">Quantity: 10</option>

                </select>
            </div>

        </>
    )
}

export default AddToCart;