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

const deleteCartHandler = async (req, res) => {
  try {
    if (!cachedClient) {
      await client.connect();
      cachedClient = client;
    }

    const db = cachedClient.db('tvstore');
    const collection = db.collection('data');

    const userId = req.params.userId;
    const { idProduct } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!idProduct) {
      return res.status(400).json({ message: 'idProduct không hợp lệ.' });
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

    const cart = document.user[userIndex].cart;

    // Tìm sản phẩm trong giỏ hàng
    const productIndex = cart.findIndex(item => item.idProduct === idProduct);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng.' });
    }

    // Xóa sản phẩm khỏi giỏ hàng
    document.user[userIndex].cart.splice(productIndex, 1);

    // Cập nhật giỏ hàng trong MongoDB
    const result = await collection.updateOne(
      { _id: document._id },
      { $set: { user: document.user } }
    );

    // Kiểm tra kết quả cập nhật
    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Không có thay đổi nào.' });
    }

    res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng.', modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('Lỗi xóa sản phẩm khỏi giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm khỏi giỏ hàng.' });
  }
};

export default deleteCartHandler;
