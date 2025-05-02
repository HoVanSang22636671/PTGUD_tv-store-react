import { useState } from "react";

function ProductSuggest() {
    const [maxProducts, setMaxProducts] = useState(12); // Mặc định hiển thị 12 sản phẩm

    // Dữ liệu mẫu (mock data) để hiển thị giao diện
    const mockProductList = Array.from({ length: 18 }, (_, index) => ({
        id: index + 1,
        name: `Sản phẩm ${index + 1}`,
        price: (index + 1) * 100000,
        img: "https://via.placeholder.com/150", // Placeholder image
    }));

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
                {mockProductList.slice(0, maxProducts).map((product, index) => (
                    <div
                        key={index}
                        className="border p-4 rounded-md flex flex-col items-center"
                    >
                        <img
                            src={product.img}
                            alt={product.name}
                            className="w-full h-32 object-cover rounded-md mb-2"
                        />
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-500">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(product.price)}
                        </p>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                {maxProducts < mockProductList.length ? (
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