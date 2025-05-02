import { FaHotjar } from "react-icons/fa";
import { IoPricetagsOutline, IoStar } from "react-icons/io5";
import { SiSalesforce } from "react-icons/si";
import { TbBorderAll, TbBrandAzure } from "react-icons/tb";

const filterList = [
    { id: 1, title: "Tất cả", icon: <TbBorderAll /> },
    { id: 2, title: "Thương hiệu", icon: <TbBrandAzure /> },
    { id: 3, title: "Giá cả", icon: <IoPricetagsOutline /> },
    { id: 4, title: "Bán chạy", icon: <FaHotjar /> },
    { id: 5, title: "Khuyến mãi", icon: <SiSalesforce /> },
    { id: 6, title: "Đánh giá", icon: <IoStar /> },
];

function FilterBar({ filter = 1, setFilter }) {
    return (
        <div className="bg-white mt-5 p-4 rounded-md">
            <div className="flex justify-between text-center">
                {filterList.map((item) => (
                    <div
                        key={item.id}
                        className={`flex flex-col items-center justify-center w-[14%] p-2 cursor-pointer font-semibold border-2 rounded-lg transition-all duration-200
                                ${item.id === filter
                                ? "bg-blue-500 text-white border-blue-500"
                                : "text-primary border-primary hover:bg-blue-100 hover:text-blue-500"
                            }`}
                        onClick={() => setFilter(item.id)}
                    >
                        <span className="text-sm md:text-base">{item.title}</span>
                        <span className="text-[20px] md:text-[25px]">{item.icon}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FilterBar;