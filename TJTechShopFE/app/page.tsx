"use client";

import { useEffect, useState } from "react"
import { ProductModel } from "./models/product"
import { LoadingCompoent } from "./components/loading-component";
import { ImageModel } from "./models/image";

const Home = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://techspecbe.azurewebsites.net/product");
      const products: ProductModel[] = await response.json();
      setProducts(products);
      setIsLoading(false);
    }
    fetchData();

  }, [])

  return (
    <>
      <div className="w-full">
        <img src="https://tjcoding.sirv.com/website-images/daniel-korpai-HyTwtsk8XqA-unsplash.jpg" alt="Shop Banner." className="object-cover w-full banner-image" />
      </div>

      {
        isLoading
          ?
          <LoadingCompoent />
          :
          <></>
      }
      <div className="grid gap-4 grid-cols-4 auto-rows-auto container  pt-6">
        {

          products.map((product: ProductModel) =>
            <div key={product.product_id} className="flex flex-col px-2 hover:underline hover:cursor-pointer">
              {product.images?.map((image: ImageModel) =>
                <img key={image.image_id} src={image.url} className="object-cover border shadow" />)}
              <p className="text-sm rounded p-1 text-center font-light">{product.name}</p>

            </div>

          )

        }
      </div>
    </>
  )
}

export default Home;