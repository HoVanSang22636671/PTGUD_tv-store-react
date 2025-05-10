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

const CustomerDetailModal = ({ customer, onClose, onSave, products }) => {
    const [form, setForm] = useState(customer || {});

    useEffect(() => {
        setForm(customer || {});
    }, [customer]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSave = () => {
        onSave(form);
        onClose();
    };

    if (!customer) return null;

    console.log("Customer:", customer);
    console.log("Products:", products);

    return (
        <Dialog open={Boolean(customer)} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Thông tin chi tiết khách hàng</DialogTitle>
            <DialogContent>
                {/* Thông tin cá nhân */}
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
                            {(customer.order || []).map((order) => {
                                const total = (order.products || []).reduce((sum, item) => {
                                    const product = products.find((p) => String(p.id) === String(item.idProduct));
                                    console.log("Item:", item);
                                    console.log("Matched Product:", product);

                                    if (product) {
                                        return sum + (product.price || 0) * item.quantity;
                                    }
                                    return sum;
                                }, 0);

                                // Xử lý màu sắc trạng thái
                                const statusColor = order.status === "delivered" ? "green" : "black";

                                return (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>
                                            {order.date ? new Date(order.date).toLocaleDateString() : "—"}
                                        </TableCell>
                                        <TableCell>{total.toLocaleString()} VND</TableCell>
                                        <TableCell style={{ color: statusColor }}>
                                            {order.status || "—"}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
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
