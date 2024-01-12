"use server"

import { getAllProducts } from "../api/product";
import { ImageModel } from "../models/image";
import { ProductModel } from "../models/product";

const TechShop = async () => {
  const products = await getAllProducts();

  return (
    <>
      <div className="w-full">
        <img src="https://tjcoding.sirv.com/website-images/daniel-korpai-HyTwtsk8XqA-unsplash.jpg" alt="Shop Banner." className="object-cover w-full banner-image" />
      </div>

      <div className="grid gap-4 grid-cols-4 auto-rows-auto container  pt-6">
        {

          products.map((product: ProductModel) =>
            <div key={product.product_id} className="flex flex-col px-2 hover:underline hover:cursor-pointer">
              {product.images?.map((image: ImageModel) =>
                <img key={image.image_id} src={image.url} className="object-cover" />)}
              <p className="text-sm rounded p-1 text-center font-light">{product.name}</p>
            </div>

          )

        }
      </div>
    </>
  )
}

export default TechShop;
