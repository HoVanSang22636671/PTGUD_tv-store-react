import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";

const LowStockWarning = ({ products }) => {
    // Lọc sản phẩm có số lượng tồn kho < 5
    const lowStockProducts = products.filter(product => product.stock < 5);

    return (
        <Paper sx={{ p: 3, boxShadow: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Cảnh báo tồn kho
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                            <TableCell><strong>Tên sản phẩm</strong></TableCell>
                            <TableCell><strong>Số lượng</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lowStockProducts.length > 0 ? (
                            lowStockProducts.map((product, index) => (
                                <TableRow key={index}>
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
}
export default LowStockWarning;