import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
    LabelList,
} from "recharts";

// Màu sắc cho các trạng thái đơn hàng
const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF4444"];

const Charts = () => {
    // Dữ liệu mẫu cho doanh thu
    const revenueData = [
        { date: "2025-05-03", revenue: 2000000 },
        { date: "2025-05-04", revenue: 3500000 },
        { date: "2025-05-05", revenue: 5000000 },
        { date: "2025-05-06", revenue: 4500000 },
        { date: "2025-05-07", revenue: 4000000 },
        { date: "2025-05-08", revenue: 5200000 },
        { date: "2025-05-09", revenue: 6000000 },
    ];

    // Dữ liệu mẫu cho trạng thái đơn hàng
    const orderStatusData = [
        { status: "processing", value: 10 },
        { status: "shipping", value: 5 },
        { status: "delivered", value: 15 },
        { status: "cancelled", value: 3 },
    ];

    // Đảm bảo rằng dữ liệu trạng thái đơn hàng chứa đủ 4 trạng thái
    const defaultOrderStatusData = [
        { status: "processing", value: 0 },
        { status: "shipping", value: 0 },
        { status: "delivered", value: 0 },
        { status: "cancelled", value: 0 },
    ];

    // Hợp nhất dữ liệu mặc định với dữ liệu thực tế
    const mergedOrderStatusData = defaultOrderStatusData.map((defaultStatus) => {
        const matchingStatus = orderStatusData.find(
            (order) => order.status === defaultStatus.status
        );
        return {
            ...defaultStatus,
            value: matchingStatus ? matchingStatus.value : 0,
        };
    });

    return (
        <Paper sx={{ p: 3, boxShadow: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Biểu đồ doanh thu và trạng thái đơn hàng
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {/* Biểu đồ đường */}
                <Box sx={{ flex: 1, minWidth: "600px", textAlign: "center" }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Doanh thu 7 ngày gần nhất
                    </Typography>
                    <LineChart
                        width={600}
                        height={300}
                        data={revenueData}
                        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" label={{ value: "Ngày", position: "insideBottomRight", offset: -10 }} />
                        <YAxis label={{ value: "Doanh thu (VNĐ)", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }}>
                            <LabelList dataKey="revenue" position="top" formatter={(value) => `${value.toLocaleString()} VND`} />
                        </Line>
                    </LineChart>
                </Box>

                {/* Biểu đồ tròn */}
                <Box sx={{ flex: 1, minWidth: "400px", textAlign: "center" }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Tỷ lệ trạng thái đơn hàng
                    </Typography>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={mergedOrderStatusData}
                            cx="50%"
                            cy="50%"
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="status"
                        >
                            {mergedOrderStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </Box>
            </Box>
        </Paper>
    );
};

export default Charts;