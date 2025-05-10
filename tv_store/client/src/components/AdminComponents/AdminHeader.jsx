import React from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

// Map URL paths to page titles
const pageTitles = {
  "/admin": "Quản lý",
  "/admin/account": "Quản lý tài khoản",
  "/admin/products": "Sản phẩm",
  "/admin/orders": "Đơn hàng",
  "/admin/customers": "Khách hàng",
  "/admin/settings": "Cài đặt",
  // Add other routes and their corresponding titles here
};

function AdminHeader({ isSidebarOpen, toggleSidebar }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageTitle = pageTitles[currentPath] || "Quản lý"; // Default to "Quản lý" if no match

  return (
    <div className="bg-gray-100 shadow-md py-2 px-4 flex justify-between items-center relative z-50 h-[100px]">
      {/* Menu Toggle Button */}
      <button
        className="text-gray-700 md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX size={30} /> : <HiMenu size={30} />}
      </button>

      {/* Dynamic Page Title */}
      <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-red-500 py-2 px-4 rounded-lg shadow-md">
        <span className="text-2xl font-extrabold text-white tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:tracking-wider">
          {pageTitle}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative cursor-pointer group">
          <IoIosNotificationsOutline
            size={35}
            className="text-gray-700 hover:text-primary transition"
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* Account */}
        <div className="relative group">
          <Link
            to="/admin/account"
            className="flex items-center space-x-2 cursor-pointer"
          >
            <VscAccount size={35} className="text-gray-700 hover:text-primary transition" />
            <span className="text-gray-700 hover:text-primary text-sm hidden md:block md:text-xl">
              Admin
            </span>
          </Link>

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 h-[120px]">
            <Link
              to="/admin/account"
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
            >
              Quản lý tài khoản
            </Link>
            <Link
              to="/logout"
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
            >
              Đăng xuất
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;