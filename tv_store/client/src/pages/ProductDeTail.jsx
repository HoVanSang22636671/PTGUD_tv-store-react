import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThongTinVanChuyen from "../components/ProductDeTails/ThongTinVanChuyen";
import CamKet from "../components/ProductDeTails/CamKet";
import { useProduct } from "../API/UseProvider";
import { useParams,Link } from 'react-router-dom';
const ProductDetail = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imgDevice, setImgDevice] = useState(0);
  const [num, setNum] = useState(1);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState([1, 2]);
  const { product, account, addToCart } = useProduct();
  const { id } = useParams();
  const existingItem = account?.cart.find(item => item.idProduct === id);

  useEffect(() => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa

    if (existingItem) {
      // Nếu có, đặt số lượng từ giỏ hàng
      setNum(existingItem?.quantity);
    } else {
      // Nếu không, đặt số lượng mặc định là 1
      setNum(1);
    }
  }, [account, id]);
  const isInCart = !!existingItem;
  useEffect(() => {
    if (product && Array.isArray(product)) {
      const found = product.find((p) => String(p.id) === String(id));
      setSelectedProduct(found);
    }
  }, [product, id]);
  // 
  // console.log(account?.id);
  // Hàm formatCurrency để định dạng giá tiền
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // Nếu product là null, hiển thị loading hoặc thông báo lỗi
  if (!selectedProduct) {
    return <div>Loading...</div>;
  }
  const filterStar = [
    {
      id: 1,
      num: 1,
    },
    {
      id: 2,
      num: 2,
    },
    {
      id: 3,
      num: 3,
    },
    {
      id: 4,
      num: 4,
    },
    {
      id: 5,
      num: 5,
    },
  ];
  return (
    <div className="bg-[#f5f5fa] transform transition-all duration-500">
      <Header />
      <div className="flex flex-col md:flex-row gap-4 p-[24px]">
        {/* left  */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* hinh ảnh */}
            <div className="w-full order-1 md:w-1/2   ">
              <div className="sticky top-[12px] ">
                <div className="flex flex-col md:flex-row items-center justify-center rounded-md bg-white overflow-hidden">
                  <img src={selectedProduct.img[imgDevice].img} alt="" />
                </div>
                <div className="flex justify-center gap-1 mt-3">
                  {selectedProduct.img.map((img) =>
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
                      src="/img/doitra30ngay.png"
                      alt=""
                      className="w-[114px] h-[20px]"
                    />
                    <img
                      src="/img/sanphamchinhhang.png"
                      alt=""
                      className="w-[89px] h-[20px]"
                    />
                    <span className="text-[14px]">
                      Thương hiệu: {selectedProduct.thuongHieu}
                    </span>
                  </div>
                  {/* Tên sản phẩm */}
                  <h1 className="text-[24px] font-medium">
                    {selectedProduct.name}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex">
                      {Array.from({ length: selectedProduct.star }, (_, index) => (
                        <FaStar
                          key={index}
                          className="text-yellow-400 text-sm"
                        />
                      ))}
                    </div>
                    <div className="border border-gray-200 h-[19px]"></div>
                    <div>Đã bán: {selectedProduct.sold}</div>
                  </div>
                  <div>
                    {selectedProduct.sale ? (
                      <div className="flex items-center gap-4">
                        <h1 className="text-red-500 text-[25px] font-semibold">
                          {formatCurrency(
                            selectedProduct.price -
                            selectedProduct.price * (selectedProduct.sale / 100)
                          )}
                        </h1>
                        <div className="space-x-2">
                          <span className="p-1 bg-gray-200 rounded-lg">
                            {"-" + selectedProduct.sale + "%"}
                          </span>
                          <del className="text-secondary text-[12px]">
                            {formatCurrency(selectedProduct.price)}
                          </del>
                        </div>
                        <GoInfo />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <h1 className="text-red-500 text-[25px] font-semibold">
                          {formatCurrency(selectedProduct.price)}
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
                        {selectedProduct.baohanh.thoigian}
                      </span>
                    </div>
                    <div className="border-b border-gray-200 p-3 flex gap-2">
                      <span className="text-[18px]">
                        Hình thức bảo hành::
                      </span>
                      <span className="text-[18px] font-semibold">
                        {selectedProduct.baohanh.hinhthuc}
                      </span>
                    </div>
                    <div className="border-b border-gray-200 p-3 flex gap-2">
                      <span className="text-[18px]">Nơi bảo hành:</span>
                      <span className="text-[18px] font-semibold">
                        {selectedProduct.baohanh.noibaohanh}
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
                    {selectedProduct.info.map((item, index) => (
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
          <div className="bg-white rounded-md p-7">
            <h1 className="text-[25px] font-semibold">Đánh giá</h1>
            <div className="flex gap-10">
              <div>
                <h1 className="text-[18px] my-3">Tổng quan</h1>
                {/* Star */}
                <div>
                  <div className="flex gap-2">
                    <h1 className="text-[35px] font-semibold">{"4.9"}</h1>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <FaStar
                          key={index}
                          className="text-yellow-400 text-lg"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-secondary">{`(${"41 đánh giá"})`}</span>
                  {/* Chi tiết số Star */}
                  <div>
                    {/* 5 star */}
                    <div className="flex gap-2 w-[150px] justify-between items-center mt-3">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, index) => (
                          <FaStar
                            key={index}
                            className="text-yellow-400 text-lg"
                          />
                        ))}
                      </div>
                      <span className="text-secondary">{"2"}</span>
                    </div>
                    {/* 4 star */}
                    <div className="flex gap-2 w-[150px] justify-between items-center mt-3">
                      <div className="flex items-center">
                        {Array.from({ length: 4 }, (_, index) => (
                          <FaStar
                            key={index}
                            className="text-yellow-400 text-lg"
                          />
                        ))}
                      </div>
                      <span className="text-secondary">{"2"}</span>
                    </div>
                    {/* 3 star */}
                    <div className="flex gap-2 w-[150px] justify-between items-center mt-3">
                      <div className="flex items-center">
                        {Array.from({ length: 3 }, (_, index) => (
                          <FaStar
                            key={index}
                            className="text-yellow-400 text-lg"
                          />
                        ))}
                      </div>
                      <span className="text-secondary">{"2"}</span>
                    </div>
                    {/* 2 star */}
                    <div className="flex gap-2 w-[150px] justify-between items-center mt-3">
                      <div className="flex items-center">
                        {Array.from({ length: 2 }, (_, index) => (
                          <FaStar
                            key={index}
                            className="text-yellow-400 text-lg"
                          />
                        ))}
                      </div>
                      <span className="text-secondary">{"2"}</span>
                    </div>
                    {/* 1 star */}
                    <div className="flex gap-2 w-[150px] justify-between items-center mt-3">
                      <div className="flex items-center">
                        {Array.from({ length: 1 }, (_, index) => (
                          <FaStar
                            key={index}
                            className="text-yellow-400 text-lg"
                          />
                        ))}
                      </div>
                      <span className="text-secondary">{"2"}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 "></div>
              {/* Bình luận */}
              <div className="flex-1">
                {/* Lọc */}
                <h1 className="m-2 text-[20px] font-bold">Lọc theo</h1>
                <div className="flex gap-3">
                  {filterStar.map((star) =>
                    filter.includes(star.id) ? (
                      <div
                        key={star.id}
                        className="text-[20px] border border-primary text-primary p-3 rounded-full
                        cursor-pointer"
                        onClick={() =>
                          setFilter(
                            filter.filter((item) => item !== star.num)
                          )
                        }
                      >
                        {star.num + " sao"}
                      </div>
                    ) : (
                      <div
                        key={star.id}
                        className="text-[20px] border border-gray-200 p-3 rounded-full
                        cursor-pointer"
                        onClick={() =>
                          setFilter((prev) => [...prev, star.id])
                        }
                      >
                        {star.num + " sao"}
                      </div>
                    )
                  )}
                </div>
                {/* List bình luận */}
                <div>
                  {/* <div className="space-y-5 mt-3">
                    {listComment.map((list) => (
                      <Comment key={list.id} list={list} />
                    ))}
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {Thanh toán} */}
        <div className="w-full md:w-1/3 order-2 md:order-1">
          <div className=" sticky top-[12px]">
            <div className=" flex flex-col gap-4 bg-white rounded-md p-4">
              <div className="flex gap-3 items-center">
                <img
                  src={selectedProduct.img[imgDevice].img}
                  alt=""
                  className="w-[50px] h-[50px]"
                />
                <h1 className="line-clamp-1 text-[17px] font-medium">
                  {selectedProduct.name}
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
                      if (num < selectedProduct.inventory) {
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

                <h1 className="text-[18px] text-gray-600 pt-2">Tồn kho: {selectedProduct.inventory}</h1>
              </div>

              <div>
                <h1 className="text-[20px] font-semibold mb-2">Tạm tính</h1>
                <div className="text-[30px] text-red-500">
                  {selectedProduct.sale ? (
                    <div className="flex items-center gap-4">
                      <h1 className="text-red-500 text-[30px] font-semibold">
                        {formatCurrency(
                          (selectedProduct.price -
                            selectedProduct.price * (selectedProduct.sale / 100)) * num
                        )}
                      </h1>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <h1 className="text-red-500 text-[30px] font-semibold">
                        {formatCurrency(selectedProduct.price)}
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
                <div className="w-[90%] mx-auto flex items-center gap-2">
                  {/* Nút thêm/cập nhật */}
                  <div
                    className={`flex-1 text-center p-3 border text-[20px] rounded-md cursor-pointer transition duration-200 ${isInCart && existingItem?.quantity === num
                      ? 'border-gray-400 text-gray-400 cursor-not-allowed'
                      : 'border-primary text-primary hover:bg-blue-700 hover:text-white'
                      }`}
                    onClick={() => {
                      if (!account || !selectedProduct || num <= 0) {
                        console.log('Dữ liệu không hợp lệ.');
                        return;
                      }

                      if (isInCart && existingItem?.quantity === num) {
                        console.log('Số lượng giống nhau, không cần cập nhật.');
                        return;
                      }

                      addToCart(account?.id, selectedProduct.id, num);
                    }}
                  >
                    {isInCart
                      ? existingItem?.quantity !== num
                        ? 'Cập nhật số lượng'
                        : 'Đã có trong giỏ hàng'
                      : 'Thêm vào giỏ hàng'}
                  </div>

                  {/* Icon giỏ hàng nhỏ */}
                  {isInCart && (
                    <Link
                      to="/cart"
                      className="p-3 border border-green-500 text-green-600 rounded-md cursor-pointer hover:bg-green-500 hover:text-white h-full flex items-center justify-center"
                      title="Đi đến giỏ hàng"
                    >
                      🛒
                    </Link>
                  )}
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
