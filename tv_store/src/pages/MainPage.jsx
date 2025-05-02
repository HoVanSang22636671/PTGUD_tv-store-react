import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
function MainPage() {
    return (
        <div className="bg-[#f5f5fa] transform transition-all duration-500 overflow-x-hidden">
            {/* Header */}
            <div className="w-full">
                <Header />
            </div>

            <Outlet />

            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
}
export default MainPage;