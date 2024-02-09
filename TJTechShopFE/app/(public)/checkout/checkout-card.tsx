"use client"

import { GetCartItems } from "@/app/api/cart";
import getGeoapifyAddress from "@/app/api/geoapify";
import { AddressModel } from "@/app/models/address";
import { CartProductModel } from "@/app/models/cart_product";
import { GeoapifyModel } from "@/app/models/geoapify";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCircleExclamation, faEnvelope, faPhone, faTrash, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import ProductLoad from "../products/product-load";
import getUserAddresses, { addAddress, deleteAddress, updateAddress } from "@/app/api/address";
import { faTruck } from "@fortawesome/free-solid-svg-icons/faTruck";
import CheckoutNavbar from "./checkout-navbar";
import CheckoutTotal from "./checkout-total";
import CheckoutForm from "../../components/payment/index";
import { ShippingMethodModel } from "@/app/models/shipping-method";
import { getAllShippingMethods, getShippingMethodById } from "@/app/api/shipping-method";

const CheckoutCard = () => {
    const router = useRouter();
    const params = useSearchParams();
    const [isPayment, setIsPayment] = useState<boolean>(false);
    const [isReview, setIsReview] = useState<boolean>(false);
    const [geoapifyData, setGeoapifyData] = useState<GeoapifyModel>();
    const [cartItems, setCartItems] = useState<CartProductModel[]>([]);
    const [showAddressSuggestion, setShowAddressSuggestion] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showAddressForm, setShowAddressForm] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<AddressModel[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<AddressModel>();
    const [shippingMethod, setShippingMethod] = useState<ShippingMethodModel>({
        name: '',
        rate: 0,
        early_arrival: 0,
        late_arrival: 0
    })
    const [shippingMethods, setShippingMethods] = useState<ShippingMethodModel[]>([]);
    var [orderTotal, setOrderTotal] = useState({ total: (parseFloat((params.get("total") || "0")) + (parseFloat(params.get("total") || "0") * .0475)).toFixed(2), shippingPrice: shippingMethod.rate || 0 });
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

    if (!isPayment && params.get("payment")) {
        setIsPayment(true)
    }

    if (!isReview && params.get("review")) {
        setIsReview(true)
    }

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
                setSelectedAddress(undefined);
            })
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsPayment(params.get("payment") ? true : false);
            setIsReview(params.get("review") ? true : false);
            const cartItems = await GetCartItems(parseInt(params.get("cart_id") || "0"));
            setCartItems(cartItems);
            const addresses = await getUserAddresses(cartItems[0].cart?.user_id || 0);
            setAddresses(addresses);
            const shippingMethods = await getAllShippingMethods();
            setShippingMethods(shippingMethods);
            if (params.get("shipping_method")) {
                const shippingMethod = await getShippingMethodById(parseInt(params.get("shipping_method") || "0"));
                setShippingMethod(shippingMethod);
            }
            setSelectedAddress(addresses.find(address => address.active));
            setIsLoading(false);
        }
        fetchData();
    }, [isPayment, isReview])

    return (
        <>
            {
                isLoading
                    ?
                    <ProductLoad />
                    :
                    <div className="flex flex-col justify-center items-center w-full">
                        <div className="lg:flex-row lg:gap-10 flex flex-col items-start justify-center shadow-xl p-5 w-full">
                            <div className="lg:border-r lg:pr-10 flex flex-col items-center justify-between w-full">
                                <div className="flex gap-5 shadow-xl mb-10">
                                    <CheckoutNavbar {...{ cartItems, currentPage: window.location.search }} />
                                </div>
                                <div className={`${isPayment || isReview ? "hidden" : ""}`}>

                                    <div className="lg:hidden w-full">
                                        <CheckoutTotal {...{ cartItems, orderTotal }} />
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
                                                            <div className={`flex items-center w-full justify-between px-3 py-5 shadow-xl ${address.active ? "bg-blue-400 hover:cursor-pointer" : "home-button"} rounded`} key={address.address_id} onClick={() => address.active ? "" : changeAddress({
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
                                                                <p className={`${address.active ? "text-gray-800 font-semibold" : "text-blue-200"} px-3 text-center sm:text-left`}>{address.street}, {address.city}, {address.country} {address.zipcode}</p>
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
                                        {
                                            shippingMethods.map((method: ShippingMethodModel, i: number) => (
                                                <div className="flex items-center w-full justify-between px-3 py-5 shadow-xl home-button rounded" key={i} onClick={() => { setShippingMethod(method); setOrderTotal({ total: orderTotal.total, shippingPrice: method.rate }) }}>
                                                    <input type="radio" checked={shippingMethod.shipping_id == method.shipping_id} onChange={changeHandler} className="ml-5" />
                                                    <div className="flex gap-1 items-center justify-center">
                                                        <p className="text-blue-200 px-3 text-center sm:text-left">{method.name}</p>
                                                        <FontAwesomeIcon icon={i==0 ? faTruck : i==1 ? faTruckFast : faCircleExclamation} size="lg" className="text-blue-300 border-gray-500 hover:nav-button" />
                                                    </div>
                                                    <p className="text-red-200"><span className="font-semibold italic">{method.early_arrival}-{method.late_arrival}</span> Business Days</p>
                                                    <p className="text-green-200 font-medium">${method.rate}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="w-full p-5 flex flex-col gap-5 items-center">
                                        <button disabled={selectedAddress?.address_id && shippingMethod.shipping_id ? false : true} onClick={() => router.replace(`/checkout?${params}&shipping_method=${shippingMethod.shipping_id}&review=true`)}
                                            className="nav-button border border-gray-600 hover:bg-blue-300 hover:transition-all hover:text-gray-800 rounded p-2 gap-2 font-medium text-gray-200">Review Order</button>
                                        <div className="flex items-center justify-center nav-button border border-gray-600 hover:bg-blue-300 hover:transition-all hover:text-gray-800 rounded p-2 gap-2 font-medium text-gray-200">
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                            <Link href={`/cart?user_id=${1}`}>Return To Cart</Link>
                                        </div>

                                    </div>
                                </div>
                                <div className={`${isReview ? "" : "hidden"} sm:w-9/12`}>
                                    <label className="text-left w-full font-semibold italic text-lg p-2">Shipping To:</label>
                                    {
                                        addresses.filter(address => address.active).map(address => (
                                            <p className="m-2 p-2 text-blue-200 font-medium" key={address.address_id}>{address.street}, {address.city} {address.state} {address.zipcode}</p>
                                        ))
                                    }
                                    <label className="text-left w-full font-semibold italic text-lg p-2">Shipping Method:</label>
                                    <div className="m-5 text-sm">
                                        {
                                            shippingMethods.filter(selectedMethod => selectedMethod.shipping_id == parseInt(params.get("shipping_method") || "0")).map(method => (
                                                <div className="flex items-center w-full justify-between px-3 py-5 shadow-xl home-button rounded" key={method.shipping_id}>
                                                    <div className="flex gap-1 items-center justify-center">
                                                        <p className="text-blue-200 px-3 text-center sm:text-left">{method.name}</p>
                                                        <FontAwesomeIcon icon={faTruck} size="lg" className="text-blue-300 border-gray-500 hover:nav-button" />
                                                    </div>
                                                    <p className="text-red-200"><span className="font-semibold italic">{method.early_arrival}-{method.late_arrival}</span> Business Days</p>
                                                    <p className="text-green-200 font-medium">${method.rate}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <label className="text-left w-full font-semibold italic text-lg p-2">Contact Information:</label>
                                    <div className="flex flex-col gap-5 justify-center m-5">
                                        <p className="text-blue-200 font-medium flex items-center gap-3"><span><FontAwesomeIcon icon={faEnvelope} size="lg" /></span>{addresses.find(address => address.active)?.user?.email}</p>
                                        <p className="text-blue-200 font-medium flex items-center gap-3"><span><FontAwesomeIcon icon={faPhone} size="lg" /></span>{addresses.find(address => address.active)?.user?.phone_number}</p>
                                    </div>
                                    <div className="lg:hidden w-full">
                                        <CheckoutTotal {...{ cartItems, orderTotal }} />
                                    </div>
                                    <div className="w-full p-5 flex flex-col gap-5 items-center">
                                        <button disabled={selectedAddress?.address_id && parseInt(params.get("shipping_method") || "0") != 0 ? false : true} onClick={() => { router.replace(`/checkout?${params.toString().replace("&review=true", "")}&payment=true`) }}
                                            className="nav-button border border-gray-600 hover:bg-blue-300 hover:transition-all hover:text-gray-800 rounded p-2 gap-2 font-medium text-gray-200">Continue To Payment</button>
                                        <div className="flex items-center justify-center nav-button border border-gray-600 hover:bg-blue-300 hover:transition-all hover:text-gray-800 rounded p-2 gap-2 font-medium text-gray-200">
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                            <Link href={`/cart?user_id=${1}`}>Return To Cart</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className={` ${isPayment ? "" : "hidden"}`}>
                                    <CheckoutForm {...cartItems} />
                                </div>
                                {/*  */}
                            </div>
                            <div className="lg:flex hidden w-full">
                                <CheckoutTotal {...{ cartItems, orderTotal }} />
                            </div>
                        </div>
                    </div>

            }
        </>
    )
}

export default CheckoutCard;