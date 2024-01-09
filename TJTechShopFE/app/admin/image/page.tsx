"use server"

import { getAllImages } from "@/app/api/image";
import { ImageModel } from "@/app/models/image";
import DeleteImageButton from "./delete-image";
import CreateImage from "./create-image";
import { getTokenClaims } from "@/app/api/user";



const AdminImage = async () => {
    const images = await getAllImages();
    const user = await getTokenClaims();
    
    return (
        <>
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left ">
                    <caption className="caption-top p-5 font-semibold">
                        Images
                        {
                            <p>({images.length})</p>
                        }
                    </caption>

                    <thead className="bg-gray-600">
                        <tr>
                            <th className="font-semibold p-2">#</th>
                            <th className="font-semibold p-2">Image</th>
                            <th className="font-semibold p-2">Url</th>
                            <th className="font-semibold p-2">Created</th>
                            <th className="font-semibold p-2">
                                <div className="flex justify-between items-center">
                                    <p>Actions</p>
                                    <CreateImage />
                                </div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            images.map((image: ImageModel, i: number) => (
                                <tr className="hover:bg-slate-600 cell" key={i}>
                                    <td className="p-2">{i + 1}</td>
                                    <td className="p-2 min-w-[100px]">
                                        <img src={image.url} alt="Image" className="w-24 h-24 object-cover"/>
                                    </td>
                                    <td className="p-2">{image.url}</td>
                                    <td className="p-2">{image.create_time}</td>
                                    <td className="p-2">
                                        <div className="flex items-center">
                                            {/* <div className="p-1">
                                                <UpdateProductButton {...product} />
                                            </div> */}
                                            <div>
                                                <DeleteImageButton {...image} />
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

export default AdminImage;