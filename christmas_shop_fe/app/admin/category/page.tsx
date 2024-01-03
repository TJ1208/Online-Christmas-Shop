import CategoryModel from "../../models/category";
import CreateCategory from "@/app/admin/category/create-category";
import { DeleteCategoryButton } from "./delete-category";
import { getAllCategories } from "@/app/api/category";
import { UpdateCategoryButton } from "./update-category";

const AdminCategory = async () => {
    const categories = await getAllCategories();
    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-left border">
                    <caption className="caption-top p-5 font-semibold">
                        Categories
                        {
                            <p>({categories.length})</p>
                        }
                    </caption>

                    <thead className="bg-blue-100">
                        <tr>
                            <th className="font-semibold px-2">#</th>
                            <th className="font-semibold px-2">Name</th>
                            <th className="font-semibold px-2">Image</th>
                            <th className="font-semibold px-2">
                                <div className="flex w-full justify-between items-center">
                                    <p>Actions</p>
                                    <CreateCategory />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll">
                        {
                            categories.map((category: CategoryModel, i: number) => (
                                <tr className="hover:bg-blue-50 cell" key={i}>
                                    <td className="p-2">{i + 1}</td>
                                    <td>{category.name}</td>
                                    <td><img src={category.image?.url} alt="Category Image" className="h-14 w-14 object-cover rounded py-1" /></td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="p-1">
                                                <UpdateCategoryButton {...category} />
                                            </div>
                                            <div>
                                                <DeleteCategoryButton {...category} />
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