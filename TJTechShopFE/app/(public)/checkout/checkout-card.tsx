"use client"

import { GetCartItems } from "@/app/api/cart";
import getGeoapifyAddress from "@/app/api/geoapify";
import { AddressModel } from "@/app/models/address";
import { CartProductModel } from "@/app/models/cart_product";
import { GeoapifyModel } from "@/app/models/geoapify";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import CheckoutItem from "./checkout-item";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleExclamation, faTrash, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import ProductLoad from "../products/product-load";
import getUserAddresses, { addAddress, deleteAddress, updateAddress } from "@/app/api/address";
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";

const CheckoutCard = () => {
    const params = useSearchParams();
    const [geoapifyData, setGeoapifyData] = useState<GeoapifyModel>();
    const [cartItems, setCartItems] = useState<CartProductModel[]>([]);
    const [showAddressSuggestion, setShowAddressSuggestion] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<AddressModel[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<AddressModel>();
    const [shippingMethod, setShippingMethod] = useState({ shipping_id: 0, price: 0 })
    const today = new Date(); const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1;
    let dd: any = today.getDate();
    if (mm == 1) {
        mm = "Jan";
    } else if (mm == 2) {
        mm = "Feb"
    } else if (mm == 3) {
        mm = "Mar"
    } else if (mm == 4) {
        mm = "Apr"
    } else if (mm == 5) {
        mm = "May"
    } else if (mm == 6) {
        mm = "Jun"
    } else if (mm == 7) {
        mm = "Jul"
    } else if (mm == 8) {
        mm = "Aug"
    } else if (mm == 9) {
        mm = "Sep"
    } else if (mm == 10) {
        mm = "Oct"
    } else if (mm == 11) {
        mm = "Nov"
    } else if (mm == 12) {
        mm = "Dec"
    }
    const formattedToday = mm + " " + dd + ", " + yyyy;
    const date = formattedToday;
    const [newAddress, setNewAddress] = useState<AddressModel>({
        user_id: 0,
        street: "",
        apt: "",
        city: "",
        country: "",
        state: "",
        zipcode: "",
        active: false
    });

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewAddress({
            ...newAddress,
            [event.target.name]: event.target.value
        })
        if (event.target.name == "street" && newAddress.street.length >= 3) {
            setShowAddressSuggestion(true);
            const fetchData = async () => {
                const geoapifyData = await getGeoapifyAddress(newAddress.street);
                setGeoapifyData(geoapifyData);

            }
            fetchData();
        } else {
            setShowAddressSuggestion(false);
        }

    }

    const addUserAddress = (address: AddressModel) => {
        const currentAddress = addresses.find(address => address.active == true);
        if (currentAddress) {
            updateAddress({
                address_id: currentAddress.address_id,
                user_id: currentAddress.user_id,
                street: currentAddress.street,
                apt: currentAddress.apt,
                city: currentAddress.city,
                state: currentAddress.state,
                country: currentAddress.country,
                zipcode: currentAddress.zipcode,
                active: false
            }, currentAddress?.address_id || 0)
        }

        address.active = true;
        addAddress(address).then((result) => {
            setSelectedAddress({
                address_id: result.address_id,
                user_id: result.user_id,
                street: result.street,
                apt: result.apt,
                city: result.city,
                state: result.state,
                country: result.country,
                zipcode: result.zipcode,
                active: true
            })
            setNewAddress({
                user_id: 0,
                street: "",
                apt: "",
                city: "",
                country: "",
                state: "",
                zipcode: "",
                active: false
            });
            getUserAddresses(cartItems[0].cart?.user_id || 0).then((result) => {
                setAddresses(result);
                setShowAddressForm(false);
            })
        });

    }

    const changeAddress = (address: AddressModel) => {
        const currentAddress = addresses.find(address => address.active == true);
        if (currentAddress) {
            updateAddress({
                address_id: currentAddress.address_id,
                user_id: currentAddress.user_id,
                street: currentAddress.street,
                apt: currentAddress.apt,
                city: currentAddress.city,
                state: currentAddress.state,
                country: currentAddress.country,
                zipcode: currentAddress.zipcode,
                active: false
            }, currentAddress?.address_id || 0)
        }
        updateAddress(address, address.address_id || 0).then(() => {
            setSelectedAddress(address);
            getUserAddresses(cartItems[0].cart?.user_id || 0).then((result) => {
                setAddresses(result);
            })
        })
    }

    const removeAddress = (address_id: number) => {
        deleteAddress(address_id).then(() => {
            getUserAddresses(cartItems[0].cart?.user_id || 0).then((result) => {
                setAddresses(result);
            })
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const cartItems = await GetCartItems(parseInt(params.get("cart_id") || "0"));
            setCartItems(cartItems);
            const addresses = await getUserAddresses(cartItems[0].cart?.user_id || 0);
            setAddresses(addresses);
            setSelectedAddress(addresses.find(address => address.active));
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <>
            {
                isLoading
                    ?
                    <ProductLoad />
                    :
                    <div className="flex flex-col justify-center items-center w-full">
                        <div className="lg:flex-row lg:gap-10 flex flex-col items-start justify-center shadow-xl p-5 relative">
                            <div className="lg:border-r lg:pr-10 flex flex-col items-center justify-between w-full">
                                <div className="flex gap-5 shadow-xl mb-10">
                                    <Link href={`/cart?user_id=${cartItems[0].cart?.user_id}`} className="nav-button border-b"><sub>Cart</sub></Link>
                                    <Link href={`/cart?user_id=${cartItems[0].cart?.user_id}`} className="nav-button border-b"><sub>Shipping</sub></Link>
                                    <Link href={`/cart?user_id=${cartItems[0].cart?.user_id}`} className="nav-button border-b"><sub>Payment</sub></Link>
                                    <Link href={`/cart?user_id=${cartItems[0].cart?.user_id}`} className="nav-button border-b"><sub>Review</sub></Link>
                                </div>
                                <div className="lg:hidden w-full border-t my-5">


                                    {
                                        cartItems.map(cart => (
                                            <div className="flex w-full items-center justify-between shadow-xl" key={cart.product?.product_id}>
                                                <CheckoutItem {...cart} />
                                            </div>

                                        ))
                                    }
                                    <div className="flex flex-col gap-5 p-2 font-medium text-white my-5">
                                        <div className="w-full flex justify-between items-center">
                                            <p>Subtotal:</p>
                                            <span>${params.get("total")}</span>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p>Shipping:</p>
                                            {
                                                shippingMethod.price > 0
                                                    ?
                                                    <p>${shippingMethod.price}</p>
                                                    :
                                                    <sup className="text-slate-400 flex">* Calculated At Shipping</sup>
                                            }
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p>Sales Taxes:</p>
                                            <span>${(parseFloat(params.get("total") || "0") * .0475).toFixed(2)}</span>
                                        </div>
                                        <div className="w-full flex justify-between items-center border-t pt-5">
                                            <p>Total:</p>
                                            <span>${parseFloat((params.get("total") || "0") + parseFloat(params.get("total") || "0") * .0475).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                <label className="text-left w-full font-semibold italic text-lg p-2">Saved Addresses</label>
                                {
                                    addresses.length == 0
                                        ?
                                        <>
                                            <p className="py-5 text-sm opacity-50">No Saved Addresses</p>
                                        </>
                                        :
                                        <>

                                            <div className="w-full flex flex-col gap-3">
                                                {
                                                    addresses.map(address => (
                                                        <div className="flex items-center w-full justify-between px-3 py-5 shadow-xl home-button rounded" key={address.address_id} onClick={() => address.active ? "" : changeAddress({
                                                            address_id: address.address_id,
                                                            user_id: address.user_id,
                                                            street: address.street,
                                                            apt: address.apt,
                                                            city: address.city,
                                                            state: address.state,
                                                            country: address.country,
                                                            zipcode: address.zipcode,
                                                            active: true
                                                        })}>
                                                            <input type="radio" checked={address.active} onChange={changeHandler} className="ml-5" />
                                                            <p className="text-blue-200 px-3 text-center sm:text-left">{address.street}, {address.city}, {address.country} {address.zipcode}</p>
                                                            <button className="btn-hover hover:bg-red-500 hover:opacity-50 rounded-full px-2 py-1" onClick={() => removeAddress(address.address_id || 0)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </div>
                                                    ))
                                                }
                                                <p className="underline underline-offset-4 nav-button hover:text-blue-200 p-2" onClick={() => setShowAddressForm(old => !old)}>+ Add Address</p>
                                            </div>
                                        </>
                                }

                                {
                                    showAddressForm || addresses.length == 0
                                        ?
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <p className="text-left w-full font-semibold italic text-lg p-2">Shipping Address</p>

                                            <div className="w-full flex flex-col items-center relative">
                                                <input type="text" value={newAddress.street} autoComplete="one-time-code" name="street" placeholder="Address" className="public-input" onChange={changeHandler} />
                                                <div className="text-gray-500 border bg-white rounded-sm w-full absolute top-12 my-1 z-50 h-56 overflow-y-scroll" hidden={!showAddressSuggestion}>
                                                    <p className="p-2 font-medium border-b">Suggestions</p>
                                                    <div className="flex flex-col rounded-full">
                                                        {
                                                            geoapifyData?.features.map(address => (
                                                                <label className="px-3 py-2 hover:bg-gray-200 hover:transition-all hover:cursor-pointer whitespace-nowrap text-xs sm:text-sm" onClick={() => {
                                                                    setNewAddress({
                                                                        user_id: cartItems[0].cart?.user_id || 0,
                                                                        street: address.properties.address_line1,
                                                                        apt: newAddress.apt,
                                                                        city: address.properties.city,
                                                                        country: address.properties.country,
                                                                        state: address.properties.state_code,
                                                                        zipcode: address.properties.postcode,
                                                                        active: false
                                                                    });
                                                                    setShowAddressSuggestion(false);
                                                                }} key={address.properties.lat}>{address.properties.address_line1}, {address.properties.city}, {address.properties.state_code?.toUpperCase()} {address.properties.postcode}</label>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="text" autoComplete="one-time-code" name="apt" value={newAddress.apt} placeholder="Apartment, suite, etc. (optional)" className="public-input" onChange={changeHandler} />
                                            <input type="text" autoComplete="one-time-code" name="city" value={newAddress.city} placeholder="City" className="public-input" onChange={changeHandler} />
                                            <div className="flex w-full items-center sm:flex-row flex-col">
                                                <input type="text" autoComplete="one-time-code" name="country" value={newAddress.country} placeholder="Country" className="public-input" onChange={changeHandler} />
                                                <input type="text" autoComplete="one-time-code" name="state" value={newAddress.state} placeholder="State" className="public-input" onChange={changeHandler} />
                                                <input type="text" autoComplete="one-time-code" name="zipcode" value={newAddress.zipcode.trim()} placeholder="Zipcode" className="public-input" onChange={changeHandler} />
                                            </div>

                                            <button className="nav-button border hover:bg-green-100 hover:text-black" disabled={newAddress.street == "".trim() || newAddress.city == "".trim() || newAddress.country == "".trim() || newAddress.state == "".trim() || newAddress.zipcode == "".trim()}
                                                onClick={() => addUserAddress(newAddress)}>Add</button>
                                        </div>
                                        :
                                        <>
                                        </>
                                }
                                <label className="text-left w-full font-semibold italic text-lg p-2">Shipping Method</label>
                                <div className="w-full grid gap-3">
                                    <div className="flex items-center w-full justify-between px-3 py-5 shadow-xl home-button rounded" onClick={() => setShippingMethod({ shipping_id: 1, price: parseFloat((parseFloat((params.get("total") || "0")) * .005).toFixed(2)) })}>
                                        <input type="radio" checked={shippingMethod.shipping_id == 1} onChange={changeHandler} className="ml-5" />
                                        <div className="flex gap-1 items-center justify-center">
                                            <p className="text-blue-200 px-3 text-center sm:text-left">Basic Delivery</p>
                                            <FontAwesomeIcon icon={faTruck} size="lg" className="text-blue-300 border-gray-500 hover:nav-button" />
                                        </div>
                                        {/* <p>Expected Delivery: <span>{date}</span></p> */}
                                        <p className="text-red-200"><span className="font-semibold italic">6-10</span> Business Days</p>
                                        <p className="text-green-200 font-medium">${(parseFloat((params.get("total") || "0")) * .005).toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center w-full justify-between px-3 py-5 shadow-xl home-button rounded" onClick={() => setShippingMethod({ shipping_id: 2, price: parseFloat((parseFloat((params.get("total") || "0")) * .009).toFixed(2)) })}>
                                        <input type="radio" checked={shippingMethod.shipping_id == 2} onChange={changeHandler} className="ml-5" />
                                        <div className="flex gap-1 items-center justify-center">
                                            <p className="text-blue-200 px-3 text-center sm:text-left">Express Delivery</p>
                                            <FontAwesomeIcon icon={faTruckFast} size="lg" className="text-blue-300 border-gray-500 hover:nav-button" />
                                        </div>
                                        <p className="text-red-200"><span className="font-semibold italic">3-5</span> Business Days</p>
                                        <p className="text-green-200 font-medium">${(parseFloat((params.get("total") || "0")) * .008).toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center w-full justify-between px-3 py-5 shadow-xl home-button rounded" onClick={() => setShippingMethod({ shipping_id: 3, price: parseFloat((parseFloat((params.get("total") || "0")) * .0125).toFixed(2)) })}>
                                        <input type="radio" checked={shippingMethod.shipping_id == 3} onChange={changeHandler} className="ml-5" />
                                        <div className="flex gap-1 items-center justify-center">
                                            <p className="text-blue-200 px-3 text-center sm:text-left">Urgent Delivery</p>
                                            <FontAwesomeIcon icon={faCircleExclamation} size="lg" className="text-blue-300 hover:nav-button" />
                                        </div>
                                        <p className="text-red-200"><span className="font-semibold italic">1-2</span> Business Days</p>
                                        <p className="text-green-200 font-medium">${(parseFloat((params.get("total") || "0")) * .0125).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="w-full p-5 flex flex-col gap-5 items-center">
                                    <button disabled={selectedAddress ? false : true}
                                        className="nav-button border border-gray-600 hover:bg-blue-300 hover:transition-all hover:text-gray-800 rounded p-2 gap-2 font-medium text-gray-200">Continue to Payment</button>
                                    <div className="flex items-center justify-center nav-button border border-gray-600 hover:bg-blue-300 hover:transition-all hover:text-gray-800 rounded p-2 gap-2 font-medium text-gray-200">
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                        <Link href={`/cart?user_id=${1}`}>Return To Cart</Link>
                                    </div>

                                </div>
                            </div>
                            <div className="lg:flex lg:flex-col hidden w-full my-5">


                                {
                                    cartItems.map(cart => (
                                        <div className="flex w-full items-center justify-between shadow-xl" key={cart.product?.product_id}>
                                            <CheckoutItem {...cart} />
                                        </div>

                                    ))

                                }
                                <div className="flex flex-col gap-5 p-2 font-medium text-white my-5">
                                    <div className="w-full flex justify-between items-center">
                                        <p>Subtotal:</p>
                                        <span>${params.get("total")}</span>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p>Shipping:</p>
                                        {
                                            shippingMethod.price > 0
                                                ?
                                                <p>${shippingMethod.price}</p>
                                                :
                                                <sup className="text-slate-400 flex">* Calculated At Shipping</sup>
                                        }
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p>Sales Taxes:</p>
                                        <span>${(parseFloat(params.get("total") || "0") * .0475).toFixed(2)}</span>
                                    </div>
                                    <div className="w-full flex justify-between items-center border-t pt-5">
                                        <p>Total:</p>
                                        <span>${(parseFloat(params.get("total") || "0") + parseFloat(params.get("total") || "0") * .0475).toFixed(2)}</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

            }
        </>
    )
}

export default CheckoutCard;