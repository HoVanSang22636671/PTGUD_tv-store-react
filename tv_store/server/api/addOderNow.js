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

    if (!date || !status || !products || products.length === 0) {
      return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ.' });
    }

    for (const product of products) {
      const { idProduct, quantity } = product;
      if (!idProduct || !quantity || quantity <= 0) {
        return res.status(400).json({ message: 'Dữ liệu sản phẩm không hợp lệ.' });
      }
    }

    const document = await collection.findOne({});
    if (!document) {
      return res.status(404).json({ message: 'Không tìm thấy dữ liệu người dùng.' });
    }

    const userIndex = document.user.findIndex(user => String(user.id) === String(userId));
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng với ID này.' });
    }

    const orders = document.user[userIndex].order || [];
    const maxId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) : 0;

    const newOrder = {
      id: maxId + 1,
      date,
      status,
      products,
    };

    // Giảm số lượng tồn kho của từng sản phẩm
    for (const product of products) {
      const { idProduct, quantity } = product;
      const productIndex = document.product.findIndex(p => String(p.id) === String(idProduct));
      if (productIndex === -1) {
        return res.status(404).json({ message: `Không tìm thấy sản phẩm với ID ${idProduct}.` });
      }

      const inventory = document.product[productIndex].inventory;

      if (inventory < quantity) {
        return res.status(400).json({ message: `Sản phẩm ID ${idProduct} không đủ hàng tồn kho.` });
      }

      document.product[productIndex].inventory -= quantity;
    }

    // Thêm đơn hàng vào người dùng
    orders.push(newOrder);
    document.user[userIndex].order = orders;

    const result = await collection.updateOne(
      { _id: document._id },
      {
        $set: {
          user: document.user,
          product: document.product, // cập nhật tồn kho
        }
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Không có thay đổi nào.' });
    }

    res.status(200).json({
      success: true,
      message: 'Đơn hàng đã được thêm và tồn kho đã được cập nhật.',
      order: newOrder,
      updatedProductList: document.product
    });

  } catch (error) {
    console.error('Lỗi thêm đơn hàng:', error);
    res.status(500).json({ message: 'Lỗi server khi thêm đơn hàng.' });
  }
};

export default addOrderNowHandler;
