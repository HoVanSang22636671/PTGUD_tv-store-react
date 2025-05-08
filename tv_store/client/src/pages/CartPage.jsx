import React, { useState } from "react";
import Header from "../components/Header";
import LocationIcon from "../assets/camket/dinhvi.png";
import CartImgEmpty from "../assets/camket/cartPage.png";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import ProductCart from "../components/cart/ProductCart";
import ShippingInfo from "../components/cart/ShippingInfo";
import { useNavigate } from "react-router-dom";
import formatCurrency from "../calculator/FormatCurrency";
import Message from "../message/Message";
import Footer from "../components/Footer";
import { useProduct } from "../API/UseProvider"; // Import useProvider từ API
// 
import { useSelectedProducts } from "../API/SelectedProductsContext"; // Import useSelectedProducts từ API
import { useEffect } from "react";

function CartPage() {
  const navigate = useNavigate();
  const [mess, setMess] = useState(false);
  const { selectedProducts1, setSelectedProducts1 } = useSelectedProducts();
  const [selectedProducts, setSelectedProducts] = useState(selectedProducts1);
  const [checkAll, setCheckAll] = useState(false);
  const { account, product } = useProduct();
   // Lấy thông tin tài khoản từ context
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
      setSelectedProducts([]);            // Local state
    } else {
      const selected = cart.map((item) => item.idProduct);
      setSelectedProducts(selected);      // Local state
    }
    setCheckAll((prev) => !prev);         // Toggle checkAll state
  };
  
  const handleSelectProduct = (productId, isChecked) => {
    if (isChecked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };
  useEffect(() => {
    setSelectedProducts1(selectedProducts); // Context cập nhật đồng bộ
  }, [selectedProducts]);

  const calculateTotalOriginalPrice = () => {
    return cart
      .filter((item) => selectedProducts.includes(String(item.idProduct))) // Sử dụng idProduct ở đây
      .reduce((total, cartItem) => {
        const product1 = product.find(
          (p) => String(p.id) === String(cartItem.idProduct) // Sử dụng idProduct ở đây
        );

        if (!product1) {
          console.warn("Không tìm thấy sản phẩm:", cartItem.idProduct);
          return total;
        }

        const price = Number(product1.price) || 0;
        const sale = Number(product1.sale) || 0;
        const discountPrice = price - (price * sale) / 100;

        return total + discountPrice * cartItem.quantity;
      }, 0);
  };
  const calculateTotalOriginalPricev2 = () => {
    return cart
      .filter((item) => selectedProducts.includes(String(item.idProduct))) // Sử dụng idProduct ở đây
      .reduce((total, cartItem) => {
        const product1 = product.find(
          (p) => String(p.id) === String(cartItem.idProduct) // Sử dụng idProduct ở đây
        );

        if (!product1) {
          console.warn("Không tìm thấy sản phẩm:", cartItem.idProduct);
          return total;
        }

        const price = Number(product1.price) || 0;
        // const sale = Number(product1.sale) || 0;
        // const discountPrice = price - (price * sale) / 100;

        return total + price * cartItem.quantity;
      }, 0);
  };
  const calculateTotalOriginalPricev1 = () => {
    return cart
      .filter((item) => selectedProducts.includes(String(item.idProduct))) // Sử dụng idProduct ở đây
      .reduce((total, cartItem) => {
        const product1 = product.find(
          (p) => String(p.id) === String(cartItem.idProduct) // Sử dụng idProduct ở đây
        );

        if (!product1) {
          console.warn("Không tìm thấy sản phẩm:", cartItem.idProduct);
          return total;
        }

        const price = Number(product1.price) || 0;
        const sale = Number(product1.sale) || 0;
        const discountPrice = (price * sale) / 100;

        return total + discountPrice * cartItem.quantity;
      }, 0);
  };


  const totalOriginalPrice = calculateTotalOriginalPrice();
  const totalOriginalPricev1 = calculateTotalOriginalPricev1();
  const totalOriginalPricev2 = calculateTotalOriginalPricev2();

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
                <div className="w-full md:w-[70%]">
                  <div>
                    <h1 className="font-bold text-xl mb-2">GIỎ HÀNG</h1>

                    <div className="bg-white p-3 rounded-md text-secondary text-[18px] hidden md:flex">
                      <div className="w-[35%] flex gap-1 items-center">
                        <input
                          type="checkbox"
                          className="w-[20px] cursor-pointer scale-125"
                          onChange={() => handleSelectAll()}
                        />
                        <span>Tất cả</span>
                      </div>
                      <div className="w-[20%] pl-3">Đơn giá</div>
                      <div className="w-[20%]">Số lượng</div>
                      <div className="w-[20%]">Thành tiền</div>
                      <div className="w-[5%] flex justify-end">
                        <MdEdit className="text-[25px] text-gray-500" />
                      </div>
                    </div>

                    {/* Product list */}
                    <div>
                      {cart.map((cartItem) => (
                        <ProductCart
                          key={cartItem.idProduct}
                          product={product.find(p => String(p.id) === String(cartItem.idProduct))}
                          setCart={updateCartInLocalStorage}
                          handleSelectProduct={handleSelectProduct}
                          selectedProducts={selectedProducts}
                          selectAll={checkAll}
                          quantity={cartItem.quantity}
                          account={account ? account : null}
                        />
                      ))}
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
                          {formatCurrency(totalOriginalPricev2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary text-lg">Giảm giá</span>
                        <span className="text-lg">{formatCurrency(totalOriginalPricev1)}</span>
                      </div>
                    </div>
                    <div className="pt-5 flex items-center justify-between">
                      <span className="font-bold text-lg">
                      Tổng thành tiền
                      </span>
                      <span className="text-xl text-red-500 font-bold">
                        {formatCurrency(totalOriginalPrice)}
                      </span>
                    </div>
                    <div
                      className="w-[150px] cursor-pointer text-center text-[18px] my-3 mx-auto bg-red-500 p-3 text-white rounded-md"
                      onClick={() => {
                       
                        if (selectedProducts?.length > 0) {
                          navigate("/paymentcartpay");
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
