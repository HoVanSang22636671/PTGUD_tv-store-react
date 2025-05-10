import React, { useState } from "react";
import ProductForm from "./PMComponents/ProductForm";
import ProductList from "./PMComponents/ProductList";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    Typography,
    Button,
} from "@mui/material";
import { useProduct } from "../../API/UseProvider"; // Import useProduct từ UseProvider.jsx
const initialProducts = [
    {
        id: 1,
        name: "Google Tivi LED Hisense 4K 43 inch",
        image: "https://salt.tikicdn.com/cache/750x750/ts/product/ba/78/cc/7cce9c1b2a13d8af62b0731ddf9d9ad6.png.webp",
        price: 6490000,
        quantity: 44,
        brand: "Hisense",
        status: "Đang bán",
    },
    {
        id: 2,
        name: "Tivi Panasonic Full HD 75 inch A8H",
        image: "https://salt.tikicdn.com/cache/750x750/ts/product/b9/b6/be/a93cd562748c4a96b9b6aac57bea2ab7.png.webp",
        price: 7590000,
        quantity: 47,
        brand: "Panasonic",
        status: "Đang bán",
    },
    {
        id: 3,
        name: "Tivi LG Full HD 55 inch C645",
        image: "https://salt.tikicdn.com/cache/750x750/ts/product/17/fd/70/ebc1770efa3c67e6a64f1ebe6b5fcc98.jpg.webp",
        price: 11590000,
        quantity: 26,
        brand: "LG",
        status: "Hết hàng",
    },
];

const ProductManagement = () => {
    const { product, setProduct,addProduct } = useProduct();
    // const [products, setProducts] = useState(product);

    const [selectedProduct, setSelectedProduct] = useState(null); // Quản lý sản phẩm được chọn (dùng cho sửa hoặc thêm mới)
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        status: "",
        brand: "",
    });

    const handleSaveProduct = (product) => {
        addProduct(product); // Gọi hàm thêm sản phẩm từ useProduct
        setSelectedProduct(null); // Đóng Modal sau khi lưu
    };

    const handleDeleteProduct = (id) => {
        setProduct(product.filter((product) => product.id !== id));
    };

    const toggleStatus = (id) => {
        setProduct(
            product.map((product) =>
                product.id === id
                    ? {
                        ...product,
                        status: product.status === "Đang bán" ? "Hết hàng" : "Đang bán",
                    }
                    : product
            )
        );
    };

    const filteredProducts = product.filter((product) => {
        const matchesSearchTerm = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const productStatus = product.inventory > 0 ? "Đang bán" : "Hết hàng";

        const matchesFilters =
            (filters.status === "" || productStatus === filters.status) &&
            (filters.brand === "" || product.brand === filters.brand);
        return matchesSearchTerm && matchesFilters;
    });

    const uniqueBrands = [...new Set(product.map((product) => product.thuongHieu))];

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Tìm kiếm
            </Typography>

            {/* Tìm kiếm sản phẩm */}
            <Box display="flex" flexDirection="column" gap={2} mb={4}>
                <TextField
                    id="search"
                    label="Tìm kiếm sản phẩm"
                    placeholder="Nhập tên sản phẩm..."
                    variant="outlined"
                    size="small" // Giảm kích thước
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    sx={{ borderRadius: "8px" }} // Làm mềm mại
                />
            </Box>

            {/* Bộ lọc nâng cao */}
            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2} mb={4}>
                <FormControl fullWidth size="small" sx={{ borderRadius: "8px" }}>
                    <InputLabel id="status-label">Trạng thái</InputLabel>
                    <Select
                        labelId="status-label"
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({ ...filters, status: e.target.value })
                        }
                        label="Trạng thái"
                    >
                        <MenuItem value="">Tất cả trạng thái</MenuItem>
                        <MenuItem value="Đang bán">Đang bán</MenuItem>
                        <MenuItem value="Hết hàng">Hết hàng</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ borderRadius: "8px" }}>
                    <InputLabel id="brand-label">Thương hiệu</InputLabel>
                    <Select
                        labelId="brand-label"
                        value={filters.brand}
                        onChange={(e) =>
                            setFilters({ ...filters, brand: e.target.value })
                        }
                        label="Thương hiệu"
                    >
                        <MenuItem value="">Tất cả thương hiệu</MenuItem>
                        {uniqueBrands.map((brand, index) => (
                            <MenuItem key={index} value={brand}>
                                {brand}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Danh sách sản phẩm */}
            <ProductList
                products={filteredProducts}
                onEdit={(product) => setSelectedProduct(product)} // Chọn sản phẩm để sửa
                onDelete={handleDeleteProduct}
                onToggleStatus={toggleStatus}
                onAddProduct={() => setSelectedProduct({})} // Mở Modal thêm sản phẩm
            />

            {/* Modal thêm/sửa sản phẩm */}
            {selectedProduct && (
                <ProductForm
                    onSubmit={handleSaveProduct}
                    editingProduct={selectedProduct}
                    setEditingProduct={setSelectedProduct}
                    existingBrands={uniqueBrands}
                />
            )}
        </div>
    );
};

export default ProductManagement;