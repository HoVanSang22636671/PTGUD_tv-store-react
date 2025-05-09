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

const OrderList = ({ orders, onSelectOrder, title, onExportExcel }) => {
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

            {/* Bảng danh sách đơn hàng */}
            <TableContainer component={Paper} elevation={3} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Mã đơn hàng</strong></TableCell>
                            <TableCell><strong>Khách hàng</strong></TableCell>
                            <TableCell><strong>Tổng tiền</strong></TableCell>
                            <TableCell><strong>Trạng thái</strong></TableCell>
                            <TableCell><strong>Ngày đặt</strong></TableCell>
                            <TableCell><strong>Hành động</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} hover>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.total.toLocaleString()} VND</TableCell>
                                <TableCell>{order.status}</TableCell>
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
        </Box>
    );
};

export default OrderList;