import CategoryModel from "@/app/models/category"

export const getAllCategories = async (): Promise<CategoryModel[]> => {
    const response = await fetch("https://techspecbe.azurewebsites.net/category", {
        next: {
            revalidate: 0
        }
    })
    const data = await response.json();
    return data;
}

export const  addCategory = async (category: CategoryModel): Promise<CategoryModel> => {
    const response = await fetch('https://techspecbe.azurewebsites.net/category', {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const  updateCategory = async (category: CategoryModel, name: string): Promise<CategoryModel> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/category/${name}`, {
        method: 'PUT',
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const deleteCategory = async (name: string): Promise<string> => {
    const response = await fetch(`https://techspecbe.azurewebsites.net/category/${name}`, {
        method: 'DELETE',
    });
    return response.json();
}

export default getAllCategories;