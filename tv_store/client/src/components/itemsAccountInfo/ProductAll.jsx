import { useNavigate } from "react-router-dom";
import formatCurrency from "../../calculator/FormatCurrency";
import { useProduct } from "../../API/UseProvider";
import ConfirmDialog from "../../message/ConfirmDialog";
import { useState } from "react";

const statusMap = {
  processing: "Đang xử lý",
  shipping: "Đang giao hàng",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

function ProductAll({ orders }) {
  const { product, deleteOrder, account } = useProduct();
  const navigate = useNavigate();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  const sortedOrders = orders?.sort((a, b) => new Date(b.date) - new Date(a.date));

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders?.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil((sortedOrders?.length || 0) / ordersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedOrder) {
      await deleteOrder(account?.id, selectedOrder?.id);
      setShowConfirmDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {showConfirmDialog && (
        <ConfirmDialog
          message="Bạn chắc chắn muốn xóa đơn hàng này?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {currentOrders && product &&
        currentOrders.map((order) => {
          const orderProducts = order.products?.map((item) => {
            return {
              ...product.find((prod) => prod.id === item.idProduct),
              quantity: item.quantity,
            };
          });

          const total = orderProducts?.reduce((acc, prod) => {
            if (!prod) return acc;
            const priceAfterSale = prod.price * (1 - (prod.sale || 0) / 100);
            return acc + priceAfterSale * prod.quantity;
          }, 0);

          return (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  Trạng thái: {statusMap[order.status] || order.status}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {orderProducts?.map((prod) => {
                  if (!prod) return null;
                  const priceAfterSale = prod.price * (1 - (prod.sale || 0) / 100);

                  return (
                    <div key={prod.id} className="flex justify-between items-center mb-4">
                      <div
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => navigate(`/productDetail/${prod.id}`)}
                      >
                        <img
                          src={prod?.img?.[0]?.img || "default-image.jpg"}
                          alt={prod.name}
                          className="w-[80px] h-[80px] object-cover rounded-md"
                        />
                        <div>
                          <h1 className="text-xl font-semibold text-gray-800">{prod.name}</h1>
                          <div>SL: {prod.quantity}</div>
                          <div className="text-sm text-gray-500">
                            Giá gốc: <span className="line-through">{formatCurrency(prod.price)}</span>
                          </div>
                          <div className="text-sm text-green-600">
                            Giảm: {prod.sale || 0}% → {formatCurrency(priceAfterSale)}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(priceAfterSale * prod.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-gray-600 mb-2">
                <span className="font-medium">Ngày đặt hàng:</span> {order.date.split("T")[0]}
              </div>

              <div className="text-right font-semibold text-blue-600 text-lg mb-4">
                Tổng tiền: {formatCurrency(total)}
              </div>

              <div className="flex justify-end">
                {(order.status === "processing" || order.status === "shipping") && (
                  <div
                    className="w-[150px] cursor-pointer text-[18px] rounded-lg text-center py-3 border-2 border-red-500 text-red-500"
                    onClick={() => handleCancelOrder(order)}
                  >
                    Hủy đơn
                  </div>
                )}
              </div>
            </div>
          );
        })}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 rounded border ${
                currentPage === number ? "bg-blue-500 text-white" : "bg-white text-blue-500"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductAll;
