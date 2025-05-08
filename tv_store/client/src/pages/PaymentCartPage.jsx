import { useNavigate } from "react-router-dom";
// import HomeImg from "../assets/camket/home.png";
// import Home2Img from "../assets/camket/home2.png";
import { GoAlert, GoInfo } from "react-icons/go";
import ShippingInfo from "../components/cart/ShippingInfo.jsx";
import GiaoHangIcon from "../assets/camket/giaohang.png";
import formatCurrency from "../calculator/FormatCurrency";
import TienMatImg from "../assets/camket/TienMat.png";
import ZaloImg from "../assets/camket/Zalo.png";
import MoMoImg from "../assets/camket/MoMo.jpg";
import { useEffect, useState } from "react";
// import Message from "../message/Message.jsx";
import { v4 as uuidv4 } from "uuid";
import { IoArrowBack } from "react-icons/io5";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import { useProduct } from "../API/UseProvider.jsx";
import { useSelectedProducts } from "../API/SelectedProductsContext";
import ConfirmDialog from "../message/ConfirmDialog";
const hinhThucThanhToanList = [
  {
    id: 1,
    name: "Thanh toán bằng tiền mặt",
    img: TienMatImg,
  },
  {
    id: 2,
    name: "Ví Zalo",
    img: ZaloImg,
  },
  {
    id: 3,
    name: "Ví MoMo",
    img: MoMoImg,
  },
];

function PaymentCartPage() {
  const navigate = useNavigate();
  const [voucherPopup, setVoucherPopup] = useState(false);
  const [myVoucher, setMyVoucher] = useState([]);
  const { account, product, addOrder, deleteProduct } = useProduct();
  const { selectedProducts1, setSelectedProducts1 } = useSelectedProducts();
  // const account = JSON.parse(localStorage.getItem("isAccount")) || {};
  // const product = JSON.parse(localStorage.getItem("payCartMent")) || {};
  const [voucherList, setVoucherList] = useState([]);
  const [payPro, setPayPro] = useState(1);
  const [mess, setMess] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const products = account?.cart?.map((item) => {
  //   const matchedProduct = product?.find((p) => p.id === item.id);
  //   return {
  //     ...matchedProduct,
  //     quantity: item.quantity, // nếu cần số lượng
  //   };
  // });
  // console.log(products);
  const selectedItems = account?.cart
    .filter(item => selectedProducts1?.includes(item.idProduct))
    .map(item => {
      const matchedProduct = product?.find(p => p.id === item.idProduct);
      return {
        ...matchedProduct,
        quantity: item.quantity
      };
    });
  const handlePayment = async () => {
    const userId = account?.id;
    const status = "processing";
    const date = new Date().toISOString(); 

    // Bật trạng thái loading
    setIsLoading(true);

    // Duyệt qua từng item và chỉ lấy idProduct và quantity
    const products = selectedItems?.map(item => ({
      idProduct: item.id, // Giả sử item có thuộc tính 'id' là idProduct
      quantity: item.quantity, // Lấy số lượng sản phẩm
    }));

    if (!products || products.length === 0) {
      alert("Giỏ hàng trống!");
      setIsLoading(false);
      return;
    }

    try {
      // Gửi yêu cầu thanh toán với mảng sản phẩm đã được lọc
      const result = await addOrder(userId, date, status, products);

      if (result && result.success) {
        // Xóa tất cả sản phẩm khỏi giỏ hàng
        for (const item of selectedItems) {
          await deleteProduct(userId, item.id); // Xóa từng sản phẩm khỏi giỏ hàng
        }

        navigate("/paymentSuccess");
      } else {
        alert("Thanh toán thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Đã xảy ra lỗi khi thanh toán.");
    } finally {
      // Tắt trạng thái loading
      setIsLoading(false);
      setShowConfirm(false);
    }
  };





  function getDateAfterFourDays() {
    const today = new Date();
    today.setDate(today.getDate() + 4);
    return today.toLocaleDateString("vi-VN");
  }

  function getDateNow() {
    const today = new Date();
    today.setDate(today.getDate());
    return today.toLocaleDateString("vi-VN");
  }


  return (
    <div>
      {/* <Message
        orderPopup={mess}
        setOrderPopup={setMess}
        title={"Bạn chỉ có thể chọn tối đa 2 voucher!"}
      /> */}
      {/* <VoucherPopup
        voucherPopup={voucherPopup}
        setVoucherPopup={setVoucherPopup}
        myVoucher={myVoucher}
        setMyVoucher={setMyVoucher}
        voucherList={voucherList}
        setVoucherList={setVoucherList}
        setMess={setMess}
        totalPrice={totalPrice}
      /> */}
      {/* Header */}
      <div className="flex items-center p-8 bg-white gap-6 shadow-md">
        {/* Nút quay lại */}
        <div
          className="flex items-center gap-2 text-primary text-[25px] font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack className="text-2xl" />
          <span>Trở về</span>
        </div>
        <div className="border border-[#1aa7ff] h-[40px]"></div>
        <h1 className="text-[35px] text-[#1aa7ff] font-medium">Thanh Toán</h1>
      </div>
      {/* Body */}
      <div className=" bg-[#f5f5fa] min-h-[600px]">
        <div className="flex border border-[#c2e1ff] mx-auto mt-3 rounded-lg max-w-[660px] justify-center items-center gap-2 p-4 bg-[#f0f8ff]">
          <GoAlert className="text-primary text-[20px]" />
          <span className="text-lg">
            Quý khách lưu ý xem kỹ thông tin trước khi mua sản phẩm!
          </span>
        </div>
        {/* Body */}
        <div className="flex flex-col md:flex-row">
          {/* Chi tiết đơn hàng */}
          <div className="w-full md:w-[70%] mx-4">
            <div>
              <h1 className="font-bold text-[30px]">Đơn hàng</h1>
              <div>
                <div>
                  {/* Product */}
                  <div>
                    {selectedItems?.map((product) => (
                      <div
                        key={product?.id}
                        className="bg-white p-3 rounded-md text-[20px] mt-3"
                      >
                        <div className="flex items-center">
                          <div className="flex w-[35%] items-center">
                            <div
                              className="flex cursor-pointer"
                              onClick={() => navigate("/productDetail")}
                            >
                              <img
                                src={product?.img[0].img}
                                alt=""
                                className="w-[80px] h-[80px] mx-3"
                              />
                              <div>
                                <h1 className="line-clamp-2">{product?.name}</h1>
                                <div className="flex gap-1">
                                  <img
                                    src={GiaoHangIcon}
                                    alt=""
                                    className="w-[28px]"
                                  />
                                  <span className="text-secondary text-[15px]">
                                    Giao hàng ngày {getDateAfterFourDays()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[20%] pl-3">
                            {product?.sale ? (
                              <div>
                                <h1 className="text-red-500 font-bold">
                                  {formatCurrency(
                                    product?.price -
                                    product?.price * (product?.sale / 100)
                                  )}
                                </h1>
                                <del className="text-secondary text-[17px]">
                                  {formatCurrency(product?.price)}
                                </del>
                              </div>
                            ) : (
                              <h1 className="text-red-500 font-bold">
                                {formatCurrency(product?.price)}
                              </h1>
                            )}
                          </div>
                          <div className="w-[20%] flex">
                            <div className="cursor-pointer text-[20px] px-3 py-1 ">
                              SL: {product?.quantity || 1}
                            </div>
                          </div>
                          <div className="w-[20%]">
                            <h1 className="text-red-500 font-bold">
                              {formatCurrency(
                                (product?.price -
                                  (product?.sale
                                    ? product?.price * (product?.sale / 100)
                                    : 0)) *
                                (product?.quantity || 1)
                              )}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4 mt-2 p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h3 className="text-[30px] font-semibold text-blue-600">
                      Chính Sách Mua Hàng
                    </h3>
                    <ul className="text-[20px] text-gray-700 list-disc pl-5">
                      <li>Đổi trả trong 7 ngày nếu lỗi nhà sản xuất.</li>
                      <li>Giao hàng toàn quốc từ 3 - 7 ngày.</li>
                      <li>
                        Miễn phí vận chuyển cho đơn hàng có 2 đơn trở lên.
                      </li>
                      <li>Hỗ trợ bảo hành chính hãng.</li>
                      <li>Thanh toán an toàn qua Tiền mặt, ZaloPay, MoMo.</li>
                    </ul>
                  </div>
                  {/* Phương thức thanh toán */}
                  <div className="bg-white p-3 rounded-md text-[18px] mt-3">
                    <h1 className="text-[30px] font-bold">
                      Chọn hình thức thanh toán
                    </h1>
                    <div className="p-2">
                      {hinhThucThanhToanList.map((item) => (
                        <label
                          key={item.id}
                          htmlFor={item.name}
                          className="flex items-center gap-10 mt-4 cursor-pointer"
                        >
                          <input
                            id={item.name}
                            type="radio"
                            name="hinhThucThanhToan"
                            className="scale-[2.5]"
                            checked={item.id === payPro}
                            onChange={() => setPayPro(item.id)} // ✅ Thêm onChange
                          />
                          <img className="w-[90px]" src={item.img} alt="" />
                          <h1>{item.name}</h1>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Chi tiết thanh toán */}
          <div className="flex-1">
            <ShippingInfo account={account} />
            {/* Thông tin giá cả */}
            <div className="flex flex-col gap-3 bg-white rounded-md mx-auto my-3 w-[90%] px-4 py-8">
              <h1 className="text-[25px] font-bold">Đơn hàng</h1>
              <div className="flex justify-between">
                <span className="text-[20px] text-secondary">
                  Tổng tiền hàng
                </span>
                <span className="text-[20px]">
                  {formatCurrency(
                    selectedItems?.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[20px] text-secondary">
                  Phí vận chuyển
                </span>
                <span className="text-[20px]">{formatCurrency(37000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[20px] text-secondary">
                  Giảm giá sản phẩm
                </span>
                <span className="text-[20px] text-[#00ab56]">
                  {formatCurrency(
                    selectedItems?.reduce(
                      (total, item) =>
                        total +
                        (item.sale ? item.price * (item.sale / 100) * item.quantity : 0),
                      0
                    )
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[20px] text-secondary">
                  Giảm giá vận chuyển
                </span>
                <span className="text-[20px] text-[#00ab56]">
                  {formatCurrency(
                    selectedItems?.length > 1 ||
                      selectedItems?.find((pro) => pro.quantity > 1)
                      ? 37000
                      : 0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[20px] text-secondary">Mã giảm giá:</span>
              </div>
              <div className="flex justify-between border-t border-gray-300 py-2">
                <span className="text-[20px] font-bold">
                  Tổng tiền thanh toán
                </span>
                <span className="text-[30px] text-red-500">
                  {formatCurrency(
                    selectedItems?.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    ) - selectedItems?.reduce(
                      (total, item) =>
                        total +
                        (item.sale ? item.price * (item.sale / 100) * item.quantity : 0),
                      0
                    ) + (selectedItems?.length > 1 ||
                      selectedItems?.find((pro) => pro.quantity > 1)
                      ? 0
                      : 37000)
                  )}
                </span>
              </div>
              <div className="text-[20px] text-center text-primary font-bold underline">
                {hinhThucThanhToanList.find((item) => item.id === payPro).name}
              </div>
              <span className="text-secondary text-right italic">
                {`(Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và
                các chi phí phát sinh khác)`}
              </span>
              <div
                className={`w-[90%] mx-auto p-3 text-center text-[20px] rounded-md cursor-pointer ${isLoading ? 'bg-gray-500' : 'bg-red-500'
                  }`}
                onClick={() => {
                  if (!isLoading) setShowConfirm(true); // Chỉ hiển thị confirm khi không đang loading
                }}
              >
                {/* Nếu đang loading, hiển thị spinner, nếu không hiển thị nội dung nút */}
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
                ) : (
                  'Mua ngay'
                )}
              </div>
              {showConfirm && (
                <ConfirmDialog
                  message="Bạn có chắc chắn muốn thanh toán?"
                  onConfirm={handlePayment}
                  onCancel={() => setShowConfirm(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default PaymentCartPage;
