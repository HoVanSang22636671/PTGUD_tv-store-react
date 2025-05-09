import Sidebar from "../../components/AdminComponents/Sidebar";
import AdminHeader from "../../components/AdminComponents/AdminHeader";
import Overview from "../../components/AdminComponents/Overview";
import Dashboard from "../../components/AdminComponents/Dashboard";

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
                <div className="p-4 flex-1 flex flex-col">
                    {/* Overview */}
                    <div className="sticky top-0 z-10 bg-[#f5f5fa]">
                        <Overview />
                    </div>

                    {/* Dashboard Area */}
                    <div className="mt-8 flex-1 overflow-y-auto">
                        <Dashboard />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;