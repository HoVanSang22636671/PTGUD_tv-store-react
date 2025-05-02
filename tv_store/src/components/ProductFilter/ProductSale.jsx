import Slider from "react-slick";
import Product from "../Product";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Nút điều hướng trái
const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            className="absolute left-0 z-10 bg-white shadow-lg p-2 rounded-full -translate-y-1/2 top-1/2 hover:bg-gray-200"
            onClick={onClick}
        >
            <FaChevronLeft size={20} className="text-gray-600" />
        </button>
    );
};

// Nút điều hướng phải
const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            className="absolute right-0 z-10 bg-white shadow-lg p-2 rounded-full -translate-y-1/2 top-1/2 hover:bg-gray-200"
            onClick={onClick}
        >
            <FaChevronRight size={20} className="text-gray-600" />
        </button>
    );
};

function ProductSale() {
    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        pauseOnHover: true,
        pauseOnFocus: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 10000,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    // Dữ liệu mẫu để hiển thị khung
    const mockProducts = Array.from({ length: 6 }, (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        price: `${(index + 1) * 100}k`,
    }));

    return (
        <div className="bg-white mt-5 p-5 pb-10 rounded-md relative">
            <div>
                <h1 className="text-red-500 text-2xl py-2 font-semibold">Top Sale</h1>
                <Slider {...settings}>
                    {mockProducts.map((product, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded-md flex flex-col items-center"
                        >
                            <div className="w-20 h-20 bg-gray-200 rounded-md mb-2"></div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-500">{product.price}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ProductSale;