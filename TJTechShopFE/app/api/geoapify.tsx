import { GeoapifyModel } from "../models/geoapify";

const getGeoapifyAddress = async (address: string): Promise<GeoapifyModel> => {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=2106ef00b761402dab782d0b1d0ab042`);
    const data = await response.json();
    return data;
}

export default getGeoapifyAddress;