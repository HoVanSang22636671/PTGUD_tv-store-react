import React from "react";
import Banner from "../components/Banner";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header";
import ProductSale from "../components/ProductFilter/ProductSale";
import ProductFlashSale from "../components/ProductFilter/ProductFlashSale";
import Preview from "../components/Preview";
import ProductSuggest from "../components/ProductFilter/ProductSuggest";
import Footer from "../components/Footer";

function HomePage() {
    return (
        <div className="bg-[#f5f5fa] transform transition-all duration-500">
            <div className="container mx-auto px-4">
                {/* Header */}
                <Header />

                {/* Nội dung chính */}
                <div className="mt-3 max-w-screen-lg mx-auto min-h-[900px]">
                    {/* Banner */}
                    <Banner />

                    {/* Filter Bar */}
                    <FilterBar />

                    {/* Sản phẩm sale */}
                    <ProductSale />

                    {/* Flash Sale */}
                    <ProductFlashSale />

                    {/* Preview */}
                    <Preview />

                    {/* Sản phẩm gợi ý */}
                    <ProductSuggest />
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;