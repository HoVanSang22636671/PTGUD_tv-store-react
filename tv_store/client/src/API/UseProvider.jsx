import { useState, useEffect, createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [voucherList, setVoucherList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [isAccount, setIsAccount] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Trạng thái kiểm tra dữ liệu đã được tải

  // Fetch dữ liệu từ mock API hoặc server
  useEffect(() => {
    const apiUrl =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000/api/db.json"
        : "https://ptgud-tv-store-react.onrender.com/api/db.json";

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          if (Array.isArray(data[0].product)) {
            setProduct(data[0].product);
          }
          if (Array.isArray(data[0].user)) {
            setAccountList(data[0].user);
          }
        }

        // Khởi tạo danh sách voucher mặc định nếu chưa có
        setVoucherList([
          {
            id: "FEBL30",
            name: "Giảm 300k",
            condition: "Cho đơn hàng từ 10 triệu",
            valueCondition: 10000000,
            value: 300000,
            endDate: "12/07/2025",
            select: false,
          },
          {
            id: "FEBL40",
            name: "Giảm 5%",
            condition: "Cho đơn hàng từ 700k",
            valueCondition: 700000,
            percent: 5,
            endDate: "20/04/2025",
            select: false,
          },
          {
            id: "FEBL50",
            name: "Giảm 150k",
            condition: "Cho đơn hàng từ 4 triệu",
            valueCondition: 4000000,
            value: 150000,
            endDate: "30/3/2025",
            select: false,
          },
          {
            id: "FEBL20",
            name: "Giảm 1950k",
            condition: "Cho đơn hàng từ 20 triệu",
            valueCondition: 20000000,
            value: 1950000,
            endDate: "29/03/2025",
            select: false,
          },
        ]);

        setIsDataLoaded(true); // Dữ liệu đã được tải
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi load dữ liệu:", err);
        setLoading(false);
      });
  }, []);

  // Kiểm tra nếu có ID người dùng trong localStorage chỉ khi dữ liệu đã được tải
  useEffect(() => {
    if (isDataLoaded) {
      const loggedInUserId = localStorage.getItem("loggedInUserId");
      console.log("loggedInUserId:", loggedInUserId); // Log ID người dùng
      console.log("accountList:", accountList); // Log danh sách tài khoản

      if (loggedInUserId && accountList.length > 0) {
        const user = accountList.find(acc => String(acc.id) === String(loggedInUserId));
        if (user) {
          setAccount(user);
          setIsAccount(true);
        } else {
          console.error("Không tìm thấy người dùng trong danh sách tài khoản.");
        }
      }
    }
  }, [isDataLoaded, accountList]); // Đảm bảo dữ liệu đã tải xong

  // Hàm đăng nhập
  const login = (username, password) => {
    const user = accountList.find(
      (acc) => acc.phone === username && acc.password === password
    );
    if (user) {
      setAccount(user);
      setIsAccount(true);

      // Lưu ID người dùng vào localStorage
      localStorage.setItem("loggedInUserId", user.id);

      return true;
    }
    return false;
  };

  // Hàm đăng xuất
  const logout = () => {
    setAccount(null);
    setIsAccount(false);
    localStorage.removeItem("loggedInUserId");
  };

  return (
    <UserContext.Provider
      value={{
        product,
        loading,
        voucherList,
        setVoucherList,
        account,
        setAccount,
        isAccount,
        setIsAccount,
        accountList,
        login, // expose login function
        logout, // expose logout function
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useProduct = () => useContext(UserContext);
