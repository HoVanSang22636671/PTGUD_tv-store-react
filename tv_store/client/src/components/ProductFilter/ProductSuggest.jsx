import { useState, useEffect } from "react";
import Product from "../Product";
import { useProduct } from "../../API/UseProvider";
function ProductSuggest() {
    const [maxProducts, setMaxProducts] = useState(12); // Mặc định hiển thị 12 sản phẩm
    const { product } = useProduct();
    const [productList, setProductList] = useState([]);
    
    useEffect(() => {
        if (product && Array.isArray(product)) {
            setProductList(product.filter((item) => !item.flashSale));
        }
    }, [product]);
    // Dữ liệu mẫu (mock data) để hiển thị giao diện


    const handleLoadMore = () => {
        setMaxProducts((prev) => prev + 6); // Hiển thị thêm 6 sản phẩm
    };
    const handleLoadLess = () => {
        setMaxProducts((prev) => Math.max(12, prev - 6)); // Giảm 6 sản phẩm, tối thiểu là 12
    };

    return (
        <div className="bg-white mt-5 p-5 pb-10 rounded-md transform transition duration-300">
            <h1 className="text-xl py-2 font-semibold">Gợi ý hôm nay</h1>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
                {productList.slice(0, maxProducts).map((product, index) => (
                    <Product key={index} product={product} />
                ))}
            </div>
            <div className="text-center mt-4">
                {maxProducts < productList.length ? (
                    <button
                        onClick={handleLoadMore}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Xem thêm
                    </button>
                ) : (
                    <button
                        onClick={handleLoadLess}
                        className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
                    >
                        Thu gọn
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProductSuggest;