import React, { useState } from "react";
import Header from "../components/Header";
import LocationIcon from "../assets/camket/dinhvi.png";
import CartImgEmpty from "../assets/camket/cartPage.png";
import { MdOutlineDelete } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import ProductCart from "../components/cart/ProductCart";
import ShippingInfo from "../components/cart/ShippingInfo";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../calculator/FormatCurrency";
import Message from "../message/Message";
import Footer from "../components/Footer";
import { useProduct } from "../API/UseProvider"; // Import useProvider từ API
// 
import { useEffect } from "react";

function CartPage() {
  const navigate = useNavigate();
  const [mess, setMess] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const { account, product } = useProduct(); // Lấy thông tin tài khoản từ context
  const [addressMD, setDefaultAddress] = useState({
    name: "Nguyen Van A",
    phone: "9999999999",
    address: "Phường 4, Nguyễn Văn Bảo, Quận Gò Vấp, TP HCM",
  });
  // console.log(product)
  // Tìm địa chỉ mặc định
  // const addressMD = account.addressShip?.find((add) => add.isMacDinh);
  useEffect(() => {
    if (account) {
      setDefaultAddress({
        name: account.name || "Nguyen Van A",
        phone: account.phone || "9999999999",
        address:
          account.address ||
          "Phường 4, Nguyễn Văn Bảo, Quận Gò Vấp, TP HCM",
      });
    }
  }, [account]);
  // Sử dụng state để quản lý giỏ hàng
  const [cart, setCart] = useState([]); // Khởi tạo cart mặc định là mảng rỗng

  useEffect(() => {
    if (account?.cart?.length >= 0) {
      // Cập nhật cart khi account đã có thông tin cart
      setCart(account.cart || []);
    }
  }, [account]);

  // console.log(cart);

  const handleSelectAll = () => {
    if (checkAll) {
      // Nếu đã chọn tất cả, bỏ chọn tất cả
      setSelectedProducts([]);
    } else {
      // Nếu chưa chọn tất cả, thêm tất cả sản phẩm vào danh sách selectedProducts
      setSelectedProducts(cart.map((item) => item.id));
    }
    setCheckAll(!checkAll);
  };

  const handleSelectProduct = (productId, isChecked) => {
    if (isChecked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handlePayProduct = () => {
    return cart.filter((item) => selectedProducts.includes(item.id));
  };

  const calculateTotalOriginalPrice = () => {
    return cart
      .filter((item) => selectedProducts.includes(item.id))
      .reduce((total, item) => {
        if (item.sale) {
          return (
            total +
            (item.price - item.price * (item.sale / 100)) * item.quantity
          );
        } else {
          return total + item.price * item.quantity;
        }
      }, 0);
  };

  const totalOriginalPrice = calculateTotalOriginalPrice();

  // Hàm cập nhật lại localStorage khi giỏ hàng thay đổi
  const updateCartInLocalStorage = (newCart) => {
    const updatedAccount = { ...account, cart: newCart };
    localStorage.setItem("isAccount", JSON.stringify(updatedAccount));
    setCart(newCart);
  };

  return (
    <div>
      <Message
        orderPopup={mess}
        setOrderPopup={setMess}
        title={"Vui lòng chọn sản phẩm !"}
      />
      ;
      <div className="bg-[#f5f5fa] transform transition-all duration-500">
        <div>

          <div className="bg-[#f5f5fa] min-h-[600px]">
            <div className="bg-white p-4 my-1">
              <div className="flex  items-center justify-end">
                <img src={LocationIcon} alt="" className="w-[30px]" />
                <span className="text-secondary text-[20px]">Giao đến: </span>
                <span className="text-[20px] underline">
                  {" " +
                    (addressMD ? addressMD.address : "Phường 4, Quận Gò Vấp")}
                </span>
              </div>
            </div>
            <div className="flex border border-[#c2e1ff] mx-auto mt-3 rounded-lg max-w-[660px] justify-center items-center gap-2 p-4 bg-[#f0f8ff]">
              <GoAlert className="text-primary text-[20px]" />
              <span className="text-lg">
                Quý khách lưu ý xem kỹ thông tin trước khi mua sản phẩm!
              </span>
            </div>
            {/* Body */}
            {cart?.length > 0 ? (
              <div className="flex flex-col md:flex-row p-5">
                {/* Chi tiết đơn hàng */}
                <div className="w-full md:w-[70%] ">
                  <div>
                    <h1 className="font-bold text-xl">GIỎ HÀNG</h1>
                    <div>
                      <div className="bg-white p-3 rounded-md text-secondary text-[18px]">
                        <div className="flex">
                          <div className="w-[35%] flex gap-1">
                            <input
                              type="checkbox"
                              className="w-[20px] cursor-pointer"
                              onChange={() => handleSelectAll()}
                            />
                            <span>Tất cả</span>
                          </div>
                          <div className="w-[20%] pl-3">Đơn giá</div>
                          <div className="w-[20%]">Số lượng</div>
                          <div className="w-[20%]">Thành tiền</div>
                          <div className="w-[5%]">
                            <MdOutlineDelete className="text-[25px]" />
                          </div>
                        </div>
                      </div>
                      {/* Product */}
                      <div>
                        {cart.map((cartItem) => (
                          <ProductCart
                            key={cartItem.id}
                            product={product.find(p => String(p.id) === String(cartItem.idProduct))} // Tìm sản phẩm từ danh sách theo id
                            setCart={updateCartInLocalStorage}
                            handleSelectProduct={handleSelectProduct}
                            selectedProducts={selectedProducts}
                            selectAll={checkAll}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Chi tiết thanh toán */}
                <div className="w-full md:flex-1">
                  <ShippingInfo account={account} />
                  <div className="bg-white rounded-md mx-auto my-3 w-[90%] px-4 py-8">
                    <div className="border-b pb-2">
                      <div className="flex justify-between">
                        <span className="text-secondary text-lg">Giá gốc</span>
                        <span className="text-lg">
                          {formatCurrency(totalOriginalPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary text-lg">Giảm giá</span>
                        <span className="text-lg">0 đ</span>
                      </div>
                    </div>
                    <div className="pt-5 flex items-center justify-between">
                      <span className="font-bold text-lg">
                        Tổng tiền thanh toán
                      </span>
                      <span className="text-xl text-red-500 font-bold">
                        {formatCurrency(totalOriginalPrice)}
                      </span>
                    </div>
                    <div
                      className="w-[150px] cursor-pointer text-center text-[18px] my-3 mx-auto bg-red-500 p-3 text-white rounded-md"
                      onClick={() => {
                        localStorage.setItem(
                          "payCartMent",
                          JSON.stringify(handlePayProduct())
                        );
                        if (handlePayProduct().length > 0) {
                          navigate("/paymentCartSuccess");
                        } else {
                          setMess(true);
                        }
                      }}
                    >
                      Mua Hàng
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-3 mt-3 rounded-md text-[18px] min-h-[400px]">
                <img src={CartImgEmpty} alt="" className="mx-auto" />
                <div className="text-center">
                  <h1 className="font-bold">Giỏ hàng trống</h1>
                  <span className="text-secondary">
                    Bạn tham khảo thêm các sản phẩm được Tiki gợi ý bên dưới
                    nhé!
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default CartPage;
