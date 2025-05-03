import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import ConfirmDialogOk from "../../message/ConfirmDialogOk";
import { useProduct } from "../../API/UseProvider"; // Sử dụng UserContext

const ChangePassword = () => {
  const navigate = useNavigate();
  const { account, changePassword, setAccount } = useProduct();  // Lấy thông tin tài khoản và changePassword từ context
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const validateInput = () => {
    let errors = {};

    if (!oldPassword) {
      errors.oldPassword = "Vui lòng nhập mật khẩu cũ.";
    } else if (account && account.password !== oldPassword) {
      errors.oldPassword = "Mật khẩu cũ không đúng.";
    }

    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        newPassword
      )
    ) {
      errors.newPassword =
        "Mật khẩu mới phải có ít nhất 6 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.";
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu nhập lại không khớp.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    // Gọi phương thức changePassword từ context để cập nhật mật khẩu
    const result = await changePassword(account.id, newPassword);

    if (result.success) {
      // Hiển thị thông báo thành công
      setMessage("Đổi mật khẩu thành công!");
      setShowConfirm(true);

      // Cập nhật lại thông tin tài khoản trong context
      setAccount((prevAccount) => ({ ...prevAccount, password: newPassword }));

      // Cập nhật lại localStorage với mật khẩu mới
      localStorage.setItem("loggedInUserId", account.id);
    } else {
      setMessage(result.message || "Có lỗi khi thay đổi mật khẩu.");
      setShowConfirm(true);
    }

    // Reset các trường nhập liệu
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {showConfirm && (
        <ConfirmDialogOk
          message={message}
          onConfirm={() => {
            setShowConfirm(false);
            navigate("/login"); // Điều hướng đến trang đăng nhập nếu đổi mật khẩu thành công
          }}
        />
      )}

      <div
        className="absolute top-4 left-6 flex items-center gap-2 text-white text-lg font-semibold cursor-pointer hover:scale-105"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack className="text-2xl" />
        <span>Trở về</span>
      </div>

      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-primary">
          Đổi mật khẩu
        </h2>
        <form onSubmit={handleChangePassword}>
          <InputField
            label="Mật khẩu cũ:"
            value={oldPassword}
            setValue={setOldPassword}
            type="password"
            error={errors.oldPassword}
          />
          <InputField
            label="Mật khẩu mới:"
            value={newPassword}
            setValue={setNewPassword}
            type="password"
            error={errors.newPassword}
          />
          <InputField
            label="Nhập lại mật khẩu mới:"
            value={confirmPassword}
            setValue={setConfirmPassword}
            type="password"
            error={errors.confirmPassword}
          />
          <button
            type="submit"
            className="w-full my-4 px-4 py-4 font-bold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, value, setValue, type = "text", error }) => (
  <div>
    <label className="block mb-2 my-2 text-xl font-bold text-gray-700">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
    />
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

export default ChangePassword;
