import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThongTinVanChuyen from "../components/ProductDeTails/ThongTinVanChuyen";
import CamKet from "../components/ProductDeTails/CamKet";
const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [imgDevice, setImgDevice] = useState(0);
  const [num, setNum] = useState(1);
  const [error, setError] = useState('');
  useEffect(() => {
    const apiUrl =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000/api/db.json' // local
      : 'https://your-project-name.vercel.app/api/db.json';
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0 && Array.isArray(data[0].product)) {
          setProduct(data[0].product[0]); // ✅ Lấy 1 sản phẩm đầu tiên
        }
      })
      .catch((err) => console.error("Lỗi khi load dữ liệu:", err));
  }, []);

  // Hàm formatCurrency để định dạng giá tiền
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // Nếu product là null, hiển thị loading hoặc thông báo lỗi
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#f5f5fa]">
      <Header />
      <div className="flex flex-col md:flex-row gap-4 p-[24px]">
        {/* left  */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* hinh ảnh */}
            <div className="w-full order-1 md:w-1/2   ">
              <div className="sticky top-[12px] ">
                <div className="flex flex-col md:flex-row items-center justify-center rounded-md bg-white overflow-hidden">
                  <img src={product.img[imgDevice].img} alt="" />
                </div>
                <div className="flex justify-center gap-1 mt-3">
                  {product.img.map((img) =>
                    img.id === imgDevice ? (
                      <div
                        key={img.id}
                        className="w-[80px] h-[80px] border-2 border-primary cursor-pointer rounded-lg"
                      >
                        <img
                          src={img.img}
                          alt=""
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      <div
                        key={img.id}
                        className="w-[80px] h-[80px] border-2 border-gray-200 cursor-pointer rounded-lg"
                        // onClick={() => setImgDevice(img.id)}
                        onMouseOver={() => setImgDevice(img.id)}
                      >
                        <img
                          src={img.img}
                          alt=""
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            {/* Chi tiet san pham */}
            <div className="w-full md:w-1/2 order-3 md:order-1">
              <div>
                {/* Sản phẩm */}
                <div className="flex flex-col gap-3 bg-white rounded-md p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="./img/doitra30ngay.png"
                      alt=""
                      className="w-[114px] h-[20px]"
                    />
                    <img
                      src="./img/sanphamchinhhang.png"
                      alt=""
                      className="w-[89px] h-[20px]"
                    />
                    <span className="text-[14px]">
                      Thương hiệu: {product.thuongHieu}
                    </span>
                  </div>
                  {/* Tên sản phẩm */}
                  <h1 className="text-[24px] font-medium">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex">
                      {Array.from({ length: product.star }, (_, index) => (
                        <FaStar
                          key={index}
                          className="text-yellow-400 text-sm"
                        />
                      ))}
                    </div>
                    <div className="border border-gray-200 h-[19px]"></div>
                    <div>Đã bán: {product.sold}</div>
                  </div>
                  <div>
                    {product.sale ? (
                      <div className="flex items-center gap-4">
                        <h1 className="text-red-500 text-[25px] font-semibold">
                          {formatCurrency(
                            product.price -
                            product.price * (product.sale / 100)
                          )}
                        </h1>
                        <div className="space-x-2">
                          <span className="p-1 bg-gray-200 rounded-lg">
                            {"-" + product.sale + "%"}
                          </span>
                          <del className="text-secondary text-[12px]">
                            {formatCurrency(product.price)}
                          </del>
                        </div>
                        <GoInfo />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <h1 className="text-red-500 text-[25px] font-semibold">
                          {formatCurrency(product.price)}
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
                {/* Vận chuyển */}
                <ThongTinVanChuyen />
                {/* Bảo hành */}
                <div className="flex mt-3 flex-col gap-3 bg-white rounded-md p-4">
                      <h1 className="font-bold text-center text-[25px]">
                        Thông tin bảo hành
                      </h1>
                      <div>
                        <div className="border-b border-gray-200 p-3 flex gap-2">
                          <span className="text-[18px]">
                            Thời gian bảo hành:
                          </span>
                          <span className="text-[18px] font-semibold">
                            {product.baohanh.thoigian}
                          </span>
                        </div>
                        <div className="border-b border-gray-200 p-3 flex gap-2">
                          <span className="text-[18px]">
                            Hình thức bảo hành::
                          </span>
                          <span className="text-[18px] font-semibold">
                            {product.baohanh.hinhthuc}
                          </span>
                        </div>
                        <div className="border-b border-gray-200 p-3 flex gap-2">
                          <span className="text-[18px]">Nơi bảo hành:</span>
                          <span className="text-[18px] font-semibold">
                            {product.baohanh.noibaohanh}
                          </span>
                        </div>
                      </div>
                    </div>
                {/* Cam kết */}
                <CamKet />
                {/* Thông số sản phẩm */}
                <div className="flex mt-3 flex-col gap-3 bg-white rounded-md p-4">
                      <h1 className="font-bold text-center text-[25px]">
                        Thông tin chi tiết
                      </h1>
                      <div>
                        {product.info.map((item, index) => (
                          <div
                            key={index}
                            className="border-b border-gray-200 p-3 flex gap-2"
                          >
                            <span className="text-secondary w-1/2 text-[18px]">
                              {item.name}
                            </span>
                            <span className="w-1/2 text-[18px]">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
              </div>
            </div>
          </div>
          {/* Đánh giá khách hàng */}

        </div>
        {/* {Thanh toán} */}
        <div className="w-full md:w-1/3 order-2 md:order-1">
          <div className=" sticky top-[12px]">
            <div className=" flex flex-col gap-4 bg-white rounded-md p-4">
              <div className="flex gap-3 items-center">
                <img
                  src={product.img[imgDevice].img}
                  alt=""
                  className="w-[50px] h-[50px]"
                />
                <h1 className="line-clamp-1 text-[17px] font-medium">
                  {product.name}
                </h1>
              </div>

              <div>
                <h1 className="text-[20px] font-semibold mb-2">Số lượng</h1>
                <div className="flex gap-2 items-center">
                  <div
                    className="flex items-center cursor-pointer justify-center text-[28px] w-[39px] h-[39px] border border-gray-200 rounded-md text-secondary"
                    onClick={() => {
                      if (num > 1) {
                        setNum(num - 1);
                        setError('');
                      }
                    }}
                  >
                    -
                  </div>

                  <div className="flex items-center justify-center text-[20px] w-[39px] h-[39px] border border-gray-200 rounded-md text-secondary">
                    {num}
                  </div>

                  <div
                    className="flex items-center cursor-pointer justify-center text-[28px] w-[39px] h-[39px] border border-gray-200 rounded-md text-secondary"
                    onClick={() => {
                      if (num < product.inventory) {
                        setNum(num + 1);
                        setError('');
                      } else {
                        setError('Vượt quá số lượng tồn kho');
                      }
                    }}
                  >
                    +
                  </div>

                  {error && (
                    <span className="text-red-500 text-sm ml-2">{error}</span>
                  )}
                </div>

                <h1 className="text-[18px] text-gray-600 pt-2">Tồn kho: {product.inventory}</h1>
              </div>

              <div>
                <h1 className="text-[20px] font-semibold mb-2">Tạm tính</h1>
                <div className="text-[30px] text-red-500">
                  {product.sale ? (
                    <div className="flex items-center gap-4">
                      <h1 className="text-red-500 text-[30px] font-semibold">
                        {formatCurrency(
                          (product.price -
                            product.price * (product.sale / 100)) * num
                        )}
                      </h1>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <h1 className="text-red-500 text-[30px] font-semibold">
                        {formatCurrency(product.price)}
                      </h1>
                    </div>
                  )}
                </div>
              </div>
              {/* Mua */}
              <div className="space-y-2">
                <div
                  className="w-[90%] mx-auto p-3 bg-red-500 text-white text-center text-[20px] rounded-md cursor-pointer"
                  onClick={() => {

                  }}
                >
                  Mua ngay
                </div>
                <div
                  className="w-[90%] mx-auto p-3 text-primary text-center border border-primary text-[20px] rounded-md cursor-pointer"
                  onClick={() => {
                  }}
                >
                  Thêm vào giỏ hàng
                </div>
              </div>
            </div>
            <div className="mt-4">

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
