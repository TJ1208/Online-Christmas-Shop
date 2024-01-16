import CategoryModel from "../../models/category";
import { getAllCategories } from "@/app/api/category";
import CreateSubCategory from "./create-sub-category";
import DeleteSubCategoryButton from "./delete-sub-category";
import UpdateSubCategoryButton from "./update-sub-category";
import getAllSubCategories from "@/app/api/sub-category";
import SubCategoryModel from "@/app/models/sub-category";

const AdminCategory = async () => {
    const categories = await getAllCategories();
    const subCategories = await getAllSubCategories();
    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left rounded">
                    <caption className="caption-top p-5 font-semibold">
                        Sub-Categories
                        {
                            <p>({subCategories.length})</p>
                        }
                    </caption>

                    <thead className="bg-gray-600">
                        <tr>
                            <th className="font-semibold px-2">#</th>
                            <th className="font-semibold px-2">Name</th>
                            <th className="font-semibold px-2">Parent Category</th>
                            <th className="font-semibold px-2">
                                <div className="flex w-full justify-between items-center">
                                    <p>Actions</p>
                                    <CreateSubCategory />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll">
                        {
                            subCategories.map((subCategory: SubCategoryModel, i: number) => (
                                <tr className="hover:bg-slate-600 cell" key={i}>
                                    <td className="p-2">{i + 1}</td>
                                    <td className="p-2">{subCategory.name}</td>
                                    <td className="p-2">{categories.find(category => category.category_id == subCategory.category_id)?.name}</td>
                                    <td className="p-2">
                                        <div className="flex items-center">
                                            <div className="p-1">
                                                <UpdateSubCategoryButton {...subCategory} />
                                            </div>
                                            <div>
                                                <DeleteSubCategoryButton {...subCategory} />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default AdminCategory;