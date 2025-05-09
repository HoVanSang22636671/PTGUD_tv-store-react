import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Typography,
} from "@mui/material";

const CustomerTable = ({
    customers,
    onViewDetails,
    onToggleActive,
    title,           // Tiêu đề bảng
    onExportExcel    // Hàm xuất file Excel
}) => {
    return (
        <Box>
            {/* Tiêu đề và nút xuất Excel */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onExportExcel}
                >
                    Xuất Excel
                </Button>
            </Box>

            {/* Bảng danh sách khách hàng */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Tên khách hàng</strong></TableCell>
                            <TableCell><strong>Số đơn hàng</strong></TableCell>
                            <TableCell><strong>Tổng chi tiêu</strong></TableCell>
                            <TableCell><strong>Trạng thái</strong></TableCell>
                            <TableCell><strong>Hành động</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.id} hover>
                                <TableCell>{customer.id}</TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.orderCount}</TableCell>
                                <TableCell>{customer.totalSpent.toLocaleString()} VND</TableCell>
                                <TableCell>
                                    {customer.isActive ? "Hoạt động" : "Vô hiệu hóa"}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => onViewDetails(customer)}
                                        sx={{ mr: 1 }}
                                    >
                                        Chi tiết
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color={customer.isActive ? "secondary" : "success"}
                                        size="small"
                                        onClick={() => onToggleActive(customer.id, !customer.isActive)}
                                    >
                                        {customer.isActive ? "Vô hiệu hóa" : "Kích hoạt"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CustomerTable;