import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Charts = ({ revenueData, orderStatusData }) => {
    // Cấu hình cho biểu đồ đường (Doanh thu 7 ngày gần nhất)
    const lineChartOptions = {
        title: {
            text: "Doanh thu 7 ngày gần nhất",
        },
        xAxis: {
            categories: revenueData.map((item) => item.date), // Dữ liệu ngày
            title: {
                text: "Ngày",
            },
        },
        yAxis: {
            title: {
                text: "Doanh thu (VNĐ)",
            },
        },
        series: [
            {
                name: "Doanh thu",
                data: revenueData.map((item) => item.revenue), // Dữ liệu doanh thu
                color: "#8884d8",
                dataLabels: {
                    enabled: true, // Bật hiển thị số liệu trực tiếp
                    format: "{y} VNĐ", // Định dạng hiển thị
                },
            },
        ],
        chart: {
            type: "line",
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true, // Hiển thị số liệu trên tất cả các điểm
                },
            },
        },
    };

    // Cấu hình cho biểu đồ Pie (Tỷ lệ trạng thái đơn hàng)
    const pieChartOptions = {
        title: {
            text: "Tỷ lệ trạng thái đơn hàng",
        },
        series: [
            {
                type: "pie",
                name: "Tỷ lệ",
                data: orderStatusData.map((item) => [item.status, item.value]), // Dữ liệu trạng thái đơn hàng
                colors: ["#0088FE", "#FFBB28", "#FF4444"], // Màu sắc
                dataLabels: {
                    enabled: true, // Bật hiển thị số liệu trực tiếp
                    format: "{point.name}: {point.percentage:.1f}%", // Định dạng hiển thị (Tên và phần trăm)
                },
            },
        ],
        chart: {
            type: "pie",
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>", // Tooltip khi di chuột
        },
    };

    return (
        <Paper sx={{ p: 3, boxShadow: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Biểu đồ doanh thu và trạng thái đơn hàng
            </Typography>

            {/* Container để đặt hai biểu đồ nằm cạnh nhau */}
            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                {/* Biểu đồ đường */}
                <Box sx={{ flex: 1, minWidth: "500px" }}>
                    <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
                </Box>

                {/* Biểu đồ Pie */}
                <Box sx={{ flex: 1, minWidth: "400px" }}>
                    <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
                </Box>
            </Box>
        </Paper>
    );
};

export default Charts;