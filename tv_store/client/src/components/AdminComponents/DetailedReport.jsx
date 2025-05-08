import React, { useState } from "react";
import { FaFileExport, FaFileImport } from "react-icons/fa";

const data = [
    {
        customerName: "Nguyễn Văn A",
        product: "Google Tivi LED Hisense 4K 43 inch",
        orderValue: 6490000,
        orderDate: "2025-05-01",
        status: "Đang xử lý",
    },
    {
        customerName: "Trần Thị B",
        product: "Tivi Panasonic Full HD 75 inch A8H",
        orderValue: 7590000,
        orderDate: "2025-05-02",
        status: "Hoàn thành",
    },
    {
        customerName: "Hoàng Minh C",
        product: "Tivi TCL 4K UHD 43 inch S5400A",
        orderValue: 8990000,
        orderDate: "2025-05-03",
        status: "Hủy bỏ",
    },
    {
        customerName: "Lê Thị D",
        product: "Tivi Sony QLED 4K 50 inch P635",
        orderValue: 9990000,
        orderDate: "2025-05-04",
        status: "Hoàn thành",
    },
    {
        customerName: "Phạm Văn E",
        product: "Tivi LG Full HD 55 inch C645",
        orderValue: 11590000,
        orderDate: "2025-05-05",
        status: "Đang xử lý",
    },
];


const DetailedReport = () => {
    const [filter, setFilter] = useState({ status: "", search: "" });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prev) => ({ ...prev, [name]: value }));
    };

    const filteredData = data.filter((item) => {
        return (
            (filter.status === "" || item.status === filter.status) &&
            (filter.search === "" || item.customerName.toLowerCase().includes(filter.search.toLowerCase()))
        );
    });

    const exportToCSV = () => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            ["Tên khách hàng, Sản phẩm, Giá trị đơn hàng, Ngày đặt hàng, Trạng thái"]
                .concat(
                    filteredData.map(
                        (item) =>
                            `${item.customerName}, ${item.product}, ${item.orderValue}, ${item.orderDate}, ${item.status}`
                    )
                )
                .join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "detailed_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Bảng báo cáo chi tiết</h2>

            {/* Bộ lọc */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    name="search"
                    placeholder="Tìm kiếm theo tên khách hàng..."
                    value={filter.search}
                    onChange={handleFilterChange}
                    className="p-2 border rounded-md w-full md:w-1/3"
                />
                <select
                    name="status"
                    value={filter.status}
                    onChange={handleFilterChange}
                    className="p-2 border rounded-md w-full md:w-1/3"
                >
                    <option value="">Tất cả trạng thái</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Hoàn thành">Hoàn thành</option>
                    <option value="Hủy bỏ">Hủy bỏ</option>
                </select>
                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    <FaFileExport /> Xuất CSV
                </button>
            </div>

            {/* Bảng dữ liệu */}
            <div className="overflow-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Tên khách hàng</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Sản phẩm</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Giá trị đơn hàng</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Ngày đặt hàng</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{item.customerName}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.product}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {item.orderValue.toLocaleString()} VND
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{item.orderDate}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DetailedReport;