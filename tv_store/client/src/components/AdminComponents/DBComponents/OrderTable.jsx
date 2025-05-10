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

const OrderTable = ({ data = [] }) => {
    return (
        <Paper sx={{ p: 3, boxShadow: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Danh sách đơn hàng gần đây
            </Typography>
            {/* Giới hạn chiều cao và thêm overflow-y: auto */}
            <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                            <TableCell><strong>Tên khách hàng</strong></TableCell>

                            <TableCell><strong>Giá trị đơn hàng</strong></TableCell>
                            <TableCell><strong>Ngày đặt hàng</strong></TableCell>
                            <TableCell><strong>Trạng thái</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{
                                        "&:hover": { backgroundColor: "#f9f9f9" },
                                    }}
                                >
                                    <TableCell>{item.customerName || "Không xác định"}</TableCell>

                                    <TableCell>
                                        {item.date !== undefined
                                            ? `${item.total.toLocaleString()} VND`
                                            : "N/A"}
                                    </TableCell>
                                    <TableCell>{item.date || "N/A"}</TableCell>
                                    <TableCell>
                                        <Typography
                                            fontWeight="bold"
                                            color={
                                                item.status === "processing" || item.status === "shipping"
                                                    ? "orange"
                                                    : item.status === "delivered"
                                                        ? "green"
                                                        : "red"
                                            }
                                        >
                                            {item.status}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body1" color="textSecondary">
                                        Không có dữ liệu đơn hàng
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default OrderTable;