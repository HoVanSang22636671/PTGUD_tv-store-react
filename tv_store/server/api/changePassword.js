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

const changePasswordHandler = async (req, res) => {
  try {
    if (!cachedClient) {
      await client.connect();
      cachedClient = client;
    }

    const db = cachedClient.db('tvstore');
    const collection = db.collection('data');

    const userId = req.params.userId;
    const { newPassword } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!newPassword || newPassword.trim() === '') {
      return res.status(400).json({ message: 'Mật khẩu mới không được để trống.' });
    }

    // Lấy document chứa mảng user
    const document = await collection.findOne({});

    if (!document) {
      return res.status(404).json({ message: 'Không tìm thấy dữ liệu.' });
    }

    // Tìm người dùng trong mảng user
    const userIndex = document.user.findIndex(user => String(user.id) === String(userId));

    if (userIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng với ID này.' });
    }

    // Cập nhật mật khẩu của người dùng trong mảng user
    document.user[userIndex].password = newPassword;

    // Lưu lại thay đổi vào MongoDB
    const result = await collection.updateOne(
      { _id: document._id },
      { $set: { user: document.user } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Không có thay đổi nào.' });
    }

    res.status(200).json({ message: 'Đổi mật khẩu thành công.', modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('Lỗi đổi mật khẩu:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

export default changePasswordHandler;
