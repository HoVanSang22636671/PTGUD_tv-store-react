import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../API/UseProvider";
import { RiAccountCircle2Line } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { MdPassword, MdPolicy, MdSupervisorAccount } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import ConfirmDialog from "../message/ConfirmDialog";
import AccountInfo from "../components/itemsAccountInfo/AccountInfo";
const infoList = [
  { id: 1, name: "Thông tin tài khoản", icon: RiAccountCircle2Line },
  { id: 2, name: "Quản lý đơn hàng", icon: FaBookOpen },
  { id: 3, name: "Địa chỉ giao hàng", icon: IoLocationOutline },
  { id: 4, name: "Blog", icon: RiMoneyDollarBoxLine },
  { id: 5, name: "Hỗ trợ khách hàng", icon: MdSupervisorAccount },
  { id: 6, name: "Đổi mật khẩu", icon: MdPassword },
  { id: 7, name: "Chính sách", icon: MdPolicy },
  { id: 8, name: "Đăng xuất", icon: IoMdExit },
];


function AccountPage() {
  const { account, isAccount,logout } = useProduct();
  const navigate = useNavigate();
  const [filter, setFilter] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!account || !isAccount) {
    return <div>Vui lòng đăng nhập để xem thông tin tài khoản.</div>;
  }

  const handleMenuClick = (data) => {
    if (data.id === 8) {
      setShowConfirm(true);
    } else if (data.id === 3) {
      navigate("/instantShipping");
    } else if (data.id === 5) {
      navigate("/supportPage");
    }
    setFilter(data.id);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowConfirm(false);
  };

  return (
    <div className="bg-[#f5f5fa] min-h-screen">
      <div className="container mx-auto py-4 px-3">
        {/* Chia layout theo cột trên mobile và hàng trên desktop */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar */}
          <div className="w-full md:w-1/5">
            <div className="sticky top-0 bg-white mt-2 md:mt-4 rounded-md shadow-md">
              <div className="flex flex-col items-center py-4">
                <span className="text-gray-400">Tài khoản của</span>
                <h1 className="text-lg md:text-xl font-semibold">
                  {account.userName || "Khách hàng"}
                </h1>
              </div>
              <div className="border-t border-gray-300 mt-4">
                {infoList.map((data) => (
                  <div
                    key={data.id}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-900${
                      data.id === filter && data.id !== 6
                        ? "bg-gray-300"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleMenuClick(data)}
                  >
                    <data.icon className="text-[24px] md:text-[30px] text-blue-700" />
                    <span className="text-[16px] md:text-[18px] font-medium">
                      {data.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nội dung */}
          <div className="w-full md:w-4/5 bg-white rounded-md shadow-md p-3 md:p-4">
            {/* Chuyển đổi nội dung theo các menu chọn */}
            {filter === 1 && <AccountInfo account={account} />}
          </div>
        </div>
      </div>

      {/* Hộp thoại xác nhận đăng xuất */}
      {showConfirm && (
        <ConfirmDialog
          message="Bạn có chắc chắn muốn đăng xuất?"
          onConfirm={handleLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default AccountPage;
