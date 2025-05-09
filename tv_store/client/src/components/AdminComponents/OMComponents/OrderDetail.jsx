import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Box,
} from "@mui/material";

const OrderDetail = ({ order, onClose, onChangeStatus }) => {
    if (!order) return null;

    // Hàm để lấy màu tương ứng với trạng thái đơn hàng
    const getStatusColor = (status) => {
        switch (status) {
            case "Đang xử lý":
                return "orange";
            case "Đã giao":
                return "green";
            case "Hủy":
                return "red";
            default:
                return "gray";
        }
    };

    return (
        <Dialog
            open={Boolean(order)}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: 8, // Bo góc modal
                },
            }}
            BackdropProps={{
                style: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Hiệu ứng nền mờ
                },
            }}
        >
            <DialogTitle
                sx={{
                    backgroundColor: "#f5f5f5",
                    borderBottom: "1px solid #ddd",
                    fontWeight: "bold",
                }}
            >
                Chi tiết đơn hàng
            </DialogTitle>
            <DialogContent
                sx={{
                    padding: "24px",
                }}
            >
                {/* Mã đơn hàng */}
                <Typography variant="body1" gutterBottom>
                    <strong>Mã đơn hàng:</strong> {order.id}
                </Typography>

                {/* Khách hàng */}
                <Typography variant="body1" gutterBottom>
                    <strong>Khách hàng:</strong> {order.customerName}
                </Typography>

                {/* Tổng tiền */}
                <Typography variant="body1" gutterBottom>
                    <strong>Tổng tiền:</strong>{" "}
                    <Typography
                        component="span"
                        sx={{ fontWeight: "bold", color: "#1976d2" }}
                    >
                        {order.total.toLocaleString()} VND
                    </Typography>
                </Typography>

                {/* Danh sách sản phẩm */}
                <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ fontWeight: "bold", marginTop: 2 }}
                >
                    Danh sách sản phẩm:
                </Typography>
                <Box
                    component="ul"
                    sx={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        "& li": {
                            marginBottom: "8px",
                            padding: "8px",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "4px",
                            border: "1px solid #ddd",
                        },
                    }}
                >
                    {order.items.map((item, index) => (
                        <li key={index}>
                            <Typography
                                variant="body2"
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>{item.name}</span>
                                <span>
                                    {item.quantity} x {item.price.toLocaleString()} VND
                                </span>
                            </Typography>
                        </li>
                    ))}
                </Box>

                {/* Trạng thái đơn hàng */}
                <Box>
                    <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", marginBottom: 1 }}
                    >
                        Trạng thái đơn hàng
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={order.status}
                            onChange={(e) => onChangeStatus(order.id, e.target.value)}
                            sx={{
                                color: getStatusColor(order.status), // Màu trạng thái
                                fontWeight: "bold",
                            }}
                        >
                            <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                            <MenuItem value="Đã giao">Đã giao</MenuItem>
                            <MenuItem value="Hủy">Hủy</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    padding: "16px",
                    borderTop: "1px solid #ddd",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="secondary"
                    sx={{ fontWeight: "bold" }}
                >
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderDetail;