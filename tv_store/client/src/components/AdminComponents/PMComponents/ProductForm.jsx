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
import * as XLSX from "xlsx";

const ProductForm = ({ onSubmit, editingProduct, setEditingProduct, existingBrands }) => {
    const [formData, setFormData] = useState({
        id: editingProduct?.id || '', // Ensuring a string ID
        name: "",
        image: "",
        price: 0,
        inventory: 0,
        sale: 0,
        thuongHieu: "",
    });

    const [isCustomBrand, setIsCustomBrand] = useState(false);

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                ...editingProduct,
                thuongHieu: editingProduct.thuongHieu || editingProduct.brand || "",
            });
            setIsCustomBrand(!existingBrands.includes(editingProduct.thuongHieu || editingProduct.brand));
        }
    }, [editingProduct, existingBrands]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: formData.id,
            name: formData.name,
            price: formData.price,
            inventory: parseInt(formData.inventory),  // Chuyển đổi inventory thành số
            sale: formData.sale,
            thuongHieu: formData.thuongHieu,
        };
        console.log("Submitted data:", data);
        onSubmit(data);
        setFormData({ name: "", image: "", price: 0, inventory: 0, sale: 0, thuongHieu: "" });
        setIsCustomBrand(false);
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

                parsedProducts.forEach((product) => {
                    if (product.name && product.price && product.inventory && product.thuongHieu) {
                        onSubmit({
                            ...product,
                            id: '',  // Empty ID for new products
                            status: product.status || "Đang bán",
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
            sx={{ "& .MuiDialog-paper": { borderRadius: 8 } }}
            BackdropProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.5)" } }}
        >
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

            <DialogContent sx={{ padding: "24px", paddingTop: "10px" }}>
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
                    <TextField
                        label="Tên sản phẩm"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <TextField
                        label="URL hình ảnh"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <TextField
                        label="Giá"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <TextField
                        label="Số lượng"
                        name="inventory"
                        type="number"
                        value={formData.inventory}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <TextField
                        label="Giảm giá (%)"
                        name="sale"
                        type="number"
                        value={formData.sale}
                        onChange={handleChange}
                        fullWidth
                        required
                    />

                    <FormControl fullWidth>
                        <InputLabel>Thương hiệu</InputLabel>
                        {!isCustomBrand ? (
                            <Select
                                name="thuongHieu"
                                value={formData.thuongHieu}
                                onChange={(e) => {
                                    if (e.target.value === "custom") {
                                        setIsCustomBrand(true);
                                        setFormData({ ...formData, thuongHieu: "" });
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
                                name="thuongHieu"
                                value={formData.thuongHieu}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        )}
                    </FormControl>

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
