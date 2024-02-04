import { getAllOrderProducts, getAllOrders } from "@/app/api/order";
import { OrderModel } from "@/app/models/order";
import DeleteOrderButton from "./delete-order";
import ViewProductsButton from "./view-products";
import { getAllProducts } from "@/app/api/product";

const AdminOrder = async () => {
    const orders = await getAllOrders();
    const products = await getAllProducts();
    const orderProducts = await getAllOrderProducts();
    const initialValue = 0;
    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left">
                    <caption className="caption-top p-5 font-semibold">
                        Orders
                        {
                            <p>({orders.length})</p>
                        }
                    </caption>

                    <thead className="bg-gray-600">
                        <tr>
                            <th className="font-semibold px-2">#</th>
                            <th className="font-semibold px-2">Buyer</th>
                            <th className="font-semibold px-2">Email</th>
                            <th className="font-semibold px-2">Phone #</th>
                            <th className="font-semibold px-2">Products</th>
                            <th className="font-semibold px-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order: OrderModel, i: number) => (
                                <tr className="hover:bg-slate-600 cell" key={i}>
                                    <td className="p-2">{i + 1}</td>
                                    <td className="p-2">{order.user?.last_name}, {order.user?.first_name}</td>
                                    <td className="p-2">{order.user?.email}</td>
                                    <td className="p-2 sm:min-w-fit min-w-[250px]">{order.user?.phone_number}</td>
                                    <td className="p-2 flex items-center"><ViewProductsButton {...{ order, products, orderProducts }} />({order.products?.length})</td>
                                    <td className="p-2">${order.total}</td>
                                    <td>
                                        <div>
                                            <DeleteOrderButton />
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

export default AdminOrder;