import { getAllShippingMethods } from "@/app/api/shipping-method";
import { ShippingMethodModel } from "@/app/models/shipping-method";
import CreateShippingMethod from "./create-shipping-method";
import UpdateShippingMethodButton from "./update-shipping-method";
import DeleteShippingMethodButton from "./delete-shipping-method";


const AdminShippingMethod = async () => {
    const shippingMethods = await getAllShippingMethods();
    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left rounded">
                    <caption className="caption-top p-5 font-semibold">
                        Shipping Methods
                        {
                            <p>({shippingMethods.length})</p>
                        }
                    </caption>

                    <thead className="bg-gray-600">
                        <tr>
                            <th className="font-semibold px-2">#</th>
                            <th className="font-semibold px-2">Name</th>
                            <th className="font-semibold px-2">Rate</th>
                            <th className="font-semibold px-2">Early Arrival (Days)</th>
                            <th className="font-semibold px-2">Late Arrival (Days)</th>
                            <th className="font-semibold px-2">
                                <div className="flex w-full justify-between items-center">
                                    <p>Actions</p>
                                    <CreateShippingMethod />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="overflow-y-scroll">
                        {
                            shippingMethods.map((shippingMethod: ShippingMethodModel, i: number) => (
                                <tr className="hover:bg-slate-600 cell" key={i}>
                                    <td className="p-2">{i + 1}</td>
                                    <td className="p-2">{shippingMethod.name}</td>
                                    <td className="p-2">{shippingMethod.rate}</td>
                                    <td className="p-2">{shippingMethod.early_arrival}</td>
                                    <td className="p-2">{shippingMethod.late_arrival}</td>
                                    <td className="p-2">
                                        <div className="flex items-center">
                                            <div className="p-1">
                                                <UpdateShippingMethodButton {...shippingMethod} />
                                            </div>
                                            <div>
                                                <DeleteShippingMethodButton {...shippingMethod} />
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


export default AdminShippingMethod;