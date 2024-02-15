import { AddressModel } from "../models/address";

export const getUserAddresses = async (user_id: number): Promise<AddressModel[]> => {
    const response = await fetch(`http://localhost:5000/address/${user_id}`, {
        next: {
            revalidate: 0
        }
    })
    const data = await response.json();
    return data;
}

export const getAddress = async (address_id: number): Promise<AddressModel> => {
    const response = await fetch(`http://localhost:5000/address/id/${address_id}`)
    const data = await response.json();
    return data;
}

export const  addAddress = async (address: AddressModel): Promise<AddressModel> => {
    const response = await fetch(`http://localhost:5000/address`, {
        method: 'POST',
        body: JSON.stringify(address),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const  updateAddress = async (address: AddressModel, address_id: number): Promise<AddressModel> => {
    const response = await fetch(`http://localhost:5000/address/id/${address_id}`, {
        method: 'PUT',
        body: JSON.stringify(address),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const deleteAddress = async (address_id: number): Promise<string> => {
    const response = await fetch(`http://localhost:5000/address/id/${address_id}`, {
        method: 'DELETE',
    });
    return response.json();
}

export default getUserAddresses;