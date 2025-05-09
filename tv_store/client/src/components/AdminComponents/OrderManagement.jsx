import React, { useState } from "react";
import OrderList from "./OMComponents/OrderList";
import OrderDetail from "./OMComponents/OrderDetail";
import { sendNotification } from "./OMComponents/NotificationService";
import {
    Typography,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";

const initialOrders = [
    {
        id: 1,
        customerName: "Nguyễn Văn A",
        items: [
            { name: "Tivi LG 55 inch", quantity: 1, price: 11590000 },
            { name: "Máy giặt Samsung", quantity: 1, price: 8500000 },
        ],
        total: 20090000,
        status: "Đang xử lý",
        date: "2025-05-01",
    },
    {
        id: 2,
        customerName: "Trần Thị B",
        items: [{ name: "Tủ lạnh Panasonic", quantity: 1, price: 12490000 }],
        total: 12490000,
        status: "Đã giao",
        date: "2025-05-02",
    },
];

const OrderManagement = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchParams, setSearchParams] = useState({
        keyword: "",
        status: "",
        date: null,
    });

    // Hàm lọc danh sách đơn hàng
    const filterOrders = (updatedParams) => {
        const filteredOrders = initialOrders.filter((order) => {
            const matchesKeyword =
                order.customerName.toLowerCase().includes(updatedParams.keyword.toLowerCase());

            const matchesStatus =
                !updatedParams.status || order.status === updatedParams.status;

            const matchesDate =
                !updatedParams.date || order.date === updatedParams.date.format("YYYY-MM-DD");

            return matchesKeyword && matchesStatus && matchesDate;
        });

        setOrders(filteredOrders);
    };

    // Hàm xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        filterOrders(searchParams);
    };

    // Hàm xử lý khi thay đổi trạng thái
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        const updatedParams = { ...searchParams, status: newStatus };
        setSearchParams(updatedParams);
        filterOrders(updatedParams);
    };

    // Hàm xử lý khi thay đổi ngày
    const handleDateChange = (newDate) => {
        const updatedParams = { ...searchParams, date: newDate };
        setSearchParams(updatedParams);
        filterOrders(updatedParams);
    };

    // Hàm xử lý khi thay đổi trạng thái đơn hàng
    const handleOrderStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);

        // Gửi thông báo đến khách hàng
        const order = orders.find((order) => order.id === orderId);
        sendNotification(order.customerName, newStatus);
    };

    // Hàm xử lý khi chọn đơn hàng
    const handleSelectOrder = (order) => {
        setSelectedOrder(order); // Đặt đơn hàng đã chọn vào state `selectedOrder`
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box p={4} bgcolor="white" borderRadius={2} boxShadow={2}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Tìm kiếm
                </Typography>

                {/* Thanh tìm kiếm */}
                <Box display="flex" flexDirection="column" gap={2} mb={4}>
                    <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
                        {/* Ô tìm kiếm */}
                        <TextField
                            label="Tìm kiếm tên khách hàng"
                            variant="outlined"
                            size="small"
                            value={searchParams.keyword}
                            onChange={(e) => {
                                setSearchParams({ ...searchParams, keyword: e.target.value });
                            }}
                            sx={{ flex: 1, maxWidth: 500 }} // Giảm chiều rộng xuống 500px
                        />

                        {/* Nút Tìm kiếm */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            sx={{ height: "40px" }} // Đồng bộ chiều cao với TextField
                        >
                            Tìm kiếm
                        </Button>
                    </Box>

                    <Box display="flex" gap={2} flexWrap="wrap">
                        <FormControl size="small" sx={{ minWidth: 238 }}>
                            <InputLabel id="status-label">Trạng thái</InputLabel>
                            <Select
                                labelId="status-label"
                                value={searchParams.status}
                                onChange={handleStatusChange}
                                label="Trạng thái"
                            >
                                <MenuItem value="">Tất cả</MenuItem>
                                <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                                <MenuItem value="Đã giao">Đã giao</MenuItem>
                                <MenuItem value="Hủy">Hủy</MenuItem>
                            </Select>
                        </FormControl>

                        <DatePicker
                            label="Ngày tạo đơn hàng"
                            value={searchParams.date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} size="small" sx={{ minWidth: 215, minHeight: 40 }} />}
                        />
                    </Box>
                </Box>

                <OrderList
                    orders={orders}
                    onSelectOrder={handleSelectOrder}
                    title="Danh sách đơn hàng"
                    onExportExcel={() => console.log("Xuất Excel")} // Hàm giả lập cho nút Xuất Excel
                />
                {selectedOrder && (
                    <OrderDetail
                        order={selectedOrder}
                        onClose={() => setSelectedOrder(null)}
                        onChangeStatus={handleOrderStatusChange}
                    />
                )}
            </Box>
        </LocalizationProvider>
    );
};

export default OrderManagement;