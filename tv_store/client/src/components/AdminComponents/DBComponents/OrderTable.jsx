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
} from "@mui/material";

const OrderTable = ({ data }) => {
    return (
        <Paper sx={{ p: 3, boxShadow: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Danh sách đơn hàng
            </Typography>
            {/* Giới hạn chiều cao và thêm overflow-y: auto */}
            <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                            <TableCell><strong>Tên khách hàng</strong></TableCell>
                            <TableCell><strong>Sản phẩm</strong></TableCell>
                            <TableCell><strong>Giá trị đơn hàng</strong></TableCell>
                            <TableCell><strong>Ngày đặt hàng</strong></TableCell>
                            <TableCell><strong>Trạng thái</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:hover": { backgroundColor: "#f9f9f9" },
                                }}
                            >
                                <TableCell>{item.customerName}</TableCell>
                                <TableCell>{item.product}</TableCell>
                                <TableCell>{item.orderValue.toLocaleString()} VND</TableCell>
                                <TableCell>{item.orderDate}</TableCell>
                                <TableCell>
                                    <Typography
                                        fontWeight="bold"
                                        color={
                                            item.status === "Đang xử lý"
                                                ? "orange"
                                                : item.status === "Hoàn thành"
                                                    ? "green"
                                                    : "red"
                                        }
                                    >
                                        {item.status}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default OrderTable;