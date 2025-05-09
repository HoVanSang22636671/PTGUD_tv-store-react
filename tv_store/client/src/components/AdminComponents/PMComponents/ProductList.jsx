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
        <div>
            {/* Tiêu đề */}
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5" fontWeight="bold">
                    Danh sách sản phẩm
                </Typography>
                <div className="flex gap-2">
                    {/* Nút Thêm sản phẩm */}
                    <Button
                        onClick={onAddProduct}
                        variant="contained"
                        color="primary"
                        startIcon={<PlusIcon className="h-5 w-5" />}
                    >
                        Thêm sản phẩm
                    </Button>

                    {/* Nút Xuất Excel */}
                    <Button
                        onClick={handleExportToExcel}
                        variant="contained"
                        color="success"
                        startIcon={<DocumentArrowDownIcon className="h-5 w-5" />}
                    >
                        Xuất file Excel
                    </Button>
                </div>
            </div>

            {/* Bảng danh sách sản phẩm */}
            <TableContainer
                component={Paper}
                elevation={3}
                style={{
                    maxHeight: "400px", // Chiều cao cố định
                    overflowY: "auto",  // Thêm thanh cuộn dọc
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Tên sản phẩm</TableCell>
                            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Hình ảnh</TableCell>
                            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Giá</TableCell>
                            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Số lượng</TableCell>
                            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Thương hiệu</TableCell>
                            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Trạng thái</TableCell>
                            <TableCell sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id} hover>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: "64px",
                                            height: "64px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{product.price.toLocaleString()} VND</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>{product.status}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
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
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProductList;