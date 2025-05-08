import { useNavigate } from "react-router-dom";
import formatCurrency from "../../calculator/FormatCurrency";
import { useProduct } from "../../API/UseProvider";

const statusMap = {
  processing: "Đang xử lý",
  shipping: "Đang giao hàng",
  delivered: "Đã giao",
  cancelled: "Đã hủy",
};

function ProductAll({ orders }) {
  const { product } = useProduct();
  const navigate = useNavigate();

  const sortedOrders = orders?.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="grid grid-cols-1 gap-4">
      {sortedOrders && product &&
        sortedOrders.map((order) => {
          const orderProducts = order.products?.map((item) => {
            return {
              ...product.find((prod) => prod.id === item.idProduct),
              quantity: item.quantity,
            };
          });

          // ✅ Tính tổng tiền sau giảm giá
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

              {/* ✅ Tổng tiền đơn hàng */}
              <div className="text-right font-semibold text-blue-600 text-lg mb-4">
                Tổng tiền: {formatCurrency(total)}
              </div>

              <div className="flex justify-end">
                {(order.status === 'processing' || order.status === 'shipping') && (
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
    </div>
  );
}

export default ProductAll;
