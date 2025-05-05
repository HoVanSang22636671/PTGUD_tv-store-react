import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdOutlineDelete, MdSave } from "react-icons/md";
import GiaoHangIcon from "../../assets/camket/giaohang.png";
import formatCurrency from "../../calculator/FormatCurrency";
import { useProduct } from "../../API/UseProvider";
import ConfirmDialog from "../../message/ConfirmDialog"; // Import useProvider từ API
function ProductCart({
  product,
  setCart,
  handleSelectProduct,
  selectedProducts,
  quantity,
  account
}) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const {updateProductQuantity,deleteProduct} = useProduct(); 
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);// Lấy hàm updateProductQuantity từ context
  function getDateAfterFourDays() {
    const today = new Date();
    today.setDate(today.getDate() + 4);
    return today.toLocaleDateString("vi-VN");
  }

 // State để kiểm soát modal xác nhận

  // Hàm xác nhận xóa sản phẩm
  const handleDelete = () => {
    setShowConfirmDialog(true); // Mở modal xác nhận xóa
  };

  const handleConfirmDelete = () => {
    deleteProduct(account?.id, product?.id);  // Gọi hàm xóa
    setShowConfirmDialog(false);  // Đóng modal sau khi xác nhận xóa
    setIsEditing(false);  // Đóng chế độ chỉnh sửa
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);  // Đóng modal nếu người dùng hủy
  };
// console.log(account?.id, product?.id, localQuantity);
  const handleSave = () => {
    updateProductQuantity(account?.id, product?.id, localQuantity);
    setIsEditing(false) // This is now a function reference, not immediately called.
  };

  return (
    <div className="bg-white p-3 rounded-md text-[18px] mt-3">
      <div className="flex items-center">
        {/* PRODUCT INFO */}
        <div className="flex w-[35%] items-center">
          <input
            type="checkbox"
            className="w-[25px] cursor-pointer scale-150"
            checked={selectedProducts.includes(product.id)}
            onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
          />

          <div
            className="flex cursor-pointer"
            onClick={() => {
              localStorage.setItem("detailProduct", JSON.stringify(product));
              navigate(`/productDetail/${product?.id}`, { state: { fromData: true } });
            }}
          >
            <img
              src={product.img[0].img}
              alt=""
              className="w-[80px] h-[80px] mx-3"
            />
            <div>
              <h1 className="line-clamp-2">{product.name}</h1>
              <div className="flex gap-1">
                <img
                  src={GiaoHangIcon}
                  alt=""
                  className="hidden md:block w-[28px]"
                />
                <span className="text-secondary text-[15px]">
                  Giao hàng ngày {getDateAfterFourDays()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* GIÁ */}
        <div className="w-[20%] pl-3">
          {product.sale ? (
            <div>
              <h1 className="text-red-500 font-bold">
                {formatCurrency(
                  product.price - product.price * (product.sale / 100)
                )}
              </h1>
              <del className="text-secondary text-[17px]">
                {formatCurrency(product.price)}
              </del>
            </div>
          ) : (
            <h1 className="text-red-500 font-bold">
              {formatCurrency(product.price)}
            </h1>
          )}
        </div>

        {/* SỐ LƯỢNG */}
        <div className="w-[20%] flex">
          {isEditing ? (
            <>
              <button
                className="rounded-s-md cursor-pointer hover:bg-gray-100 px-3 py-1 border border-gray-500 border-opacity-50"
                onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
              >
                -
              </button>
              <div className="cursor-pointer hover:bg-gray-100 px-3 py-1 border-y border-gray-500 border-opacity-50">
                {localQuantity}
              </div>
              <button
                className="rounded-e-md cursor-pointer hover:bg-gray-100 px-3 py-1 border border-gray-500 border-opacity-50"
                onClick={() => setLocalQuantity(localQuantity + 1)}
              >
                +
              </button>
            </>
          ) : (
            <div className="px-3 py-1">{quantity}</div>
          )}
        </div>

        {/* TỔNG GIÁ */}
        <div className="w-[20%]">
          <h1 className="text-red-500 font-bold">
            {formatCurrency(
              (product.price -
                (product.sale ? product.price * (product.sale / 100) : 0)) *
                (isEditing ? localQuantity : quantity)
            )}
          </h1>
        </div>

        {/* HÀNH ĐỘNG */}
        <div className="w-[5%] relative">
          {!isEditing ? (
            <MdEdit
              className="text-[25px] text-secondary cursor-pointer hover:scale-110 transition duration-300"
              onClick={() => setIsEditing(true)}
              title="Chỉnh sửa"
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <MdSave
                className="text-[25px] text-green-600 cursor-pointer hover:scale-110 transition duration-300"
                onClick={handleSave}
                title="Lưu"
              />
              <MdOutlineDelete
                className="text-[25px] text-red-500 cursor-pointer hover:scale-110 transition duration-300"
                onClick={handleDelete}
                title="Xóa"
              />
            </div>
          )}
        </div>
      </div>
      {/* Modal Xác Nhận Xóa */}
      {showConfirmDialog && (
        <ConfirmDialog
          message="Bạn chắc chắn muốn xóa sản phẩm này?"
          onConfirm={handleConfirmDelete} // Xác nhận xóa
          onCancel={handleCancelDelete} // Hủy xóa
        />
      )}
    </div>
  );
}

export default ProductCart;
