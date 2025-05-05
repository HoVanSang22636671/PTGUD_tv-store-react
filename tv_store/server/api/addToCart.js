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

const addToCartHandler = async (req, res) => {
  try {
    if (!cachedClient) {
      await client.connect();
      cachedClient = client;
    }

    const db = cachedClient.db('tvstore');
    const collection = db.collection('data');

    const userId = req.params.userId;
    const { idProduct, quantity } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!idProduct || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ.' });
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

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingItem = cart.find(item => item.idProduct === idProduct);
    if (existingItem) {
      existingItem.quantity = quantity;
    } else {
        const maxId = cart.length > 0 ? Math.max(...cart.map(item => item.id)) : 0;

        const newItem = {
          id: maxId + 1,
          idProduct,
          quantity,
        };
      cart.push(newItem);
    }

    // Cập nhật giỏ hàng trong MongoDB
    const result = await collection.updateOne(
      { _id: document._id },
      { $set: { user: document.user } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Không có thay đổi nào.' });
    }

    res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng.', modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('Lỗi thêm sản phẩm vào giỏ hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi thêm sản phẩm vào giỏ hàng.' });
  }
};

export default addToCartHandler;
