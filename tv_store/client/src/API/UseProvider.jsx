import { useState, useEffect, createContext, useContext } from "react";
import { useSelectedProducts } from "../API/SelectedProductsContext"; 
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [voucherList, setVoucherList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [isAccount, setIsAccount] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Trạng thái kiểm tra dữ liệu đã được tải
const { selectedProducts1, setSelectedProducts1 } = useSelectedProducts();
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
  const changePassword = async (userId, newPassword) => {
    const apiUrl =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? `http://localhost:3000/api/change-password/${userId}`
        : `https://ptgud-tv-store-react.onrender.com/api/change-password/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const result = await response.json();

      // Kiểm tra kết quả và cập nhật lại accountList
      if (result && result.modifiedCount > 0) {
        // Cập nhật mật khẩu cho user trong accountList
        setAccountList((prevList) =>
          prevList.map((account) =>
            account.id === userId ? { ...account, password: newPassword } : account
          )
        );
        // Nếu đang đăng nhập, cũng cập nhật mật khẩu trong account
        if (account && account.id === userId) {
          setAccount((prevAccount) => ({ ...prevAccount, password: newPassword }));
        }
      }

      return result;
    } catch (error) {
      console.error("Lỗi khi thay đổi mật khẩu:", error);
      return { success: false, message: "Có lỗi khi thay đổi mật khẩu." };
    }
  };
  const addUser = async (newUser) => {
  const apiUrl =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://localhost:3000/api/adduser"
      : "https://ptgud-tv-store-react.onrender.com/api/adduser";

  try {
    // Gửi yêu cầu POST để thêm người dùng mới
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser), // newUser là đối tượng chứa thông tin người dùng mới
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result && result.success) {
      // Cập nhật danh sách người dùng sau khi thêm thành công
      setAccountList((prevList) => [...prevList, result.user]);
      console.log("Thêm người dùng thành công:", result.user);
    } else {
      console.error("Lỗi khi thêm người dùng:", result.message);
    }

    return result;
  } catch (error) {
    console.error("Lỗi khi thêm người dùng:", error);
    return { success: false, message: "Có lỗi khi thêm người dùng." };
  }
};

  const updateUserInfo = async (userId, updatedInfo) => {
  const apiUrl =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? `http://localhost:3000/api/updateinfo/${userId}`
      : `https://ptgud-tv-store-react.onrender.com/api/updateinfo/${userId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedInfo), // { fullName, address, phone, email }
    });

    const result = await response.json();

    // Nếu thành công, cập nhật lại accountList và account hiện tại
    if (result && result.modifiedCount > 0) {
      setAccountList((prevList) =>
        prevList.map((account) =>
          account.id === userId ? { ...account, ...updatedInfo } : account
        )
      );
      if (account && account.id === userId) {
        setAccount((prevAccount) => ({ ...prevAccount, ...updatedInfo }));
      }
    }

    return result;
  } catch (error) {
    console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    return { success: false, message: "Có lỗi khi cập nhật thông tin." };
  }
};

  const updateProductQuantity = async (userId, idProduct, newQuantity) => {
    const apiUrl =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? `http://localhost:3000/api/updatecart/${userId}`
        : `https://ptgud-tv-store-react.onrender.com/api/updatecart/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idProduct, quantity: newQuantity }),
      });

      const result = await response.json();

      if (result && result.modifiedCount > 0) {
        // ✅ Cập nhật trong accountList
        setAccountList((prevList) =>
          prevList.map((user) => {
            if (user.id === userId) {
              const updatedCart = user.cart.map((item) =>
                item.idProduct === idProduct ? { ...item, quantity: newQuantity } : item
              );
              return { ...user, cart: updatedCart };
            }
            return user;
          })
        );

        // ✅ Nếu là user đang đăng nhập, cập nhật luôn trong account
        if (account && account.id === userId) {
          const updatedCart = account.cart.map((item) =>
            item.idProduct === idProduct ? { ...item, quantity: newQuantity } : item
          );
          setAccount((prev) => ({ ...prev, cart: updatedCart }));
        }
      }

      return result;
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
      return { success: false, message: "Có lỗi khi cập nhật số lượng sản phẩm." };
    }
  };
  //deleteCart
  const deleteProduct = async (userId, idProduct) => {
    const apiUrl =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? `http://localhost:3000/api/deletecart/${userId}`
        : `https://ptgud-tv-store-react.onrender.com/api/deletecart/${userId}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idProduct }),
      });

      const result = await response.json();

      if (result && result.modifiedCount > 0) {
        // ✅ Cập nhật trong accountList
        setAccountList((prevList) =>
          prevList.map((user) => {
            if (user.id === userId) {
              const updatedCart = user.cart.filter((item) => item.idProduct !== idProduct);
              return { ...user, cart: updatedCart };
            }
            return user;
          })
        );

        // ✅ Nếu là user đang đăng nhập, cập nhật luôn trong account
        if (account && account.id === userId) {
          const updatedCart = account.cart.filter((item) => item.idProduct !== idProduct);
          setAccount((prev) => ({ ...prev, cart: updatedCart }));
        }
      }

      return result;
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
      return { success: false, message: "Có lỗi khi xóa sản phẩm khỏi giỏ hàng." };
    }
  };
  //xóa oder
  const deleteOrder = async (userId, orderId) => {
    const apiUrl =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? `http://localhost:3000/api/deleteorder/${userId}`
        : `https://ptgud-tv-store-react.onrender.com/api/orders/${userId}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
  
      const result = await response.json();
  
      if (result && result.modifiedCount > 0) {
        // ✅ Cập nhật danh sách đơn hàng trong accountList
        setAccountList((prevList) =>
          prevList.map((user) => {
            if (user.id === userId) {
              const updatedOrders = user.order.map((order) =>
                order.id === orderId ? { ...order, status: "cancelled" } : order
              );
              return { ...user, order: updatedOrders };
            }
            return user;
          })
        );
  
        // ✅ Cập nhật account và product (nếu là user hiện tại)
        if (account && account.id === userId) {
          const updatedOrders = account.order.map((order) =>
            order.id === orderId ? { ...order, status: "cancelled" } : order
          );
  
          setAccount((prev) => ({ ...prev, order: updatedOrders }));
  
          // ✅ Dùng danh sách sản phẩm cập nhật từ server thay vì xử lý thủ công
          if (result.updatedProductList) {
            setProduct(result.updatedProductList);
          }
        }
      }
  
      return result;
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      return { success: false, message: "Có lỗi khi hủy đơn hàng." };
    }
  };
  
  
  
  
  //them vào giỏ hàng
  const addToCart = async (userId, idProduct, quantity) => {
    console.log("userId:", userId);
  
    const apiUrl =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? `http://localhost:3000/api/addtocart/${userId}`
        : `https://ptgud-tv-store-react.onrender.com/api/addtocart/${userId}`;
  
    try {
      // Gửi yêu cầu đến API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idProduct, quantity }),
      });
  
      console.log("API URL:", apiUrl);
      console.log("Response status:", response.status); // Kiểm tra mã trạng thái HTTP
  
      // Kiểm tra nếu phản hồi thành công (status 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Response body:", result);
  
      if (result && result.modifiedCount > 0) {
        // Cập nhật giỏ hàng trong accountList
        setAccountList((prevList) =>
          prevList.map((user) => {
            if (user.id === userId) {
              const existingItem = user.cart.find((item) => item.idProduct === idProduct);
              let updatedCart;
              if (existingItem) {
                updatedCart = user.cart.map((item) =>
                  item.idProduct === idProduct
                    ? { ...item, quantity: quantity }
                    : item
                );
              } else {
                const maxId = user.cart.length > 0 ? Math.max(...user.cart.map(item => item.id)) : 0;
                const newItem = {
                  id: maxId + 1,
                  idProduct,
                  quantity,
                };
                updatedCart = [...user.cart, newItem];
              }
              return { ...user, cart: updatedCart };
            }
            return user;
          })
        );
  
        // Cập nhật giỏ hàng cho account nếu user đang đăng nhập
        if (account && account.id === userId) {
          const existingItem = account.cart.find((item) => item.idProduct === idProduct);
          let updatedCart;
          if (existingItem) {
            updatedCart = account.cart.map((item) =>
              item.idProduct === idProduct
                ? { ...item, quantity: quantity }
                : item
            );
          } else {
            const maxId = account.cart.length > 0 ? Math.max(...account.cart.map(item => item.id)) : 0;
            const newItem = {
              id: maxId + 1,
              idProduct,
              quantity,
            };
            updatedCart = [...account.cart, newItem];
          }
          setAccount((prev) => ({ ...prev, cart: updatedCart }));
        }
      }
  
      return result;
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      return { success: false, message: "Có lỗi khi thêm sản phẩm vào giỏ hàng." };
    }
  };
  // Thêm đơn hàng page now
  const addOrder = async (userId, date, status, products) => {
    console.log("userId:", userId);
    
    const apiUrl =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? `http://localhost:3000/api/addordernow/${userId}`
        : `https://ptgud-tv-store-react.onrender.com/api/addordernow/${userId}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, status, products }),
      });
  
      console.log("API URL:", apiUrl);
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Response body:", result);
  
      if (result && result.success && result.order) {
        // Cập nhật order trong accountList
        setAccountList((prevList) =>
          prevList.map((user) => {
            if (user.id === userId) {
              const updatedOrders = [...(user.order || []), result.order];
              return { ...user, order: updatedOrders };
            }
            return user;
          })
        );
  
        // Cập nhật order nếu là user hiện tại đang đăng nhập
        if (account && account.id === userId) {
          const updatedOrders = [...(account.order || []), result.order];
          setAccount((prev) => ({ ...prev, order: updatedOrders }));
        }
        if (result.updatedProductList) {
          setProduct(result.updatedProductList); // 👈 chính là dòng bạn cần
        }
      }
  
      return result;
    } catch (error) {
      console.error("Lỗi khi thêm đơn hàng:", error);
      return { success: false, message: "Có lỗi khi thêm đơn hàng." };
    }
  };
  

  // Hàm đăng nhập
  const login = (username, password) => {
    const user = accountList?.find(
      (acc) => acc?.userName === username && acc?.password === password
    );
    if (user) {
      setAccount(user);
      setIsAccount(true);

      // Lưu ID người dùng vào localStorage
      localStorage.setItem("loggedInUserId", user.id);
      setSelectedProducts1([]);
      return true;
    }
    return false;
  };


  // Hàm đăng xuất
  const logout = () => {
    setAccount(null);
    setIsAccount(false);
    setSelectedProducts1([]);
    localStorage.removeItem("loggedInUserId");
    localStorage.removeItem("selectedProducts");
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
        logout,
        changePassword,
        updateProductQuantity,
        deleteProduct,
        addToCart,
        addOrder, 
        deleteOrder,
        updateUserInfo,
        addUser,// expose logout function
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useProduct = () => useContext(UserContext);
