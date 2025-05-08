import Sidebar from "../components/AdminComponents/Sidebar";
import AdminHeader from "../components/AdminComponents/AdminHeader";

function Admin() {
    return (
        <div className="bg-[#f5f5fa] transform transition-all duration-500 overflow-x-hidden flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <AdminHeader />

                {/* Admin Page Content */}
                <div className="p-4">
                    <h1 className="text-xl font-bold">Welcome to Admin Dashboard</h1>
                    <p className="text-gray-600">Use the sidebar to navigate through the admin functionalities.</p>
                </div>
            </div>
        </div>
    );
}

export default Admin;