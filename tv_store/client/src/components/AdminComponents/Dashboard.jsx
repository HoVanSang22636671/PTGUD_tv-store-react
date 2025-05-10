import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
} from "@mui/material";
import OrderTable from "./DBComponents/OrderTable"; // Bảng hiển thị đơn hàng
import BestSellingTable from "./DBComponents/BestSellingTable";
import LowStockWarning from "./DBComponents/LowStockWarning";
import Charts from "./DBComponents/Charts";
import { useProduct } from "../../API/UseProvider"; // Lấy dữ liệu từ UserProvider

const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState("orders"); // Trạng thái hiển thị filter
    const { product, loading, accountList } = useProduct(); // Lấy dữ liệu từ UserProvider

    if (loading) {
        return <Typography>Đang tải dữ liệu...</Typography>;
    }

    // Lấy tất cả đơn hàng từ người dùng
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
console.log(initialOrders);
    // Nếu không có đơn hàng, tạo dữ liệu mẫu
    const allOrders = initialOrders?.length > 0 ? initialOrders : [
        {
            id: 1,
            customerName: "Nguyễn Văn A",
            total: 2000000, // Giá trị đơn hàng mẫu
            status: "Đang xử lý",
            date: "10/05/2025", // Ngày mẫu
        },
        {
            id: 2,
            customerName: "Trần Thị B",
            total: 1500000, // Giá trị đơn hàng mẫu
            status: "Hoàn thành",
            date: "09/05/2025", // Ngày mẫu
        },
        {
            id: 3,
            customerName: "Lê Văn C",
            total: 3000000, // Giá trị đơn hàng mẫu
            status: "Hủy",
            date: "08/05/2025", // Ngày mẫu
        },
    ];

    // Dữ liệu sản phẩm bán chạy
    const bestSellingProducts = product
        .filter((p) => p.sold) // Chỉ lấy sản phẩm có lượt bán
        .sort((a, b) => b.sold - a.sold) // Sắp xếp theo số lượng bán giảm dần
        .slice(0, 5) // Lấy 5 sản phẩm đầu tiên
        .map((p) => ({
            productName: p.name, // Sử dụng trực tiếp trường "name"
            sales: p.sold, // Số lượng đã bán
        }));

    // Dữ liệu cảnh báo tồn kho
    const lowStockProducts = product
        .filter((p) => p.inventory < 5) // Chỉ lấy sản phẩm có tồn kho thấp
        .map((p) => ({
            name: p.name, // Sử dụng trực tiếp trường "name"
            stock: p.inventory, // Số lượng tồn kho
        }));

    return (
        <Paper sx={{ p: 4, boxShadow: 3, backgroundColor: "#ffffff", borderRadius: 2, height: "100%", overflow: "hidden" }}>
            {/* Tiêu đề */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Báo cáo chi tiết
            </Typography>

            {/* Nút chuyển đổi giữa các filter */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <Button
                    variant={activeFilter === "orders" ? "contained" : "outlined"}
                    color="primary"
                    size="large"
                    sx={{
                        borderRadius: 2,
                        fontWeight: "bold",
                        boxShadow: activeFilter === "orders" ? 2 : 0,
                    }}
                    onClick={() => setActiveFilter("orders")}
                >
                    Danh sách đơn hàng
                </Button>
                <Button
                    variant={activeFilter === "products" ? "contained" : "outlined"}
                    color="primary"
                    size="large"
                    sx={{
                        borderRadius: 2,
                        fontWeight: "bold",
                        boxShadow: activeFilter === "products" ? 2 : 0,
                    }}
                    onClick={() => setActiveFilter("products")}
                >
                    Sản phẩm bán chạy
                </Button>
                <Button
                    variant={activeFilter === "lowStock" ? "contained" : "outlined"}
                    color="primary"
                    size="large"
                    sx={{
                        borderRadius: 2,
                        fontWeight: "bold",
                        boxShadow: activeFilter === "lowStock" ? 2 : 0,
                    }}
                    onClick={() => setActiveFilter("lowStock")}
                >
                    Cảnh báo tồn kho
                </Button>
                <Button
                    variant={activeFilter === "charts" ? "contained" : "outlined"}
                    color="primary"
                    size="large"
                    sx={{
                        borderRadius: 2,
                        fontWeight: "bold",
                        boxShadow: activeFilter === "charts" ? 2 : 0,
                    }}
                    onClick={() => setActiveFilter("charts")}
                >
                    Biểu đồ
                </Button>
            </Box>

            {/* Hiển thị nội dung dựa trên filter */}
            <Box sx={{ height: "calc(100% - 64px)", overflowY: "auto" }}>
                {activeFilter === "orders" && <OrderTable data={allOrders} />}
                {activeFilter === "products" && <BestSellingTable data={bestSellingProducts} />}
                {activeFilter === "lowStock" && <LowStockWarning products={lowStockProducts} />}
                {activeFilter === "charts" && <Charts />}
            </Box>
        </Paper>
    );
};

export default Dashboard;