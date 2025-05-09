import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from "@mui/material";

const BestSellingTable = ({ data }) => {
    return (
        <Paper sx={{ p: 3, boxShadow: 3, mb: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Sản phẩm bán chạy
            </Typography>
            {/* Giới hạn chiều cao và thêm overflow-y: auto */}
            <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                            <TableCell><strong>Tên sản phẩm</strong></TableCell>
                            <TableCell><strong>Số lượt bán</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:hover": { backgroundColor: "#f9f9f9" },
                                }}
                            >
                                <TableCell>{item.productName}</TableCell>
                                <TableCell>{item.sales}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default BestSellingTable;