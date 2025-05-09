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

const updateUserInfoHandler = async (req, res) => {
  try {
    if (!cachedClient) {
      await client.connect();
      cachedClient = client;
    }

    const db = cachedClient.db('tvstore');
    const collection = db.collection('data');

    const userId = req.params.userId;
    const { fullName, address, phone, email } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!fullName || !address || !phone || !email) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    // Tìm document chứa mảng user
    const document = await collection.findOne({});
    if (!document) {
      return res.status(404).json({ message: 'Không tìm thấy dữ liệu.' });
    }

    // Tìm người dùng theo userId
    const userIndex = document.user.findIndex(user => String(user.id) === String(userId));
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng với ID này.' });
    }

    // Cập nhật thông tin người dùng
    document.user[userIndex].fullName = fullName;
    document.user[userIndex].address = address;
    document.user[userIndex].phone = phone;
    document.user[userIndex].email = email;

    // Cập nhật lại dữ liệu trong MongoDB
    const result = await collection.updateOne(
      { _id: document._id },
      { $set: { user: document.user } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: 'Không có thay đổi nào.' });
    }

    res.status(200).json({ message: 'Cập nhật thông tin thành công.', modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error('Lỗi cập nhật thông tin người dùng:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

export default updateUserInfoHandler;
