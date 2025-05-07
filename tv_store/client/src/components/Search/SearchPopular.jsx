import { IoIosSearch } from "react-icons/io";

const searchList = [
  {
    id: 1,
    name: "Tivi TCL Full HD 43 inch S5400A - HDR10, Dolby Audio - Hàng Chính Hãng",
  },
  {
    id: 2,
    name: "Android Tivi Sony 4K 50 inch KD-50X75",
  },
  {
    id: 3,
    name: "Smart Tivi LG 4K 50 Inch 50UQ7050PSA - Hàng chính hãng",
  },
  {
    id: 4,
    name: "Smart Tivi Samsung 4K 50 Inch UA50DU7700 50DU7700 - Hàng chính hãng - Chỉ giao HCM",
  },
];

function SearchPopular({ setSearch, input, handleSearch }) {
  return (
    <div>
      {/* Tippy tìm kiếm*/}
      <div>
        <div>
          <h1 className="text-lg font-bold p-3">Tìm kiếm phổ biến</h1>
          <div>
            {searchList.map((search) => (
              <div
                key={search.id}
                className="flex p-2 items-center gap-2 hover:bg-gray-200 cursor-pointer "
                onClick={() => {
                  setSearch(search.name);
                  handleSearch();
                  input.current.focus();
                }}
              >
                <IoIosSearch className="text-[28px] text-secondary" />
                <span className="text-lg cursor-pointer">{search.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPopular;
