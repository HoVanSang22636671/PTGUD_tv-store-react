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

const addOrderNowHandler = async (req, res) => {
  try {
    if (!cachedClient) {
      await client.connect();
      cachedClient = client;
    }

    const db = cachedClient.db('tvstore');
    const collection = db.collection('data');

    const userId = req.params.userId;
    const { date, status, products } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!date || !status || !products || products.length === 0) {
      return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ.' });
    }

    // Kiểm tra từng sản phẩm trong mảng
    for (const product of products) {
      const { idProduct, quantity } = product;
      if (!idProduct || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Dữ liệu sản phẩm không hợp lệ.' });
      }
    }

    // Tìm tài liệu chứa người dùng
    const document = await collection.findOne({});
    if (!document) {
      return res.status(404).json({ message: 'Không tìm thấy dữ liệu người dùng.' });
    }

    // Tìm người dùng theo ID
    const userIndex = document.user.findIndex(user => String(user.id) === String(userId));
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng với ID này.' });
    }

    const orders = document.user[userIndex].order || [];

    const maxId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) : 0;

    // Tạo đơn hàng mới với trạng thái đơn hàng và nhiều sản phẩm
    const newOrder = {
      id: maxId + 1,
      date,      // Ngày tạo đơn hàng
      status,    // Trạng thái của đơn hàng
      products,  // Lưu toàn bộ sản phẩm
    };

    // Thêm đơn hàng mới vào mảng order
    orders.push(newOrder);
    document.user[userIndex].order = orders;

    // Cập nhật lại trong MongoDB
    const result = await collection.updateOne(
      { _id: document._id },
      { $set: { user: document.user } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Không có thay đổi nào.' });
    }

    res.status(200).json({
      success: true,
      message: 'Đơn hàng đã được thêm thành công.',
      order: newOrder
    });
  } catch (error) {
    console.error('Lỗi thêm đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi thêm đơn hàng.' });
  }
};

export default addOrderNowHandler;
