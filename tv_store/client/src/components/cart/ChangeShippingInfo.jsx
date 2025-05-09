import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ConfirmDialogOk from "../../message/ConfirmDialogOk";
import { useProduct } from "../../API/UseProvider";

function ChangeShippingInfo() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [isChanged, setIsChanged] = useState(false); // Trạng thái thay đổi

  const navigate = useNavigate();
  const { account, updateUserInfo } = useProduct(); // Gọi context

  // Đổ dữ liệu user vào form khi component mount
  useEffect(() => {
    if (account) {
      setForm({
        name: account.fullName || "",
        phone: account.phone || "",
        address: account.address || "",
      });
    }
  }, [account]);

  // Kiểm tra xem thông tin có thay đổi không
  useEffect(() => {
    if (account) {
      const hasChanged =
        form.name !== account.fullName ||
        form.phone !== account.phone ||
        form.address !== account.address;
      setIsChanged(hasChanged);
    }
  }, [form, account]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem thông tin có thay đổi không
    if (!isChanged) {
      setMessage("Không có sự thay đổi nào để lưu.");
      setShowConfirm(true);
      return;
    }

    if (!form.name || !form.phone || !form.address) {
      setMessage("Vui lòng điền đầy đủ thông tin.");
      setShowConfirm(true);
      return;
    }

    if (account && account.id) {
      const result = await updateUserInfo(account.id, {
        fullName: form.name,
        phone: form.phone,
        address: form.address,
        email: account?.email,
      });

      if (result?.success || result?.modifiedCount > 0) {
        setMessage("Cập nhật địa chỉ thành công.");
      } else {
        setMessage(result?.message || "Cập nhật thất bại.");
      }
    } else {
      setMessage("Không tìm thấy thông tin người dùng.");
    }

    setShowConfirm(true);
  };

  return (
    <div className="bg-[#f5f5fa] min-h-screen">
      {showConfirm && (
        <ConfirmDialogOk
          message={message}
          onConfirm={() => setShowConfirm(false)}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Header */}
      <div className="flex items-center p-8 bg-white gap-6 shadow-md">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack className="text-2xl text-[#1aa7ff]" />
          <span className="text-[#1aa7ff] text-[25px]">Trở về</span>
        </div>
        <div className="border border-[#1aa7ff] h-[40px]"></div>
        <h1 className="text-[35px] text-[#1aa7ff] font-medium">
          Cập nhật địa chỉ giao hàng
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-2xl mt-10"
      >
        <label className="block mb-2 text-xl font-bold">Họ và tên</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md mb-4"
          placeholder="Nhập tên"
          required
        />

        <label className="block mb-2 text-xl font-bold">Số điện thoại</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md mb-4"
          placeholder="Nhập số điện thoại"
          required
        />

        <label className="block mb-2 text-xl font-bold">Địa chỉ</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-md mb-6"
          placeholder="Nhập địa chỉ"
          required
        ></textarea>

        {/* Nút lưu thông tin */}
        <button
          type="submit"
          className={`w-full py-3 text-white rounded-md text-lg ${
            !isChanged ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"
          }`}
          disabled={!isChanged} // Disable button nếu không có thay đổi
        >
          Lưu thông tin
        </button>
      </form>
    </div>
  );
}

export default ChangeShippingInfo;
