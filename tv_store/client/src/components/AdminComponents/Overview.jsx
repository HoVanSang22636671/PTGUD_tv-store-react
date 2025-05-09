import React from "react";
import { FaShoppingCart, FaDollarSign, FaUser } from "react-icons/fa"; // Thay thế icon hình ảnh
import { MdOutlineWidgets } from "react-icons/md"; // Icon cho Overview Header

// Card Component
const Card = ({ title, value, percent, icon, bg, isCurrency }) => (
    <div className={`flex justify-between items-center p-4 rounded-2xl shadow-md transition-transform transform hover:scale-105 ${bg}`}>
        <div className="text-left">
            <p className="text-sm font-semibold text-gray-700">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">
                {isCurrency ? `${Number(value).toLocaleString()} VNĐ` : Number(value).toLocaleString()}
            </h3>
            <p className="text-sm text-green-600 mt-1">
                ▲ {percent}% <span className="text-gray-500">so với kỳ trước</span>
            </p>
        </div>
        {/* Render Icon */}
        <div className="w-12 h-12 flex items-center justify-center text-gray-700 text-2xl">
            {icon}
        </div>
    </div>
);

function Overview() {
    // Static data for display
    const data = {
        turnover: 92405000,
        profit: 32218000,
        customer: 298,
    };

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <MdOutlineWidgets size={32} className="text-gray-700" />
                <h3 className="text-2xl font-bold text-gray-800">Tổng quan</h3>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                    title="Doanh thu"
                    value={data.turnover}
                    percent={5.39}
                    icon={<FaShoppingCart />}
                    bg="bg-red-100"
                    isCurrency={true} // Hiển thị mệnh giá VNĐ
                />
                <Card
                    title="Lợi nhuận"
                    value={data.profit}
                    percent={5.39}
                    icon={<FaDollarSign />}
                    bg="bg-blue-100"
                    isCurrency={true} // Hiển thị mệnh giá VNĐ
                />
                <Card
                    title="Khách hàng mới"
                    value={data.customer}
                    percent={6.84}
                    icon={<FaUser />}
                    bg="bg-green-100"
                    isCurrency={false} // Không hiển thị mệnh giá VNĐ
                />
            </div>
        </div>
    );
}

export default Overview;