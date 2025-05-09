import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { FaTv, FaClipboardList, FaUsers } from "react-icons/fa";

const Sidebar = () => {
    const menuItems = [
        { name: "Trang quản lý", icon: <MdDashboard />, path: "/admin" },
        { name: "Sản phẩm", icon: <FaTv />, path: "/admin/products" },
        { name: "Đơn hàng", icon: <FaClipboardList />, path: "/admin/orders" },
        { name: "Khách hàng", icon: <FaUsers />, path: "/admin/customers" },
        { name: "Cài đặt", icon: <MdOutlineSettings />, path: "/admin/settings" },
    ];

    return (
        <div className="w-[250px] h-screen bg-gray-100 shadow-md">
            {/* Logo */}
            <div className="flex justify-center items-center p-4">
                <NavLink to="/">
                    <img
                        src="/img/logo.png"
                        alt="Logo"
                        className="w-[130px] rounded-full cursor-pointer"
                    />
                </NavLink>
            </div>

            {/* Menu Items */}
            <ul className="mt-6 space-y-2">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <NavLink
                            to={item.path}
                            end // Đảm bảo chỉ kích hoạt khi đường dẫn khớp chính xác
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                    ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg"
                                    : "text-gray-700 hover:bg-gray-200"
                                }`
                            }
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;