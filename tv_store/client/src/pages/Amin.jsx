import Sidebar from "../components/AdminComponents/Sidebar";
import AdminHeader from "../components/AdminComponents/AdminHeader";
import Overview from "../components/AdminComponents/Overview";

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
                    <Overview />
                </div>
            </div>
        </div>
    );
}

export default Admin;