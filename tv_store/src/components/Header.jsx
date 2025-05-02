import { useState, useRef } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom"; // Import Link và useNavigate
import Notification from "./Notifications";

function Header() {
  const [search, setSearch] = useState("");
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false); // Quản lý trạng thái hiển thị gợi ý
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Lấy thông tin tài khoản từ localStorage (giả lập đăng nhập)
  const account = JSON.parse(localStorage.getItem("isAccount")) || null;

  const handleSearch = () => {
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      // Chuyển hướng đến trang tìm kiếm
      navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white shadow-md py-2 flex justify-center">
      <div className="container flex justify-between items-center max-w-[1200px] w-full">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              src="/img/logo.png"
              alt="Logo"
              className="block w-[130px] rounded-full cursor-pointer pl-5"
            />
          </Link>
        </div>

        {/* Thanh tìm kiếm */}
        <div
          className="flex-col mt-3 flex relative"
          onMouseEnter={() => setIsSuggestionsVisible(true)} // Hiển thị gợi ý khi đưa chuột vào
          onMouseLeave={() => setIsSuggestionsVisible(false)} // Ẩn gợi ý khi rời chuột khỏi thanh tìm kiếm
        >
          <div className="relative flex group ml-2">
            <IoIosSearch
              size={25}
              className="absolute top-1/4 left-3 text-secondary"
            />
            <input
              spellCheck={false}
              ref={inputRef}
              value={search}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                if (!e.target.value.startsWith(" ")) {
                  setSearch(e.target.value);
                }
              }}
              type="text"
              placeholder="Tìm kiếm sản phẩm ... "
              className="text-lg w-[300px] lg:w-[550px] h-[50px] border border-gray-300 rounded-s-md pl-12 outline-none"
            />
            {search && (
              <IoMdClose
                className="absolute top-1/2 right-[110px] -translate-y-1/2 font-bold text-2xl cursor-pointer block"
                onClick={() => {
                  setSearch("");
                  inputRef.current.focus();
                }}
              />
            )}
            <span
              className="w-[100px] h-[50px] flex items-center justify-center text-center text-primary text-[18px] border border-gray-300 rounded-e-md hover:bg-[rgba(10,104,255,0.2)] cursor-pointer"
              onClick={handleSearch}
            >
              Tìm kiếm
            </span>
          </div>
          {/* Hiển thị gợi ý tìm kiếm */}
          {isSuggestionsVisible && (
            <div className="absolute z-10 top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md">
              <ul>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Tivi Sony 4K UHD 50 inch
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Tivi LG QLED 4K 55 inch
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  Tivi Samsung Full HD 65
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Giỏ hàng, thông báo và tài khoản */}
        <div className="flex space-x-6 items-center">
          <div className="relative group cursor-pointer">
            <div className="block p-3 group-hover:bg-primary/15 rounded-full">
              <img src="/img/cart.png" alt="Cart" className="w-[40px] h-[40px]" />
            </div>
          </div>

          {/* Thông báo */}
          <Notification />
          <span className="border border-gray-400 h-[30px] hidden md:block"></span>

          {/* Tài khoản */}
          {account ? (
            <Link
              to="/account"
              className="items-center gap-1 cursor-pointer group hidden md:flex"
            >
              {account.avatar ? (
                <img
                  src={account.avatar}
                  alt="Avatar"
                  className="w-[32px] h-[32px] rounded-full"
                />
              ) : (
                <VscAccount className="text-[32px] text-secondary group-hover:text-primary" />
              )}
              <h4 className="text-secondary text-lg group-hover:text-primary">
                {account.username}
              </h4>
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-1 cursor-pointer group"
            >
              <VscAccount className="text-[32px] text-secondary group-hover:text-primary" />
              <h4 className="text-secondary text-lg group-hover:text-primary">
                Đăng nhập
              </h4>
            </Link>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      {/* Dropdown mobile */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-md rounded-md w-48 p-4 z-50">
          <div className="flex items-center space-x-2 mb-2">
            <img src="/img/cart.png" alt="Cart" className="w-8 h-8" />
            <span>Giỏ hàng</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <VscAccount size={25} className="text-secondary" />
            <span>Đăng nhập</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;