import React, { useState, useMemo } from "react";
import {
    Typography, Box, TextField, MenuItem, Select,
    FormControl, InputLabel, Button
} from "@mui/material";
import CustomerTable from "./CMComponents/CustomerTable";
import CustomerDetailModal from "./CMComponents/CustomerDetailModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useProduct } from "../../API/UseProvider";

const CustomerManagement = () => {
    const { accountList, setAccountList, product } = useProduct();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterField, setFilterField] = useState("totalSpent");
    const [sortOrder, setSortOrder] = useState("desc");
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Tính tổng số lượng và tổng chi tiêu cho mỗi khách hàng
    const enrichedCustomers = useMemo(() => {
        return accountList.map(customer => {
            const orders = customer.order || [];
            let totalQuantity = 0;
            let totalSpent = 0;
            orders.forEach(order => {
                // Chỉ tính khi trạng thái đơn hàng là 'delivered'
                if (order.status === 'delivered') {
                    (order.products || []).forEach(item => {
                        const prod = product.find(p => String(p.id) === String(item.idProduct));
                        const price = prod ? prod.price : 0;
                        totalQuantity += item.quantity;
                        totalSpent += item.quantity * price;
                    });
                }
            });
            return {
                ...customer,
                fullName: customer.fullName || customer.userName,
                orderCount: orders.length,
                totalSpent,
                totalQuantity
            };
        });
    }, [accountList, product]);

    // Lọc và sắp xếp
    const filteredCustomers = useMemo(() => {
        return enrichedCustomers
            .filter(customer =>
                (customer.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (customer.phone || "").includes(searchQuery)
            )
            .sort((a, b) => {
                const aVal = a[filterField] ?? 0;
                const bVal = b[filterField] ?? 0;
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
            });
    }, [enrichedCustomers, searchQuery, filterField, sortOrder]);

    // Lưu thông tin khách hàng sau khi chỉnh sửa
    const handleSaveCustomer = updatedCustomer => {
        setAccountList(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    };

    // Xuất Excel
    const handleExportExcel = () => {
        const exportData = filteredCustomers.map(c => ({
            ID: c.id,
            Tên: c.fullName,
            Số_điện_thoại: c.phone,
            Email: c.email,
            Địa_chỉ: c.address,
            Trạng_thái: c.isActive ? 'Hoạt động' : 'Vô hiệu hóa',
            Số_đơn_hàng: c.orderCount,
            Tổng_chi_tiêu: c.totalSpent
        }));
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'KhachHang');
        const buf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'Danh_sach_khach_hang.xlsx');
    };

    return (
        <Box p={4} bgcolor="white" borderRadius={2} boxShadow={2}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Quản lý khách hàng
            </Typography>

            <Box mb={3} display="flex" alignItems="center" gap={2} flexWrap="wrap">
                <TextField
                    label="Tìm kiếm (Tên hoặc SĐT)"
                    variant="outlined"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    sx={{ width: 300 }}
                />
                <FormControl sx={{ width: 200 }}>
                    <InputLabel>Lọc theo</InputLabel>
                    <Select value={filterField} onChange={e => setFilterField(e.target.value)} label="Lọc theo">
                        <MenuItem value="totalSpent">Tổng chi tiêu</MenuItem>
                        <MenuItem value="orderCount">Số đơn hàng</MenuItem>
                        <MenuItem value="totalQuantity">Tổng số lượng</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ width: 200 }}>
                    <InputLabel>Thứ tự</InputLabel>
                    <Select value={sortOrder} onChange={e => setSortOrder(e.target.value)} label="Thứ tự">
                        <MenuItem value="asc">Tăng dần</MenuItem>
                        <MenuItem value="desc">Giảm dần</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleExportExcel}>
                    Xuất Excel
                </Button>
            </Box>

            <CustomerTable
                customers={filteredCustomers}
                onViewDetails={c => setSelectedCustomer(c)}
                onToggleActive={(id, isActive) =>
                    setAccountList(prev => prev.map(c => c.id === id ? { ...c, isActive } : c))
                }
                title="Danh sách khách hàng"
                onExportExcel={handleExportExcel}
            />

            {selectedCustomer && (
                <CustomerDetailModal
                    customer={selectedCustomer}
                    products={product}
                    onClose={() => setSelectedCustomer(null)}
                    onSave={handleSaveCustomer}
                />
            )}
        </Box>
    );
};

export default CustomerManagement;
