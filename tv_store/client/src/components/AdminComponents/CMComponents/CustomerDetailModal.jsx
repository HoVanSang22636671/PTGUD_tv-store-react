import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const CustomerDetailModal = ({ customer, onClose, onSave }) => {
    const [form, setForm] = useState(customer || {});

    // Cập nhật thông tin form mỗi khi customer thay đổi
    useEffect(() => {
        setForm(customer || {});
    }, [customer]);

    // Xử lý khi thay đổi thông tin trong form
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Hàm lưu thông tin chỉnh sửa
    const handleSave = () => {
        onSave(form); // Gọi callback để lưu thông tin
        onClose(); // Đóng modal
    };

    if (!customer) return null;

    return (
        <Dialog open={Boolean(customer)} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Thông tin chi tiết khách hàng</DialogTitle>
            <DialogContent>
                {/* Thông tin khách hàng */}
                <Typography variant="h6" gutterBottom>
                    Thông tin cá nhân
                </Typography>
                <TextField
                    label="Họ tên"
                    name="name"
                    value={form.name || ""}
                    onChange={handleFormChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Số điện thoại"
                    name="phone"
                    value={form.phone || ""}
                    onChange={handleFormChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={form.email || ""}
                    onChange={handleFormChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Địa chỉ"
                    name="address"
                    value={form.address || ""}
                    onChange={handleFormChange}
                    fullWidth
                    margin="normal"
                />

                {/* Danh sách đơn hàng */}
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Danh sách đơn hàng
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Mã đơn hàng</strong></TableCell>
                                <TableCell><strong>Ngày đặt</strong></TableCell>
                                <TableCell><strong>Tổng tiền</strong></TableCell>
                                <TableCell><strong>Trạng thái</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customer.orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.total.toLocaleString()} VND</TableCell>
                                    <TableCell>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Hủy
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerDetailModal;