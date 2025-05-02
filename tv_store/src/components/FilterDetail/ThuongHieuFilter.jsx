const thuongHieuList = [
    {
        id: 1,
        name: "Sony",
    },
    {
        id: 2,
        name: "Samsung",
    },
    {
        id: 3,
        name: "LG",
    },
    {
        id: 4,
        name: "Panasonic",
    },
    {
        id: 5,
        name: "TCL",
    },
    {
        id: 6,
        name: "Sharp",
    },
];

function ThuongHieuFilter({ selectedBrands = [], setSelectedBrands }) {
    return (
        <div className="bg-white mt-5 p-4 rounded-md ">
            <div className="flex gap-5">
                {thuongHieuList.map((item) =>
                    selectedBrands.includes(item.name) ? (
                        <span
                            key={item.name}
                            className="p-2 px-4 border border-primary text-primary rounded-xl
              cursor-pointer hover:bg-gray-200"
                            onClick={() =>
                                setSelectedBrands(
                                    selectedBrands.filter((brand) => brand !== item.name)
                                )
                            }
                        >
                            {item.name}
                        </span>
                    ) : (
                        <span
                            key={item.name}
                            className="p-2 px-4 border border-gray-300 rounded-xl
              cursor-pointer hover:bg-gray-200"
                            onClick={() => setSelectedBrands([...selectedBrands, item.name])}
                        >
                            {item.name}
                        </span>
                    )
                )}
                <span
                    className="p-2 px-6 font-semibold border-primary text-primary rounded-md border-[2px] 
              cursor-pointer hover:bg-gray-200 ml-auto"
                    onClick={() => setSelectedBrands([])}
                >
                    Xóa lọc
                </span>
            </div>
        </div>
    );
}

export default ThuongHieuFilter;