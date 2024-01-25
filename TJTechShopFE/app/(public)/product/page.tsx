import { getAllProducts, getProduct } from "@/app/api/product";
import ProductCard from "./product-card";
import SimilarProducts from "./similar-products";

async function Product(productId: { params: {}, searchParams: { product_id: string } }) {
    const products = await getAllProducts();
    const product = await getProduct(productId.searchParams.product_id);
    return (
        <>
            <div className="container">
                <ProductCard {...product} />
                <SimilarProducts {...{ products, product }} />
            </div>
        </>
    )
}

export default Product;