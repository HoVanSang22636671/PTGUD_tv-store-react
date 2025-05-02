function CamKet() {
  return (
    <div className="flex mt-3 flex-col gap-3 bg-white rounded-md p-4">
      <h1 className="font-bold text-center text-[25px]">Cam kết</h1>
      <div>
        <div className="border-b border-gray-200 p-3 flex items-center gap-4">
          <img src="/img/camket/chinhhang.png" alt="" className="w-[20px] h-[20px]" />
          <span className="text-[20px] ">{"100% hàng thật"}</span>
        </div>
        <div className="border-b border-gray-200 p-3 flex items-center gap-4">
          <img src="/img/camket/freeship.png" alt="" className="w-[20px] h-[20px]" />
          <span className="text-[20px] ">{"FreeShip mọi nơi"}</span>
        </div>
        <div className="border-b border-gray-200 p-3 flex items-center gap-4">
          <img src="/img/camket/hoantien.png" alt="" className="w-[20px] h-[20px]" />
          <span className="text-[20px] ">{"Hoàn 200% nếu hàng giả"}</span>
        </div>
        <div className="border-b border-gray-200 p-3 flex items-center gap-4">
          <img src="/img/camket/giaonhanh.png"alt="" className="w-[20px] h-[20px]" />
          <span className="text-[20px] ">{"30 ngày đổi trả"}</span>
        </div>
        <div className="border-b border-gray-200 p-3 flex items-center gap-4">
          <img src="/img/camket/giare.png" alt="" className="w-[20px] h-[20px]" />
          <span className="text-[20px] ">{"Giao nhanh"}</span>
        </div>
        <div className="border-b border-gray-200 p-3 flex items-center gap-4">
          <img src="/img/camket/doitra.png" alt="" className="w-[20px] h-[20px]" />
          <span className="text-[20px] ">{"Giá siêu rẽ"}</span>
        </div>
      </div>
    </div>
  );
}

export default CamKet;
