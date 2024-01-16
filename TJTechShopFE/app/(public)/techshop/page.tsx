"use server"

import ProductFilter from "@/app/components/product-filter";
import { getAllProducts } from "../../api/product";
import ViewProduct from "@/app/components/view-product";
import getAllCategories from "@/app/api/category";

const TechShop = async () => {
  const categories = await getAllCategories();
  var products = await getAllProducts();
  products = products.filter(product => product.sale_price != 0).slice(0, 2)
  return (
    <>
      <div className="w-full">
        <img src="https://tjcoding.sirv.com/website-images/jack-b-fewhfXbCUzI-unsplash.jpg" alt="Shop Banner." className="object-cover w-full banner-image" />
      </div>
      {/* <p className="font-semibold text-2xl absolute left-0 translate-x-1/2 translate-y-1/2">Shop Best In Class Towers, Laptops, Monitors</p> */}
      <div className="flex flex-col container pt-6 w-full mt-5 text-blue-200 lg:text-lg p-5">
        <div className="lg:grid grid-cols-2 gap-4 shadow-xl bg-slate-900 bg-opacity-10 items-center justify-center hidden">

          <img src={products[0].images![0].url} className="object-cover w-full" />
          <div className="grid grid-rows-4 lg:my-36 sm:my-26 my-14 p-5 mx-2 w-full items-center justify-center">
            <p className="rounded font-semibold mb-5">{products[0].name}</p>
            <p className="text-sm rounded font-light">{products[0].description}</p>
            <div className="flex items-end justify-end">
              <p className="rounded font-light md:text-lg text-lg m-2 italic">${products[0].sale_price}</p>
              <p className="rounded font-light md:text-lg m-2 line-through italic">${products[0].price}</p>
            </div>
            <div className="flex items-center justify-center w-full">
              <ViewProduct {...products[0]} />
              <button className="bg-slate-500 rounded p-3 shadow-sm home-button m-3 w-1/2 font-semibold text-gray-300">Add To Cart</button>
            </div>
          </div>
        </div>

        <div className="lg:grid grid-cols-2 gap-4 shadow-xl bg-slate-900 bg-opacity-10 items-center justify-center hidden">
          <div className="grid grid-rows-4 lg:my-36 sm:my-26 my-14 p-5 mx-2 w-full items-center justify-center">
            <p className="rounded font-semibold mb-5">{products[1].name}</p>
            <p className="text-sm rounded font-light">{products[1].description}</p>
            <div className="flex items-end justify-end">
              <p className="rounded font-light md:text-lg text-lg m-2 italic">${products[1].sale_price}</p>
              <p className="rounded font-light md:text-lg m-2 line-through italic">${products[1].price}</p>
            </div>
            <div className="flex items-center justify-center w-full">
              <ViewProduct {...products[1]} />
              <button className="bg-slate-500 rounded p-3 shadow-sm home-button m-3 w-1/2 font-semibold text-gray-300">Add To Cart</button>
            </div>
          </div>
          <img src={products[1].images![0].url} className="object-cover w-full" />
        </div>

        <div className="lg:hidden shadow-xl bg-slate-900 bg-opacity-10 items-center justify-center p-5">
          <img src={products[0].images![0].url} className="object-cover w-full" />
          <p className="rounded font-semibold p-1">{products[0].name}</p>
          <p className="text-sm rounded font-light py-2">{products[0].description}</p>
          <div className="flex flex-col items-end">
            <div className="flex">
              <p className="rounded font-light md:text-lg text-lg m-2 italic">${products[0].sale_price}</p>
              <p className="rounded font-light md:text-lg m-2 line-through italic">${products[0].price}</p>
            </div>
            <div className="flex items-center justify-center w-full">
              <ViewProduct {...products[0]} />
              <button className="bg-slate-500 rounded p-3 shadow-sm home-button m-3 w-1/2 font-semibold text-gray-300">Add To Cart</button>
            </div>
          </div>
        </div>

        <div className="lg:hidden shadow-xl bg-slate-900 bg-opacity-10 items-center justify-center p-5">
          <img src={products[1].images![0].url} className="object-cover w-full" />
          <p className="rounded font-semibold p-1">{products[1].name}</p>
          <p className="text-sm rounded font-light py-2">{products[1].description}</p>
          <div className="flex flex-col items-end">
            <div className="flex">
              <p className="rounded font-light md:text-lg text-lg m-2 italic">${products[1].sale_price}</p>
              <p className="rounded font-light md:text-lg m-2 line-through italic">${products[1].price}</p>
            </div>
            <div className="flex items-center justify-center w-full">
              <ViewProduct {...products[1]} />
              <button className="bg-slate-500 rounded p-3 shadow-sm home-button m-3 w-1/2 font-semibold text-gray-300">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-evenly text-center bg-slate-900  bg-opacity-10 shadow p-5 mt-5">
          {
            categories.map(category => (
              <div className="flex flex-col p-5 nav-button shadow-2xl">
                <ProductFilter {...{ url: category.image!.url, name: category.name }} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default TechShop;
