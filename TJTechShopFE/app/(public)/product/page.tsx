import ProductCard from "./product-card";

function Product(productId: { params: {}, searchParams: { product_id: string } }) {

    return (
        <>
            <div className="container">
                <ProductCard {...productId} />
            </div>
        </>
    )
}

export default Product;