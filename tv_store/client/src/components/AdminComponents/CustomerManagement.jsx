import React, { useState } from "react";
import { Typography, Box, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import CustomerTable from "./CMComponents/CustomerTable";
import CustomerDetailModal from "./CMComponents/CustomerDetailModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const initialCustomers = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        phone: "0987654321",
        email: "nguyenvana@example.com",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        isActive: true,
        orderCount: 5,
        totalSpent: 5000000,
        orders: [
            { id: 101, date: "2025-01-01", total: 1000000, status: "Đã giao" },
            { id: 102, date: "2025-02-01", total: 2000000, status: "Đã giao" },
        ],
    },
    {
        id: 2,
        name: "Trần Thị B",
        phone: "0976543210",
        email: "tranthib@example.com",
        address: "456 Đường XYZ, Quận 5, TP.HCM",
        isActive: true,
        orderCount: 3,
        totalSpent: 3000000,
        orders: [
            { id: 201, date: "2025-03-01", total: 1500000, status: "Đã giao" },
            { id: 202, date: "2025-04-01", total: 1500000, status: "Đã giao" },
        ],
    },
];

const CustomerManagement = () => {
    const [customers, setCustomers] = useState(initialCustomers);
    const [searchQuery, setSearchQuery] = useState(""); // Tìm kiếm
    const [filterField, setFilterField] = useState("totalSpent"); // Lọc theo TotalSpent hoặc OrderCount
    const [sortOrder, setSortOrder] = useState("asc"); // Tăng dần hoặc giảm dần
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Hàm lọc và sắp xếp khách hàng
    const filteredCustomers = customers
        .filter(
            (customer) =>
                customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.phone.includes(searchQuery)
        )
        .sort((a, b) => {
            // Sắp xếp tăng dần hoặc giảm dần
            if (sortOrder === "asc") {
                return a[filterField] - b[filterField];
            } else {
                return b[filterField] - a[filterField];
            }
        });

    // Lưu thông tin khách hàng đã chỉnh sửa
    const handleSaveCustomer = (updatedCustomer) => {
        setCustomers((prev) =>
            prev.map((customer) =>
                customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
        );
    };

    // Hàm xuất file Excel
    const handleExportExcel = () => {
        const exportData = customers.map((customer) => ({
            ID: customer.id,
            Tên: customer.name,
            "Số điện thoại": customer.phone,
            Email: customer.email,
            "Địa chỉ": customer.address,
            "Trạng thái": customer.isActive ? "Hoạt động" : "Vô hiệu hóa",
            "Số đơn hàng": customer.orderCount,
            "Tổng chi tiêu": customer.totalSpent,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách khách hàng");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "Danh_sach_khach_hang.xlsx");
    };

    return (
        <Box p={4} bgcolor="white" borderRadius={2} boxShadow={2}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Tìm kiếm
            </Typography>

            {/* Thanh tìm kiếm */}
            <Box mb={3}>
                <TextField
                    label="Tìm kiếm khách hàng (Tên hoặc Số điện thoại)"
                    variant="outlined"
                    fullWidth={false}
                    margin="normal"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ width: "300px", height: "40px", mr: 2 }}
                />
            </Box>

            {/* Bộ lọc nâng cao */}
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <FormControl sx={{ width: "200px" }}>
                    <InputLabel>Lọc theo</InputLabel>
                    <Select
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                        label="Lọc theo"
                    >
                        <MenuItem value="totalSpent">Tổng chi tiêu</MenuItem>
                        <MenuItem value="orderCount">Số đơn hàng</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ width: "200px" }}>
                    <InputLabel>Thứ tự</InputLabel>
                    <Select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        label="Thứ tự"
                    >
                        <MenuItem value="asc">Tăng dần</MenuItem>
                        <MenuItem value="desc">Giảm dần</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Bảng danh sách khách hàng */}
            <CustomerTable
                customers={filteredCustomers}
                onViewDetails={(customer) => setSelectedCustomer(customer)}
                onToggleActive={(id, isActive) =>
                    setCustomers((prev) =>
                        prev.map((customer) =>
                            customer.id === id ? { ...customer, isActive } : customer
                        )
                    )
                }
                title="Danh sách khách hàng" // Tiêu đề truyền xuống
                onExportExcel={handleExportExcel} // Hàm xuất Excel truyền xuống
            />

            {/* Modal chi tiết khách hàng */}
            <CustomerDetailModal
                customer={selectedCustomer}
                onClose={() => setSelectedCustomer(null)}
                onSave={handleSaveCustomer}
            />
        </Box>
    );
};

export default CustomerManagement;