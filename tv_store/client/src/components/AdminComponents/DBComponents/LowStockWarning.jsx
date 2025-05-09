import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
    Box,
} from "@mui/material";
import * as XLSX from "xlsx"; // Import thư viện SheetJS
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";

const LowStockWarning = ({ products }) => {
    // Lọc sản phẩm có số lượng tồn kho < 5
    const lowStockProducts = products.filter(product => product.stock < 5);

    const handleExportToExcel = () => {
        // Tạo một WorkSheet từ dữ liệu sản phẩm tồn kho thấp
        const worksheet = XLSX.utils.json_to_sheet(lowStockProducts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "LowStockWarning");
        XLSX.writeFile(workbook, "CanhBaoTonKho.xlsx");
    };

    return (
        <Paper sx={{ p: 3, boxShadow: 3, mb: 4 }}>
            {/* Tiêu đề và nút Xuất Excel */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                    Cảnh báo tồn kho
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleExportToExcel}
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

            <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                            <TableCell><strong>Tên sản phẩm</strong></TableCell>
                            <TableCell><strong>Số lượng</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lowStockProducts.length > 0 ? (
                            lowStockProducts.map((product, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:hover": { backgroundColor: "#f9f9f9" },
                                    }}
                                >
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.stock}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">
                                    Không có sản phẩm nào cần cảnh báo tồn kho.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default LowStockWarning;