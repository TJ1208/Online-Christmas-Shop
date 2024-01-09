import { getAllUsers } from "@/app/api/user";
import { UserModel } from "@/app/models/user";
import { UpdateUserButton } from "./update-user";
import { DeleteUserButton } from "./delete-user";
import CreateUser from "./create-user";

const AdminUser = async () => {
    const users = await getAllUsers();
    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left">
                    <caption className="caption-top p-5 font-semibold">
                        Users
                        {
                            <p>({users.length})</p>
                        }
                    </caption>

                    <thead className="bg-gray-600">
                        <tr>
                            <th className="font-semibold px-2">#</th>
                            <th className="font-semibold px-2">First Name</th>
                            <th className="font-semibold px-2">Last Name</th>
                            <th className="font-semibold px-2">Email</th>
                            <th className="font-semibold px-2">Phone #</th>
                            <th className="font-semibold px-2">Age</th>
                            <th className="font-semibold px-2">Registered</th>
                            <th className="font-semibold px-2">
                                <div className="flex w-full justify-between items-center">
                                    <p>Actions</p>
                                    <CreateUser />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user: UserModel, i: number) => (
                                <tr className="hover:bg-slate-600 cell" key={i}>
                                    <td className="p-2">{i + 1}</td>
                                    <td className="p-2">{user.first_name}</td>
                                    <td className="p-2">{user.last_name}</td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.phone_number}</td>
                                    <td className="p-2">{user.age}</td>
                                    <td className="p-2">{user.create_time!}</td>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="p-1">
                                                <UpdateUserButton {...user} />
                                            </div>
                                            <div>
                                                <DeleteUserButton {...user} />
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

export default AdminUser;