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
    const [products, setProducts] = useState(initialProducts);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Quản lý trạng thái hiển thị modal
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        status: "",
        brand: "",
    });

    const handleAddProduct = (newProduct) => {
        setProducts([...products, { ...newProduct, id: Date.now() }]);
        setIsModalOpen(false); // Đóng modal sau khi thêm sản phẩm
    };

    const handleEditProduct = (updatedProduct) => {
        setProducts(
            products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
        setEditingProduct(null);
        setIsModalOpen(false); // Đóng modal sau khi chỉnh sửa sản phẩm
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const toggleStatus = (id) => {
        setProducts(
            products.map((product) =>
                product.id === id
                    ? {
                        ...product,
                        status: product.status === "Đang bán" ? "Hết hàng" : "Đang bán",
                    }
                    : product
            )
        );
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearchTerm = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesFilters =
            (filters.status === "" || product.status === filters.status) &&
            (filters.brand === "" || product.brand === filters.brand);

        return matchesSearchTerm && matchesFilters;
    });

    const uniqueBrands = [...new Set(products.map((product) => product.brand))];

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
                onEdit={(product) => {
                    setEditingProduct(product);
                    setIsModalOpen(true); // Hiển thị modal khi chỉnh sửa sản phẩm
                }}
                onDelete={handleDeleteProduct}
                onToggleStatus={toggleStatus}
                onAddProduct={() => setIsModalOpen(true)} // Hàm mở modal thêm sản phẩm
            />

            {/* Modal thêm/sửa sản phẩm */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            {editingProduct
                                ? "Chỉnh sửa sản phẩm"
                                : "Thêm sản phẩm"}
                        </Typography>
                        <ProductForm
                            onSubmit={
                                editingProduct
                                    ? handleEditProduct
                                    : handleAddProduct
                            }
                            editingProduct={editingProduct}
                            setEditingProduct={setEditingProduct}
                            existingBrands={uniqueBrands}
                        />
                        <Button
                            onClick={() => {
                                setEditingProduct(null);
                                setIsModalOpen(false);
                            }}
                            variant="contained"
                            color="secondary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;