import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedClient = null;

const updateOrderStatusToCancelledHandler = async (req, res) => {
  try {
    if (!cachedClient) {
      await client.connect();
      cachedClient = client;
    }

    const db = cachedClient.db('tvstore');
    const collection = db.collection('data');

    const userId = req.params.userId;
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: 'orderId không hợp lệ.' });
    }

    const document = await collection.findOne({});
    if (!document) {
      return res.status(404).json({ message: 'Không tìm thấy dữ liệu người dùng.' });
    }

    const userIndex = document.user.findIndex(user => String(user.id) === String(userId));
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng với ID này.' });
    }

    const orders = document.user[userIndex].order;
    const orderIndex = orders.findIndex(order => String(order.id) === String(orderId));
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng với ID này.' });
    }

    const order = orders[orderIndex];

    if (order.status === "cancelled") {
      return res.status(400).json({ message: 'Đơn hàng đã bị hủy trước đó.' });
    }

    // ✅ Cập nhật tồn kho
    if (Array.isArray(order.products)) {
      order.products.forEach(item => {
        const productIndex = document.product.findIndex(p => String(p.id) === String(item.idProduct));
        if (productIndex !== -1) {
          document.product[productIndex].inventory += item.quantity;
        }
      });
    }

    // ✅ Cập nhật trạng thái đơn hàng
    document.user[userIndex].order[orderIndex].status = "cancelled";

    // ✅ Ghi thay đổi vào MongoDB
    const result = await collection.updateOne(
      { _id: document._id },
      { $set: { user: document.user, product: document.product } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Không có thay đổi nào.' });
    }

    res.status(200).json({ message: 'Đã hủy đơn hàng và cập nhật tồn kho.', modifiedCount: result.modifiedCount,
      updatedProductList: document.product });
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi cập nhật trạng thái đơn hàng.' });
  }
};



export default updateOrderStatusToCancelledHandler;
