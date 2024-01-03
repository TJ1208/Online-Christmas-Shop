import { ImageModel } from "../models/image";

export const getAllImages = async (): Promise<ImageModel[]> => {
    const response = await fetch(`http://localhost:5000/image`, {
        next: {
            revalidate: 0
        },
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}

export const addImage = async (image: ImageModel): Promise<ImageModel> => {
    const response = await fetch('http://localhost:5000/image', {
        method: 'POST',
        body: JSON.stringify(image),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const deleteImage = async (id: number): Promise<string> => {
    const response = await fetch(`http://localhost:5000/image/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });
    return response.json();
}

