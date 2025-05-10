import React, { useState, useEffect, useCallback } from "react";
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
import { useProduct } from "../../API/UseProvider";

const OrderManagement = () => {
    const { accountList, product } = useProduct();  // Lấy danh sách tài khoản và sản phẩm từ `useProduct`

    // Tính toán initialOrders chỉ một lần khi dữ liệu thay đổi
    const initialOrders = accountList?.flatMap(account =>
        account?.order?.map(order => {
            // Kiểm tra sự tồn tại của order.products
            const total = order.products?.reduce((sum, item) => {
                // Kiểm tra sự tồn tại của sản phẩm trong danh sách products
                const productFound = product.find(p => p.id === item.idProduct);
                if (productFound) {
                    return sum + (productFound.price * item.quantity); // Tính tổng tiền
                }
                return sum;
            }, 0) || 0; // Nếu không có sản phẩm thì tổng là 0

            return {
                id: order.id,
                customerName: account.fullName,
                items: order.items, // Nếu không sử dụng thì có thể bỏ đi
                total: total,
                status: order.status,
                date: order.date,
            };
        }) || [] // Nếu không có order thì trả về mảng rỗng
    );

    // Kiểm tra kết quả
    console.log(initialOrders);

    const [orders, setOrders] = useState([]);  // State lưu trữ danh sách đơn hàng

    // Chỉ cập nhật orders nếu cần thiết, tránh lặp lại re-render không cần thiết
    useEffect(() => {
        if (JSON.stringify(initialOrders) !== JSON.stringify(orders)) {
            setOrders(initialOrders);
        }
    }, [initialOrders, orders]); // Chạy lại khi `initialOrders` thay đổi

    // Kiểm tra kết quả khi orders thay đổi
    useEffect(() => {
        console.log(orders); // In ra state mỗi khi nó thay đổi
    }, [orders]);

    const [selectedOrder, setSelectedOrder] = useState(null);  // Lưu trữ đơn hàng đã chọn
    const [searchParams, setSearchParams] = useState({
        keyword: "",
        status: "",
        date: null,
    });

    // Hàm lọc danh sách đơn hàng
    const filterOrders = useCallback((updatedParams) => {
        const filteredOrders = initialOrders.filter((order) => {
            // Kiểm tra tìm kiếm theo tên khách hàng
            const matchesKeyword =
                order.customerName.toLowerCase().includes(updatedParams.keyword.toLowerCase());

            // Kiểm tra theo trạng thái
            const matchesStatus =
                !updatedParams.status || order.status === updatedParams.status;

            // Kiểm tra ngày
            const matchesDate =
                !updatedParams.date ||
                (updatedParams.date && order.date === updatedParams.date.format("YYYY-MM-DD"));

            return matchesKeyword && matchesStatus && matchesDate;
        });

        setOrders(filteredOrders);
    }, [initialOrders]); // Chỉ phụ thuộc vào initialOrders để tối ưu hóa

    // Hàm xử lý khi nhấn nút tìm kiếm
    const handleSearch = () => {
        filterOrders(searchParams);
    };

    // Hàm xử lý khi thay đổi trạng thái
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        const updatedParams = { ...searchParams, status: newStatus };
        setSearchParams(updatedParams); // Cập nhật trạng thái tìm kiếm
        filterOrders(updatedParams);  // Gọi lại hàm lọc
    };

    // Hàm xử lý khi thay đổi ngày
    const handleDateChange = (newDate) => {
        const updatedParams = { ...searchParams, date: newDate };
        setSearchParams(updatedParams); // Cập nhật ngày tìm kiếm
        filterOrders(updatedParams);  // Gọi lại hàm lọc
    };

    // Hàm xử lý khi thay đổi trạng thái đơn hàng
    const handleOrderStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );

        // Chỉ cập nhật khi orders thực sự thay đổi
        if (JSON.stringify(updatedOrders) !== JSON.stringify(orders)) {
            setOrders(updatedOrders);
        }

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
                                <MenuItem value="processing">Đang xử lý</MenuItem>
                                <MenuItem value="shipping">Đang giao</MenuItem>
                                <MenuItem value="delivered">Đã giao</MenuItem>
                                <MenuItem value="cancelled">Hủy</MenuItem>
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
