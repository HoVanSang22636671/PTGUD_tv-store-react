

import { useEffect, useState } from "react";
import React from "react";
import Banner from "../components/Banner";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header";
import ProductSale from "../components/ProductFilter/ProductSale";
import ProductFlashSale from "../components/ProductFilter/ProductFlashSale";
import Preview from "../components/Preview";
import ProductSuggest from "../components/ProductFilter/ProductSuggest";
import Footer from "../components/Footer";

import ThuongHieuFilter from "../components/FilterDetail/ThuongHieuFilter";
import GiaCaFilter from "../components/FilterDetail/GiaCaFilter";
import DanhGiaFilter from "../components/FilterDetail/DanhGiaFilter";
import MiniFilter from "../components/FilterDetail/MiniFilter";
import FilterProduct from "../components/FilterProduct";
import Product from "../components/Product";
import { useProduct } from "../API/UseProvider";

function HomePage() {
    const [filter, setFilter] = useState(1); // Bộ lọc hiện tại (1: Tất cả, 2: Thương hiệu, ...)
    const [thuongHieu, setThuongHieu] = useState([]); // Danh sách thương hiệu đã chọn
    const [giaCa, setGiaCa] = useState(0);
    const [danhGia, setDanhGia] = useState([]);
    const [productList, setProductList] = useState([]); // Danh sách sản phẩm
    const { product } = useProduct(); // Lấy danh sách sản phẩm từ API/Provider

    // Lọc sản phẩm theo các điều kiện
    const filterProduct = productList.filter((item) => {
        const isThuongHieuValid =
            thuongHieu.length === 0 || thuongHieu.includes(item.thuongHieu);
        const isDanhGiaValid =
            danhGia.length === 0 || danhGia.includes(item.star); // Kiểm tra đánh giá
        return isThuongHieuValid && isDanhGiaValid;
    });

    // Reset bộ lọc khi chọn "Tất cả" hoặc "Bán chạy"
    useEffect(() => {
        if (filter === 1 || filter === 4) {
            setThuongHieu([]);
        }
    }, [filter]);

    // Cập nhật danh sách sản phẩm khi dữ liệu thay đổi
    useEffect(() => {
        setProductList(product);
    }, [product]);

    let kq;
    if (giaCa === "Giá cao đến thấp") {
        kq = [...filterProduct].sort((a, b) => b.price - a.price);
    } else if (giaCa === "Giá thấp đến cao") {
        kq = [...filterProduct].sort((a, b) => a.price - b.price);
    } else {
        kq = [...filterProduct];
    }

    return (
        <div className="bg-[#f5f5fa] transform transition-all duration-500 overflow-x-hidden">
            {/* Header */}
           

            {/* Nội dung chính */}
            <div className="container mx-auto px-4 max-[100%]:">
                <div className="mt-3 max-w-screen-2lg mx-auto min-h-[900px]">
                    {/* Banner */}
                    <Banner />

                    {/* Filter Bar */}
                    <FilterBar filter={filter} setFilter={setFilter} />
                    {filter === 2 && (
                        <ThuongHieuFilter
                            selectedBrands={thuongHieu}
                            setSelectedBrands={setThuongHieu}
                        />
                    )}

                    {/* Lọc theo giá cả */}
                    {filter === 3 && (
                        <GiaCaFilter giaCa={giaCa} setGiaCa={setGiaCa} />
                    )}
                    {/* Hiển thị sản phẩm bán chạy */}
                    {filter === 4 && (
                        <FilterProduct title={"Sản phẩm bán chạy"}>
                            {productList
                                .sort((a, b) => b.sold - a.sold) // Sắp xếp giảm dần theo số lượng đã bán
                                .slice(0, 10) // Lấy top 10 sản phẩm bán chạy
                                .map((product) => (
                                    <Product key={product.id} product={product} />
                                ))}
                        </FilterProduct>
                    )}
                    {/* Lọc theo đánh giá */}
                    {filter === 6 && (
                        <DanhGiaFilter danhGia={danhGia} setDanhGia={setDanhGia} />
                    )}
                    <MiniFilter
                        thuongHieu={thuongHieu}
                        setThuongHieu={setThuongHieu}
                        danhGia={danhGia}
                        setDanhGia={setDanhGia}
                        giaCa={giaCa}
                        setGiaCa={setGiaCa}
                    />
                    {/* Hiển thị sản phẩm được lọc */}
                    {(thuongHieu.length > 0 || giaCa !== 0 || danhGia.length > 0) &&
                        kq.length > 0 && (
                            <FilterProduct title={"Kết quả lọc"}>
                                {filterProduct.map((product) => (
                                    <Product key={product.id} product={product} />
                                ))}
                            </FilterProduct>
                        )}
                    {/* Sản phẩm sale */}
                    <ProductSale />

                    {/* Flash Sale */}
                    <ProductFlashSale />

                    {/* Preview */}
                    <Preview />

                    {/* Sản phẩm gợi ý */}
                    <ProductSuggest />
                </div>
            </div>

            {/* Footer */}
            
        </div>
    );
}

export default HomePage;