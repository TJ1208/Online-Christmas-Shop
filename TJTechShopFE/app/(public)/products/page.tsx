"use client"

import { useSearchParams } from "next/navigation";
import { getCategoryById } from "@/app/api/category";
import { getAllProducts } from "@/app/api/product";
import { useEffect, useState } from "react";
import { ProductModel } from "@/app/models/product";
import CategoryModel from "@/app/models/category";
import ProductCard from "./product-card";
import ProductLoad from "./product-load";

function ProductsPage() {
    const params = useSearchParams();
    const [products, setProducts] = useState<ProductModel[]>([]);
    const [category, setCategory] = useState<CategoryModel>();
    const [categoryId, setCategoryId] = useState<string>("");
    const [brandId, setBrandId] = useState<string>("");
    const [onSale, setOnSale] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    if (categoryId != params.get("category_id") && params.get("category_id")) {
        setCategoryId(params.get("category_id") || "");
    }

    if (brandId != params.get("brand_id") && params.get("brand_id")) {
        setBrandId(params.get("brand_id") || "");
    }

    if (onSale != params.get("on_sale") && params.get("on_sale")) {
        setOnSale(params.get("on_sale") || "");
    }


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setCategoryId(params.get("category_id") || "");
            setBrandId(params.get("brand_id") || "");
            setOnSale(params.get("on_sale") || "");
            const products = await getAllProducts();
            setProducts(products);
            const category = categoryId ? await getCategoryById(categoryId): {
                name: '',
                image_id: 0
            };
            setCategory(category);
            setIsLoading(false);

        }
        fetchData()
    }, [categoryId, brandId, onSale])

    return (
        <>
            {
                isLoading
                    ?
                    <ProductLoad />
                    :
                    <div className="flex container">


                        <div className="lg:flex hidden w-96 border-r rounded border-blue-200 my-5">
                            <div className="nav-button h-fit">
                                <label>On Sale</label>
                                <input type="checkbox" defaultChecked={params.has("on_sale")} id="onSale" className="mx-2" />
                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                        </div>
                        <div className="lg:grid lg:grid-cols-4 lg:grid-flow-row xl:grid-cols-5 p-5 justify-center w-full lg:w-auto">
                            {
                                categoryId != ""
                                    ?
                                    category?.sub_categories?.map(sub_category => products.filter(product => product.category_id == sub_category.id).map(product => (
                                        <div key={product.product_id}>
                                            <ProductCard {...product} />
                                        </div>
                                    )))
                                    :
                                    <>
                                    </>
                            }
                            {
                                brandId != ""
                                    ?
                                    products.filter(product => product.brand_id == parseInt(brandId)).map(product => (
                                        <div key={product.product_id}>
                                            <ProductCard {...product} />
                                        </div>
                                    ))
                                    :
                                    <>
                                    </>
                            }
                            {
                                onSale != ""
                                    ?
                                    products.filter(product => product.sale_price > 0).map(product => (
                                        <div key={product.product_id}>
                                            <ProductCard {...product} />
                                        </div>
                                    ))
                                    :
                                    <>
                                    </>
                            }
                            {
                                onSale == "" && brandId == "" && categoryId == ""
                                    ?
                                    products.map(product => (
                                        <div key={product.product_id}>
                                            <ProductCard {...product} />
                                        </div>
                                    ))
                                    :
                                    <>
                                    </>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default ProductsPage;