const searchList = [
  {
    id: 1,
    name: "Tivi TCL 43",
  },
  {
    id: 2,
    name: "Sony 4K 50",
  },
  {
    id: 3,
    name: "LG 4K 50",
  },
  {
    id: 4,
    name: "Samsung 4K 50",
  },
];

function SearchFlashPopular({ setSearch, input, handleSearch }) {
  return (
    <div className="hidden lg:flex gap-4 items-center p-2 rounded-md bg-white">
      {searchList.length > 0 ? (
        searchList.map((item) => (
          <h1
            key={item.id} // Sử dụng id để đảm bảo tính duy nhất
            className="text-secondary text-[18px] cursor-pointer whitespace-nowrap"
            onClick={() => {
              setSearch(item.name);
              handleSearch();
              input.current.focus();
            }}
          >
            {item.name}
          </h1>
        ))
      ) : (
        <p className="text-gray-500 text-sm">Không có gợi ý nào</p>
      )}
    </div>
  );
}

export default SearchFlashPopular;