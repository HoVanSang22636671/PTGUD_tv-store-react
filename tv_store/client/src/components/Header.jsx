import { useState, useRef, useEffect } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notifications";
import { useProduct } from "../API/UseProvider";
import formatCurrency from "../calculator/FormatCurrency";
import SearchHistory from "./Search/SearchHistory";
import SearchPopular from "./Search/SearchPopular";
import SearchFlashPopular from "./Search/SearchFlashPopular";

function Header() {
  const [search, setSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { account, product } = useProduct();
  console.log("Account data:", account);

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(storedHistory);
  }, []);

  const handleSearch = () => {
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      let updatedHistory = searchHistory.filter(
        (item) => item !== trimmedSearch
      ); // Xóa nếu từ khóa đã tồn tại
      updatedHistory.unshift(trimmedSearch); // Thêm từ khóa mới vào đầu danh sách
      if (updatedHistory.length > 7) {
        updatedHistory.pop(); // Giữ tối đa 7 từ khóa
      }
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`); // Chuyển hướng đến trang tìm kiếm
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleMobileNavigate = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="bg-white shadow-md py-2 flex justify-center relative z-50">
      <div className="container flex flex-col md:flex-row justify-between items-start md:items-center max-w-[1200px] w-full px-4">
        {/* Logo và menu mobile */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link to="/">
            <img
              src="/img/logo.png"
              alt="Logo"
              className="w-[130px] rounded-full cursor-pointer"
            />
          </Link>
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>

        {/* Thanh tìm kiếm */}
        <div
          className="flex-col mt-3 md:mt-0 flex relative w-full md:w-auto"
          onMouseEnter={() => setIsSuggestionsVisible(true)}
          onMouseLeave={() => setIsSuggestionsVisible(false)}
        >
          <div className="relative flex group mt-2 md:mt-0">
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
              className="text-lg w-full md:w-[300px] lg:w-[550px] h-[50px] border border-gray-300 rounded-s-md pl-12 outline-none"
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
              className="w-[100px] h-[50px] flex items-center justify-center text-center text-blue-600 text-[18px] border border-gray-300 rounded-e-md hover:bg-[rgba(10,104,255,0.2)] cursor-pointer"
              onClick={handleSearch}
            >
              Tìm kiếm
            </span>

            <div className="hidden absolute py-2 z-10 top-full left-0 translate-x-2 w-[590px] min-h-[50px] bg-white border border-gray-300 rounded-md group-hover:block">
              {searchHistory.length > 0 && (
                <SearchHistory
                  setSearchHistory={setSearchHistory}
                  searchHistory={searchHistory}
                  setSearch={setSearch}
                  handleSearch={handleSearch}
                />
              )}
              <SearchPopular
                setSearch={setSearch}
                input={inputRef}
                handleSearch={handleSearch}
              />
            </div>
          </div>
          <SearchFlashPopular
            setSearch={setSearch}
            input={inputRef}
            handleSearch={handleSearch}
          />
        </div>

        {/* Giỏ hàng, thông báo, tài khoản (desktop only) */}
        <div className="hidden md:flex space-x-6 items-center mt-4 md:mt-0">
          <div className="relative group">
            <Link to="/cart" className="group cursor-pointer">
              <div className="p-3 group-hover:bg-primary/15 rounded-full">
                <img
                  src="/img/cart.png"
                  alt="Cart"
                  className="w-[40px] h-[40px]"
                />
              </div>
              {account?.cart?.length > 0 && (
                <span className="absolute top-4 right-3 translate-x-1/2 -translate-y-1/2 px-2 py-1 text-center text-white text-sm rounded-full bg-red-500">
                  {account.cart.length}
                </span>
              )}
            </Link>
            <div className="absolute right-0 w-[350px] bg-white shadow-lg rounded-md mt-2 invisible group-hover:visible transition-all duration-300">
              {account?.cart?.length > 0 ? (
                <div className="p-3 max-h-[300px] overflow-y-auto">
                  <h3 className="font-bold text-lg mb-2">Sản phẩm trong giỏ hàng</h3>
                  {account.cart.map((cartItem, index) => {
                    // Tìm sản phẩm tương ứng với idProduct từ danh sách products
                    const product1 = product.find((p) => p.id === cartItem.idProduct);

                    return (
                      product1 && (
                        <Link to={`/productDetail/${product1.id}`} key={index} className="flex items-center gap-3 mb-3">
                          <img
                            src={product1.img[0].img}
                            alt={product1.name}
                            className="w-[50px] h-[50px] object-cover rounded"
                          />
                          <div className="flex flex-col flex-grow">
                            <span className="text-sm font-medium">{product1.name}</span>
                            <span className="text-xs text-gray-500">
                              {formatCurrency(product1.price)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* Hiển thị số lượng sản phẩm */}
                            <span className="text-xs text-gray-600">x{cartItem.quantity}</span>
                          </div>
                        </Link>
                      )
                    );
                  })}
                </div>
              ) : (
                <div className="p-3 text-center text-sm text-gray-500">
                  Giỏ hàng trống
                </div>
              )}
            </div>

          </div>
          <Notification />
          <span className="border border-gray-400 h-[30px] hidden md:block"></span>

          {account?.userName ? (
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
                {account.userName}
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

      {/* Dropdown mobile */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 right-4 bg-white shadow-md rounded-md w-48 p-4 z-50 md:hidden">
          <div
            onClick={() => handleMobileNavigate("/cart")}
            className="flex items-center space-x-2 mb-3 cursor-pointer hover:text-primary"
          >
            <img src="/img/cart.png" alt="Cart" className="w-8 h-8" />
            <span>Giỏ hàng</span>
          </div>
          <div
            onClick={() => handleMobileNavigate(account ? "/account" : "/login")}
            className="flex items-center space-x-2 cursor-pointer hover:text-primary"
          >
            <VscAccount size={25} className="text-secondary" />
            <span>{account ? "Tài khoản" : "Đăng nhập"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
