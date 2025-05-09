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

const addUserHandler = async (req, res) => {
  try {
    if (!cachedClient) {
      await client.connect();
      cachedClient = client;
    }

    const db = cachedClient.db('tvstore');
    const collection = db.collection('data');

    const { userName, password, email } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!userName || !password || !email) {
      return res.status(400).json({ message: 'Tất cả các trường là bắt buộc.' });
    }

    // Lấy document chứa mảng user
    const document = await collection.findOne({});

    if (!document) {
      return res.status(404).json({ message: 'Không tìm thấy dữ liệu.' });
    }

    // Tính toán ID mới dựa trên ID lớn nhất trong mảng user
    const lastUserId = document.user.length > 0 ? document.user[document.user.length - 1].id : 0;
    const newUserId = lastUserId + 1; // ID kế tiếp

    // Tạo người dùng mới
    const newUser = {
      id: newUserId, // ID kế tiếp
      userName,
      password, // Lưu mật khẩu trực tiếp mà không mã hóa
      email,
      cart: [],
      order: [],
    };

    // Thêm người dùng vào mảng user
    const result = await collection.updateOne(
      {},
      { $push: { user: newUser } }
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: 'Không thể thêm người dùng.' });
    }

    // Trả về success cùng thông tin người dùng vừa được thêm
    res.status(201).json({
      success: true,
      message: 'Thêm người dùng thành công.',
      user: newUser,
    });
  } catch (error) {
    console.error('Lỗi thêm người dùng:', error);
    res.status(500).json({ success: false, message: 'Lỗi server.' });
  }
};

export default addUserHandler;
