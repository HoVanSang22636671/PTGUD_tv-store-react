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

const OrderList = ({ orders, onSelectOrder, title, onExportExcel }) => {
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
                            backgroundColor: "#45A049", // Màu nền khi hover
                        },
                    }}
                    startIcon={<DocumentArrowDownIcon className="h-5 w-5" />}
                >
                    Xuất File Excel
                </Button>
            </Box>

            {/* Bảng danh sách đơn hàng */}
            <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>Mã đơn hàng</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Khách hàng</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Tổng tiền</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Trạng thái</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Ngày đặt</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow
                                key={order.id}
                                hover
                                sx={{
                                    "&:hover": { backgroundColor: "#f9f9f9" }, // Hiệu ứng hover
                                }}
                            >
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.total.toLocaleString()} VND</TableCell>
                                <TableCell>
                                    <Typography
                                        fontWeight="bold"
                                        color={
                                            order.status === "Đang xử lý"
                                                ? "orange"
                                                : order.status === "Hoàn thành"
                                                    ? "green"
                                                    : "red"
                                        }
                                    >
                                        {order.status}
                                    </Typography>
                                </TableCell>
                                <TableCell>{order.date}</TableCell> {/* Hiển thị ngày đặt */}
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => onSelectOrder(order)}
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

export default OrderList;