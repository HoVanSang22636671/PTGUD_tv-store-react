import { useState } from "react";
import ShippingInfo from "../cart/ShippingInfo";
import { MdEdit } from "react-icons/md";
import AvatarImg from "../../assets/camket/avatar.png";
import { useProduct } from "../../API/UseProvider";

function AccountInfo({ account }) {
  const [phone, setPhone] = useState(account.phone || "");
  const [email, setEmail] = useState(account.email || "");
  const [isEditable, setIsEditable] = useState(false);
  const [avatar, setAvatar] = useState(account.avatar || AvatarImg);
  const { updateUserInfo } = useProduct();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        const updatedAccount = { ...account, avatar: reader.result };

        // Cập nhật vào localStorage nếu cần
        localStorage.setItem("isAccount", JSON.stringify(updatedAccount));
        const listAccount = JSON.parse(localStorage.getItem("account")) || [];
        const updatedListAccount = listAccount.map((acc) =>
          acc.userName === account.userName
            ? { ...acc, avatar: reader.result }
            : acc
        );
        localStorage.setItem("account", JSON.stringify(updatedListAccount));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Chỉ cập nhật 4 thuộc tính: fullName, phone, address, email
    const updatedAccount = {
      fullName: account?.fullName,
      phone: phone,
      address: account?.address,
      email: email,
    };

    // Cập nhật context
    updateUserInfo(account?.id,updatedAccount);

    setIsEditable(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-[25px] text-center mb-4">Thông tin tài khoản</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Cột trái */}
        <div className="w-full lg:w-[60%] p-4 rounded-md bg-white">
          <h1 className="text-secondary text-[20px] py-4">Thông tin cá nhân</h1>
          <input
            type="file"
            id="avatarInput"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="flex flex-col md:flex-row items-center">
            <label htmlFor="avatarInput">
              <div className="relative cursor-pointer flex items-center justify-center text-[#1a94ff] w-[140px] h-[140px] md:w-[190px] md:h-[190px] border-[6px] border-[#c2e1ff] rounded-full bg-[#f0f8ff]">
                <MdEdit className="absolute text-[20px] text-white bg-secondary rounded-full right-[10px] bottom-0" />
                <img
                  src={avatar}
                  alt="Avatar"
                  className="rounded-full w-[100px] h-[100px] md:w-[140px] md:h-[140px] object-cover"
                />
              </div>
            </label>
            <div className="flex-1 mt-4 md:mt-0 md:ml-5 w-full">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[18px] md:text-[20px]">Username</span>
                <input
                  type="text"
                  value={account.userName}  // Không cho phép thay đổi username
                  readOnly
                  className="p-2 text-[16px] md:text-[20px] w-[60%] border border-gray-400 rounded-md"
                />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[18px] md:text-[20px]">Phone</span>
                <input
                  type="text"
                  value={phone}
                  readOnly={!isEditable}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`p-2 text-[16px] md:text-[20px] w-[60%] border ${isEditable ? "border-gray-600" : "border-gray-400"} rounded-md`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[18px] md:text-[20px]">Email</span>
                <input
                  type="email"
                  value={email}
                  readOnly={!isEditable}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`p-2 text-[16px] md:text-[20px] w-[60%] border ${isEditable ? "border-gray-600" : "border-gray-400"} rounded-md`}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left">
            {!isEditable ? (
              <button
                onClick={() => setIsEditable(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-md text-[18px] hover:bg-blue-700"
              >
                Chỉnh sửa thông tin
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-600 text-white rounded-md text-[18px] hover:bg-green-700"
              >
                Lưu thông tin
              </button>
            )}
          </div>
        </div>

        {/* Cột phải */}
        <div className="w-full lg:w-[40%] rounded-md bg-white flex flex-col items-center justify-center p-4">
          <h1 className="text-[20px] font-bold border-b border-gray-300 pb-2 w-full text-center">
            Địa chỉ giao hàng
          </h1>
          <div className="w-full px-2 md:px-4">
            <ShippingInfo account={account} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo;
