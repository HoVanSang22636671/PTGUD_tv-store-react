import React from "react";
import { NavLink, Link } from "react-router-dom";
import { MdDashboard, MdOutlineSettings, MdOutlineBarChart } from "react-icons/md";
import { FaTv, FaClipboardList, FaUsers } from "react-icons/fa";

const Sidebar = () => {
    const menuItems = [
        { name: "Trang quản lý", icon: <MdDashboard />, path: "/dashboard" },
        { name: "Sản phẩm", icon: <FaTv />, path: "/products" },
        { name: "Đơn hàng", icon: <FaClipboardList />, path: "/orders" },
        { name: "Khách hàng", icon: <FaUsers />, path: "/customers" },
        { name: "Thống kê", icon: <MdOutlineBarChart />, path: "/analytics" },
        { name: "Cài đặt", icon: <MdOutlineSettings />, path: "/settings" },
    ];

    return (
        <div className="w-[250px] h-screen bg-gray-100 shadow-md">
            {/* Logo */}
            <div className="flex justify-center items-center p-4">
                <Link to="/">
                    <img
                        src="/img/logo.png"
                        alt="Logo"
                        className="w-[130px] rounded-full cursor-pointer"
                    />
                </Link>
            </div>

            {/* Menu Items */}
            <ul className="mt-4">
                {menuItems.map((item, index) => (
                    <li key={index} className="flex items-center p-3 hover:bg-gray-200 cursor-pointer">
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg ${isActive ? "bg-pink-500 text-white" : "text-gray-700 hover:bg-pink-100"
                                }`
                            }
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;