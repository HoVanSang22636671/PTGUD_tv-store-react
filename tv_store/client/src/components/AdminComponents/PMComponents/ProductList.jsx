import React from "react";
import * as XLSX from "xlsx"; // Import thư viện SheetJS
import { PencilSquareIcon, TrashIcon, PlusIcon, DocumentArrowDownIcon } from "@heroicons/react/24/solid"; // Import icon từ Heroicons
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Box,
} from "@mui/material";

const ProductList = ({ products, onEdit, onDelete, onAddProduct }) => {
    const handleExportToExcel = () => {
        // Tạo một WorkSheet từ dữ liệu sản phẩm
        const worksheet = XLSX.utils.json_to_sheet(products);

        // Tạo một WorkBook và thêm WorkSheet vào
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

        // Xuất file Excel
        XLSX.writeFile(workbook, "DanhSachSanPham.xlsx");
    };

    return (
        <Paper sx={{ p: 3, boxShadow: 3, mb: 4 }}>
            {/* Tiêu đề và nút thao tác */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                    Danh sách sản phẩm
                </Typography>
                <Box display="flex" gap={2}>
                    {/* Nút Thêm sản phẩm */}
                    <Button
                        onClick={onAddProduct}
                        variant="contained"
                        color="primary"
                        startIcon={<PlusIcon className="h-5 w-5" />}
                        sx={{ textTransform: "none", fontWeight: "bold" }}
                    >
                        Thêm sản phẩm
                    </Button>

                    {/* Nút Xuất Excel */}
                    <Button
                        onClick={handleExportToExcel}
                        variant="contained"
                        sx={{
                            backgroundColor: "#4CAF50",
                            color: "#fff",
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: "4px",
                            "&:hover": {
                                backgroundColor: "#45A049", // Màu nền khi hover
                            },
                        }}
                        startIcon={<DocumentArrowDownIcon className="h-5 w-5" />}
                    >
                        Xuất File Excel
                    </Button>
                </Box>
            </Box>

            {/* Bảng danh sách sản phẩm */}
            <TableContainer
                sx={{
                    maxHeight: 400, // Chiều cao tối đa của bảng
                    overflowY: "auto", // Thêm thanh cuộn dọc nếu nội dung vượt quá chiều cao
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>Tên sản phẩm</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Hình ảnh</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Giá</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Số lượng</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Thương hiệu</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                hover
                                sx={{
                                    "&:hover": { backgroundColor: "#f9f9f9" },
                                }}
                            >
                                <TableCell>{product.name}</TableCell>
                                <TableCell>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: "64px",
                                            height: "64px",
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{product.price.toLocaleString()} VND</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>
                                    <Typography
                                        fontWeight="bold"
                                        color={
                                            product.status === "Còn hàng"
                                                ? "green"
                                                : product.status === "Hết hàng"
                                                    ? "red"
                                                    : "orange"
                                        }
                                    >
                                        {product.status}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" gap={1}>
                                        {/* Nút Sửa */}
                                        <Button
                                            onClick={() => onEdit(product)}
                                            variant="contained"
                                            color="warning"
                                            size="small"
                                            startIcon={<PencilSquareIcon className="h-4 w-4" />}
                                        >
                                            Sửa
                                        </Button>

                                        {/* Nút Xóa */}
                                        <Button
                                            onClick={() => onDelete(product.id)}
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            startIcon={<TrashIcon className="h-4 w-4" />}
                                        >
                                            Xóa
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ProductList;