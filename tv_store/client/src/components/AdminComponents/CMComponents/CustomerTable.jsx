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
import { DocumentArrowDownIcon } from "@heroicons/react/24/solid";

const CustomerTable = ({ customers, onViewDetails, onToggleActive, title, onExportExcel }) => {
    return (
        <Paper sx={{ p: 3, boxShadow: 3, mb: 4 }}>
            {/* Tiêu đề và nút Xuất Excel */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                    {title}
                </Typography>
                <Button
                    variant="contained"
                    onClick={onExportExcel}
                    sx={{
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        borderRadius: "4px",
                        "&:hover": {
                            backgroundColor: "#45A049",
                        },
                    }}
                    startIcon={<DocumentArrowDownIcon className="h-5 w-5" />}
                >
                    Xuất File Excel
                </Button>
            </Box>

            {/* Bảng danh sách khách hàng */}
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Tên khách hàng</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Số đơn hàng</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Tổng số lượng</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Tổng chi tiêu</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow
                                key={customer.id}
                                hover
                                sx={{
                                    "&:hover": { backgroundColor: "#f9f9f9" },
                                }}
                            >
                                <TableCell>{customer.id}</TableCell>
                                <TableCell>{customer.fullName || customer.name}</TableCell>
                                <TableCell>{customer.orderCount}</TableCell>
                                <TableCell>{customer.totalQuantity}</TableCell>
                                <TableCell>
                                    {customer.totalSpent.toLocaleString()} VND
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        fontWeight="bold"
                                        color={ "green" }
                                    >
                                        Hoạt động
                                    </Typography>
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
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default CustomerTable;
