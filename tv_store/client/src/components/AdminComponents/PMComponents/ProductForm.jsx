import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
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
        <Dialog
            open={Boolean(editingProduct)}
            onClose={() => setEditingProduct(null)}
            maxWidth="sm"
            fullWidth
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: 8, // Bo góc modal
                },
            }}
            BackdropProps={{
                style: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền mờ phía sau Modal
                },
            }}
        >
            {/* Header - Tiêu đề */}
            <DialogTitle
                sx={{
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid #ddd",
                    fontWeight: "bold",
                    padding: "10px"
                }}
            >
                {editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
            </DialogTitle>

            {/* Nội dung - Form */}
            <DialogContent
                sx={{
                    padding: "24px",
                    paddingTop: "10px",
                }}
            >
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                    {/* Tên sản phẩm */}
                    <TextField
                        label="Tên sản phẩm"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* URL hình ảnh */}
                    <TextField
                        label="URL hình ảnh"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Giá */}
                    <TextField
                        label="Giá"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Số lượng */}
                    <TextField
                        label="Số lượng"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    {/* Trạng thái */}
                    <FormControl fullWidth>
                        <InputLabel>Trạng thái</InputLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="Đang bán">Đang bán</MenuItem>
                            <MenuItem value="Hết hàng">Hết hàng</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Thương hiệu */}
                    <FormControl fullWidth>
                        <InputLabel>Thương hiệu</InputLabel>
                        {!isCustomBrand ? (
                            <Select
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
                                fullWidth
                            >
                                <MenuItem value="">Chọn thương hiệu</MenuItem>
                                {existingBrands.map((brand, index) => (
                                    <MenuItem key={index} value={brand}>
                                        {brand}
                                    </MenuItem>
                                ))}
                                <MenuItem value="custom">Thêm thương hiệu mới</MenuItem>
                            </Select>
                        ) : (
                            <TextField
                                label="Thương hiệu mới"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        )}
                    </FormControl>

                    {/* Tải file Excel */}
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                            Thêm sản phẩm từ file Excel
                        </Typography>
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileUpload}
                            style={{
                                marginTop: "8px",
                                padding: "8px",
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                width: "100%",
                                cursor: "pointer",
                            }}
                        />
                    </Box>
                </Box>
            </DialogContent>

            {/* Footer - Nút hành động */}
            <DialogActions
                sx={{
                    padding: "16px",
                    borderTop: "1px solid #ddd",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Button
                    onClick={() => setEditingProduct(null)}
                    variant="contained"
                    color="secondary"
                    sx={{ fontWeight: "bold" }}
                >
                    Đóng
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                >
                    {editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductForm;