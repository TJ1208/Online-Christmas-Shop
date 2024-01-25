import { BrandModel } from "../models/brand";

export const getAllBrands = async (): Promise<BrandModel[]> => {
    const response = await fetch("https://tjtechbe.tcjcoding.com/brand")
    const data = await response.json();
    return data;
}

export const  addBrand = async (brand: BrandModel): Promise<BrandModel> => {
    const response = await fetch('https://tjtechbe.tcjcoding.com/brand', {
        method: 'POST',
        body: JSON.stringify(brand),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const  updateBrand = async (brand: BrandModel, name: string): Promise<BrandModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/brand/${name}`, {
        method: 'PUT',
        body: JSON.stringify(brand),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const deleteBrand = async (name: string): Promise<string> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/brand/${name}`, {
        method: 'DELETE',
    });
    return response.json();
}

export default getAllBrands;