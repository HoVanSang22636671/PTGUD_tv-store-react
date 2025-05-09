import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

const OrderDetail = ({ order, onClose, onChangeStatus }) => {
    if (!order) return null;

    return (
        <div>
            {/* Nền mờ phía sau */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Tạo nền mờ
                    zIndex: 999, // Đảm bảo nằm dưới modal
                }}
            />

            {/* Modal */}
            <Dialog open={Boolean(order)} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Chi tiết đơn hàng</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        <strong>Mã đơn hàng:</strong> {order.id}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Khách hàng:</strong> {order.customerName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Tổng tiền:</strong> {order.total.toLocaleString()} VND
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Danh sách sản phẩm:</strong>
                    </Typography>
                    <ul>
                        {order.items.map((item, index) => (
                            <li key={index}>
                                {item.name} - {item.quantity} x {item.price.toLocaleString()} VND
                            </li>
                        ))}
                    </ul>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="status-label">Trạng thái đơn hàng</InputLabel>
                        <Select
                            labelId="status-label"
                            value={order.status}
                            onChange={(e) => onChangeStatus(order.id, e.target.value)}
                        >
                            <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                            <MenuItem value="Đã giao">Đã giao</MenuItem>
                            <MenuItem value="Hủy">Hủy</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} variant="contained" color="secondary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrderDetail;