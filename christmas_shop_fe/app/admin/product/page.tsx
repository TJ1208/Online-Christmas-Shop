import { getAllProducts } from "@/app/api/product";
import CreateProduct from "./create-product";
import DeleteProduct from "./delete-product";
import { ProductModel } from "@/app/models/product";
import UpdateProductButton from "./update-product";
import getAllCategories from "@/app/api/category";
import { UpdateProductImageButton } from "./update-product-image";

const AdminProduct = async () => {
    const products = await getAllProducts();
    const categories = await getAllCategories();
    return (
        <>
            <div className=" overflow-x-auto">
                <table className="text-left border">
                    <caption className="caption-top p-5 font-semibold">
                        Products
                        {
                            <p>({products.length})</p>
                        }
                    </caption>

                    <thead className="bg-blue-100">
                        <tr>
                            <th className="font-semibold px-2">#</th>
                            <th className="font-semibold px-2">Name</th>
                            <th className="font-semibold px-2">Description</th>
                            <th className="font-semibold px-2">Price</th>
                            <th className="font-semibold px-2">Sale Price</th>
                            <th className="font-semibold px-2">Category</th>
                            <th className="font-semibold px-2">Image(s)</th>
                            <th className="font-semibold px-2">
                                <div className="flex justify-between items-center">
                                    <p>Actions</p>
                                    <CreateProduct />
                                </div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product: ProductModel, i: number) => (
                                <tr className="hover:bg-blue-50 cell" key={i}>
                                    <td className="p-2">{i + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.sale_price! > 0 ? product.sale_price : "NOS"}</td>
                                    <td>{categories.find((category) => category.category_id == product.category_id)!.name}</td>
                                    <td>
                                        <div className="flex">
                                            <UpdateProductImageButton {...product}/>
                                            {/* {
                                            product.images!.length > 0
                                                ?
                                                <p className=" fixed px-14">+{product.images!.length - 1}</p>
                                                :
                                                <>
                                                </>
                                        } */}

                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex items-center">
                                            <div className="p-1">
                                                <UpdateProductButton {...product} />
                                            </div>
                                            <div>
                                                <DeleteProduct {...product} />
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

export default AdminProduct