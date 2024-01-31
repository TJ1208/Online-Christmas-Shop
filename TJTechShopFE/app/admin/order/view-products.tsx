"use client"

import { OrderModel } from "@/app/models/order";
import { OrderProductModel } from "@/app/models/order_product";
import { ProductModel } from "@/app/models/product";
import ModalToggle from "@/app/scripts/modal";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ViewProductsButton = (data: { order: OrderModel, products: ProductModel[], orderProducts: OrderProductModel[] }) => {
    const order = data.order;
    const [showProducts, setShowProducts] = useState<boolean>(false);

    const toggleModal = () => {
        ModalToggle("modal-products", "modal-backdrop-products");
        setShowProducts(old => !old);
    }

    return (
        <>
            <FontAwesomeIcon icon={faImage} className="nav-button " onClick={() => setShowProducts(old => !old)} />
            <dialog open={showProducts} className="modal z-40 max-h-[600px] overflow-x-clip overflow-y-scroll" id="modal-products">
                <div className="flex items-center">
                    <h1 className="text-center border-b pb-2 font-semibold text-base w-full p-2">{order.user?.first_name}&apos;s Order</h1>
                    <FontAwesomeIcon icon={faX} className="font-awesome-icon absolute right-0 bg-slate-400" onClick={toggleModal} />
                </div>
                <div className="flex flex-col items-center p-2 bg-slate-900">
                    {
                        order.products?.map(product => data.products.filter(dataProduct => dataProduct.product_id == product.product_id)
                            .map(product => data.orderProducts.filter(orderProduct => orderProduct.product_id == product.product_id).map(orderProduct => (
                                <div key={product.product_id}>

                                    <div className="shadow w-full shadow-slate-800 rounded my-2 container mx:auto flex flex-col justify-center items-center bg-slate-900">
                                        <img src={product.images![0].url} alt="" className="object-cover min-h-[180px] max-h-[180px]" key={product.product_id} />
                                        <p className="shadow shadow-white rounded-full bg-slate-900 text-center text-blue-300 w-fit px-2 py-1 m-2 font-semibold">{product.name}</p>
                                        <p className="shadow shadow-white rounded-full bg-slate-900 text-center text-yellow-300 w-fit px-2 py-1 m-2">Quantity: <span className="font-semibold">{orderProduct.quantity}</span></p>
                                        <p className="shadow shadow-white rounded-full bg-slate-900 text-center text-green-300 w-fit px-2 py-1 m-2">Price: $<span className="font-semibold">{product.sale_price > 0 ? product.sale_price : product.price} / ${product.sale_price > 0 ? (product.sale_price * orderProduct.quantity).toFixed(2) : (product.price * orderProduct.quantity).toFixed(2)}</span></p>
                                    </div>
                                </div>
                            ))))
                    }
                </div>
            </dialog>

            <dialog open={showProducts} className="modal-backdrop-menu z-30" id="modal-backdrop-products" onClick={toggleModal} />
        </>
    )
}

export default ViewProductsButton;