import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const OrderStatus = ({ currentStatus, onChange }) => {
    return (
        <FormControl fullWidth size="small" sx={{ mt: 2 }}>
            <InputLabel id="status-label">Trạng thái đơn hàng</InputLabel>
            <Select
                labelId="status-label"
                value={currentStatus}
                onChange={(e) => onChange(e.target.value)}
                label="Trạng thái đơn hàng"
            >
                <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                <MenuItem value="Đã giao">Đã giao</MenuItem>
                <MenuItem value="Hủy">Hủy</MenuItem>
            </Select>
        </FormControl>
    );
};

export default OrderStatus;