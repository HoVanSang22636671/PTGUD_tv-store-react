import { useState, useEffect } from "react";
import ProductAll from "./ProductAll";
import { useProduct } from "../../API/UseProvider";

const list = [
  { id: 1, name: "Tất cả đơn" },
  { id: 2, name: "Đang xử lý" },
  { id: 3, name: "Đang vận chuyển" },
  { id: 4, name: "Đã giao" },
  { id: 5, name: "Đã hủy" },
];

function OrderManagement() {
  const [filter, setFilter] = useState(1);  // Lọc theo trạng thái đơn hàng
  const { account } = useProduct(); // Lấy tài khoản từ provider
  const [filteredOrders, setFilteredOrders] = useState([]);  // Danh sách đơn hàng đã lọc

  useEffect(() => {
    if (account && account?.order) {
      // Lọc đơn hàng theo trạng thái
      const orders = account?.order.filter(order => {
        switch (filter) {
          case 1: // Tất cả đơn hàng
            return true;
          case 2: // Đang xử lý
            return order?.status === "processing";
          case 3: // Đang vận chuyển
            return order?.status === "shipping";
          case 4: // Đã giao
            return order?.status === "delivered";
          case 5: // Đã hủy
            return order?.status === "cancelled";
          default:
            return true;
        }
      });
      setFilteredOrders(orders);  // Cập nhật danh sách đơn hàng đã lọc
    }
  }, [account, filter]);
  // console.log(filteredOrders);  
  return (
    <div>
      <h1 className="text-[25px] text-center">Đơn hàng của tôi</h1>
      <div>
        <div className="flex justify-between p-4 bg-white rounded-md">
          {/* Render các lựa chọn trạng thái đơn hàng */}
          {list.map((item) => (
            <h1
              key={item.id}
              className={`cursor-pointer text-[18px] ${item.id === filter ? 'text-blue-600' : 'text-secondary'}`}
              onClick={() => setFilter(item.id)}  // Thay đổi trạng thái lọc khi nhấn vào
            >
              {item.name}
            </h1>
          ))}
        </div>
        {/* Hiển thị các component khác nhau dựa trên filter */}
        <div>
          {filter === 1 && <ProductAll orders={filteredOrders} />}  {/* Hiển thị tất cả đơn hàng */}
          {filter === 2 && <ProductAll orders={filteredOrders} />}
          {/* Hiển thị đơn đang xử lý */}
          {filter === 3 && <ProductAll orders={filteredOrders} />}
          {filter === 4 && <ProductAll orders={filteredOrders} />}
          {filter === 5 && <ProductAll orders={filteredOrders} />}  {/* Hiển thị đơn đã hủy */}
        </div>
      </div>
    </div>
  );
}

export default OrderManagement;
