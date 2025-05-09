import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
} from "@mui/material";
import OrderTable from "./DBComponents/OrderTable";
import BestSellingTable from "./DBComponents/BestSellingTable";
import LowStockWarning from "./DBComponents/LowStockWarning";
import Charts from "./DBComponents/Charts";

// Dữ liệu đơn hàng
const orders = [
    { customerName: "Nguyễn Văn A", product: "Google Tivi LED Hisense 4K 43 inch", orderValue: 6490000, orderDate: "2025-05-01", status: "Đang xử lý" },
    { customerName: "Trần Thị B", product: "Tivi Panasonic Full HD 75 inch A8H", orderValue: 7590000, orderDate: "2025-05-02", status: "Hoàn thành" },
    { customerName: "Hoàng Minh C", product: "Tivi TCL 4K UHD 43 inch S5400A", orderValue: 8990000, orderDate: "2025-05-03", status: "Hủy bỏ" },
    { customerName: "Lê Thị D", product: "Tivi Sony QLED 4K 50 inch P635", orderValue: 9990000, orderDate: "2025-05-04", status: "Hoàn thành" },
    { customerName: "Phạm Văn E", product: "Tivi LG Full HD 55 inch C645", orderValue: 11590000, orderDate: "2025-05-05", status: "Đang xử lý" },
];

// Dữ liệu sản phẩm bán chạy
const bestSellingProducts = [
    { productName: "Google Tivi LED Hisense 4K 43 inch", sales: 120 },
    { productName: "Tivi Panasonic Full HD 75 inch A8H", sales: 95 },
    { productName: "Tivi TCL 4K UHD 43 inch S5400A", sales: 80 },
    { productName: "Tivi Sony QLED 4K 50 inch P635", sales: 60 },
];

// Dữ liệu tồn kho thấp
const lowStockProducts = [
    { name: "Sản phẩm A", stock: 3 },
    { name: "Sản phẩm B", stock: 10 },
    { name: "Sản phẩm C", stock: 1 },
    { name: "Sản phẩm D", stock: 6 },
];

// Dữ liệu doanh thu cho biểu đồ
const revenueData = [
    { date: "2025-05-03", revenue: 1200 },
    { date: "2025-05-04", revenue: 1500 },
    { date: "2025-05-05", revenue: 800 },
    { date: "2025-05-06", revenue: 2200 },
    { date: "2025-05-07", revenue: 1700 },
    { date: "2025-05-08", revenue: 2500 },
    { date: "2025-05-09", revenue: 2000 },
];

// Dữ liệu trạng thái đơn hàng cho biểu đồ
const orderStatusData = [
    { status: "Hoàn thành", value: 50 },
    { status: "Đang xử lý", value: 30 },
    { status: "Hủy", value: 20 },
];

const Dashboard = () => {
    const [activeFilter, setActiveFilter] = useState("orders"); // Trạng thái hiển thị filter

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
                    Danh sách đơn hàng gần đây
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
                {activeFilter === "orders" && <OrderTable data={orders} />}
                {activeFilter === "products" && <BestSellingTable data={bestSellingProducts} />}
                {activeFilter === "lowStock" && <LowStockWarning products={lowStockProducts} />}
                {activeFilter === "charts" && <Charts revenueData={revenueData} orderStatusData={orderStatusData} />}
            </Box>
        </Paper>
    );
};

export default Dashboard;