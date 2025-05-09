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
} from "@mui/material";

const OrderList = ({ orders, onSelectOrder }) => {
    return (
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
    );
};

export default OrderList;