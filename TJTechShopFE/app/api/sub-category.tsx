import SubCategoryModel from "../models/sub-category";

export const getAllSubCategories = async (): Promise<SubCategoryModel[]> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/sub/category`, {
        next: {
            revalidate: 0
        }
    })
    const data = await response.json();
    return data;
}

export const  addSubCategory = async (category: SubCategoryModel): Promise<SubCategoryModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/sub/category`, {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const  updateSubCategory = async (category: SubCategoryModel, name: string): Promise<SubCategoryModel> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/sub/category/${name}`, {
        method: 'PUT',
        body: JSON.stringify(category),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }

    });
    return response.json();
}

export const deleteSubCategory = async (name: string): Promise<string> => {
    const response = await fetch(`https://tjtechbe.tcjcoding.com/sub/category/${name}`, {
        method: 'DELETE',
    });
    return response.json();
}

export default getAllSubCategories;