import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx"; // Import thư viện xử lý file Excel

const ProductForm = ({ onSubmit, editingProduct, setEditingProduct, existingBrands }) => {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: 0,
        quantity: 0,
        status: "Đang bán",
        brand: "", // Thương hiệu
    });

    const [isCustomBrand, setIsCustomBrand] = useState(false); // Kiểm tra xem thương hiệu có phải nhập mới không

    // Cập nhật dữ liệu khi chỉnh sửa sản phẩm
    useEffect(() => {
        if (editingProduct) {
            setFormData(editingProduct);
            setIsCustomBrand(!existingBrands.includes(editingProduct.brand)); // Nếu brand không nằm trong danh sách thì chuyển sang nhập mới
        }
    }, [editingProduct, existingBrands]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: "", image: "", price: 0, quantity: 0, status: "Đang bán", brand: "" });
        setIsCustomBrand(false); // Reset trạng thái nhập mới thương hiệu
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedProducts = XLSX.utils.sheet_to_json(sheet);

                // Gọi hàm `onSubmit` cho từng sản phẩm từ file Excel
                parsedProducts.forEach((product) => {
                    if (product.name && product.price && product.quantity && product.brand) {
                        onSubmit({
                            ...product,
                            id: Date.now() + Math.random(), // Sinh ID ngẫu nhiên cho từng sản phẩm
                            status: product.status || "Đang bán", // Mặc định trạng thái nếu thiếu
                        });
                    }
                });
            } catch (error) {
                alert("Lỗi: File không hợp lệ!");
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tên sản phẩm */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Tên sản phẩm
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Tên sản phẩm"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>

                {/* URL hình ảnh */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        URL hình ảnh
                    </label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        placeholder="URL hình ảnh"
                        value={formData.image}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>

                {/* Giá */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Giá
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Giá"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>

                {/* Số lượng */}
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                        Số lượng
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        placeholder="Số lượng"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>

                {/* Trạng thái */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Trạng thái
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded-md w-full"
                    >
                        <option value="Đang bán">Đang bán</option>
                        <option value="Hết hàng">Hết hàng</option>
                    </select>
                </div>

                {/* Thương hiệu */}
                <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                        Thương hiệu
                    </label>
                    {!isCustomBrand ? (
                        <div className="flex gap-2">
                            <select
                                id="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={(e) => {
                                    if (e.target.value === "custom") {
                                        setIsCustomBrand(true);
                                        setFormData({ ...formData, brand: "" });
                                    } else {
                                        handleChange(e);
                                    }
                                }}
                                className="mt-1 p-2 border rounded-md w-full"
                            >
                                <option value="">Chọn thương hiệu</option>
                                {existingBrands.map((brand, index) => (
                                    <option key={index} value={brand}>
                                        {brand}
                                    </option>
                                ))}
                                <option value="custom">Thêm thương hiệu mới</option>
                            </select>
                        </div>
                    ) : (
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            placeholder="Nhập thương hiệu mới"
                            value={formData.brand}
                            onChange={handleChange}
                            className="mt-1 p-2 border rounded-md w-full"
                        />
                    )}
                </div>

                {/* Tải file Excel */}
                <div>
                    <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
                        Thêm sản phẩm từ file Excel
                    </label>
                    <input
                        type="file"
                        id="fileUpload"
                        accept=".xlsx"
                        onChange={handleFileUpload}
                        className="mt-1 p-2 border rounded-md w-full"
                    />
                </div>
            </div>

            {/* Nút hành động */}
            <div className="mt-4">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    {editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                </button>
                {editingProduct && (
                    <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProductForm;