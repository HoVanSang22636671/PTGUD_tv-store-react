import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/AdminComponents/Sidebar";
import AdminHeader from "../../components/AdminComponents/AdminHeader";
import Overview from "../../components/AdminComponents/Overview";

function Admin() {
    return (
        <div className="bg-[#f5f5fa] flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <AdminHeader />

                {/* Admin Page Content */}
                <div className="p-4 flex-1 flex flex-col overflow-hidden">
                    {/* Overview */}
                    <div className="sticky top-0 z-10 bg-[#f5f5fa]">
                        <Overview />
                    </div>

                    {/* Dynamic Content */}
                    <div className="mt-8 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                        <Outlet /> {/* Hiển thị nội dung của các routes con */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;