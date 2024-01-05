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
      const response = await fetch("http://localhost:5000/product");
      const products: ProductModel[] = await response.json();
      setProducts(products);
      setIsLoading(false);
    }
    fetchData();

  }, [])

  return (
    <>
      <img src="https://tjcoding.sirv.com/website-images/shop-banner.jpg" alt="Shop Banner." className="container mx-auto rounded-b shadow" />
      {
        isLoading
          ?
          <LoadingCompoent />
          :
          <></>
      }
      <div className="grid gap-4 grid-cols-4 auto-rows-auto border-b container bg-slate-100 pt-6">
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