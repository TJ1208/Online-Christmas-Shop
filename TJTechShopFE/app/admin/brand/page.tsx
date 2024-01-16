import getAllBrands from "@/app/api/brand";
import { BrandModel } from "@/app/models/brand";
import CreateBrand from "./create-brand";
import UpdateBrandButton from "./update-brand";
import DeleteBrandButton from "./delete-brand";


const AdminBrand = async () => {
    const brands = await getAllBrands();
    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left rounded">
                    <caption className="caption-top p-5 font-semibold">
                        Brands
                        {
                            <p>({brands.length})</p>
                        }
                    </caption>

                    <thead className="bg-gray-600">
                        <tr>
                            <th className="font-semibold px-2">#</th>
                            <th className="font-semibold px-2">Name</th>
                            <th className="font-semibold px-2">
                                <div className="flex w-full justify-between items-center">
                                    <p>Actions</p>
                                    <CreateBrand />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll">
                        {
                            brands.map((brand: BrandModel, i: number) => (
                                <tr className="hover:bg-slate-600 cell" key={i}>
                                    <td className="p-2">{i + 1}</td>
                                    <td className="p-2">{brand.name}</td>
                                    <td className="p-2">
                                        <div className="flex items-center">
                                            <div className="p-1">
                                                <UpdateBrandButton {...brand} />
                                            </div>
                                            <div>
                                                <DeleteBrandButton {...brand} />
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


export default AdminBrand;