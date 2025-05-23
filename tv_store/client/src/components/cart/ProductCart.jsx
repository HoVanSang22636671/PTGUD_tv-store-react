import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdOutlineDelete, MdSave } from "react-icons/md";
import GiaoHangIcon from "../../assets/camket/giaohang.png";
import formatCurrency from "../../calculator/FormatCurrency";
import { useProduct } from "../../API/UseProvider";
import ConfirmDialog from "../../message/ConfirmDialog";

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
  const { updateProductQuantity, deleteProduct } = useProduct();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const isOutOfStock = quantity > product.inventory;

  function getDateAfterFourDays() {
    const today = new Date();
    today.setDate(today.getDate() + 4);
    return today.toLocaleDateString("vi-VN");
  }

  const handleDelete = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    deleteProduct(account?.id, product?.id);
    setShowConfirmDialog(false);
    setIsEditing(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleSave = () => {
    if (localQuantity > product.inventory) {
      alert(`Không thể lưu: Vượt quá tồn kho (${product.inventory} sản phẩm có sẵn)`);
      return;
    }
    updateProductQuantity(account?.id, product?.id, localQuantity);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-3 rounded-md text-[18px] mt-3 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* PRODUCT INFO */}
        <div className="flex md:w-[35%] w-full items-start gap-2">
          <input
            type="checkbox"
            className="w-[25px] mt-2 cursor-pointer scale-150"
            checked={selectedProducts.includes(product.id)}
            disabled={isOutOfStock}
            onChange={(e) => handleSelectProduct(product.id, e.target.checked)}
            title={isOutOfStock ? "Số lượng vượt quá tồn kho" : "Chọn sản phẩm"}
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
              className="w-[80px] h-[80px] mx-2 object-cover"
            />
            <div className="flex flex-col justify-between">
              <h1 className="line-clamp-2 text-[16px] md:text-[18px] font-medium">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <img
                  src={GiaoHangIcon}
                  alt=""
                  className="hidden md:block w-[28px]"
                />
                <span className="text-secondary text-[14px]">
                  Giao hàng ngày {getDateAfterFourDays()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* GIÁ */}
        <div className="md:w-[20%] w-full pl-2">
          {product.sale ? (
            <div>
              <h1 className="text-red-500 font-bold text-[17px]">
                {formatCurrency(
                  product.price - product.price * (product.sale / 100)
                )}
              </h1>
              <del className="text-secondary text-[15px]">
                {formatCurrency(product.price)}
              </del>
            </div>
          ) : (
            <h1 className="text-red-500 font-bold text-[17px]">
              {formatCurrency(product.price)}
            </h1>
          )}
        </div>

        {/* SỐ LƯỢNG */}
        <div className="md:w-[20%] w-full flex flex-col items-start">
          <div className="flex items-center">
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
          {isOutOfStock && (
            <div className="text-red-500 text-sm mt-1">
              Vượt quá số lượng tồn kho ({product.inventory} sản phẩm có sẵn)
            </div>
          )}
        </div>

        {/* TỔNG GIÁ */}
        <div className="md:w-[20%] w-full">
          <h1 className="text-red-500 font-bold text-[17px]">
            {formatCurrency(
              (product.price -
                (product.sale ? product.price * (product.sale / 100) : 0)) *
                (isEditing ? localQuantity : quantity)
            )}
          </h1>
        </div>

        {/* HÀNH ĐỘNG */}
        <div className="md:w-[5%] w-full flex md:justify-end justify-start">
          {!isEditing ? (
            <MdEdit
              className="text-[25px] text-secondary cursor-pointer hover:scale-110 transition duration-300"
              onClick={() => setIsEditing(true)}
              title="Chỉnh sửa"
            />
          ) : (
            <div className="flex flex-row md:flex-col items-center gap-2">
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
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}

export default ProductCart;
