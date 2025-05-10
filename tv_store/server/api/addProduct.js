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

const addOrUpdateProductHandler = async (req, res) => {
  try {
    if (!cachedClient) {
      await client.connect();
      cachedClient = client;
    }

    const db = cachedClient.db('tvstore');
    const collection = db.collection('data');

    const { id, name, price, inventory, sale, thuongHieu } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || price == null || inventory == null || sale == null || !thuongHieu) {
      return res.status(400).json({ message: 'Tất cả các trường là bắt buộc.' });
    }

    // Lấy document chứa mảng product
    const document = await collection.findOne({});
    if (!document || !document.product || document.product.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật.' });
    }

    // Nếu có id -> cập nhật sản phẩm
    if (id != null) {
      const existingProductIndex = document.product?.findIndex(p => p.id === id);

      if (existingProductIndex === -1 || existingProductIndex === undefined) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm để cập nhật.' });
      }

      // Tạo đối tượng cập nhật động
      const updatedProduct = {
        ...(name && { name }),
        ...(price != null && { price }),
        ...(inventory != null && { inventory }),
        ...(sale != null && { sale }),
        ...(thuongHieu && { thuongHieu }),
      };

      // Cập nhật tài liệu MongoDB với các trường được chỉ định
      const updateQuery = {};
      updateQuery[`product.${existingProductIndex}`] = { ...document.product[existingProductIndex], ...updatedProduct };

      const result = await collection.updateOne({}, { $set: updateQuery });

      if (result.modifiedCount === 0) {
        return res.status(500).json({ message: 'Không thể cập nhật sản phẩm.' });
      }

      return res.status(200).json({
        success: true,
        message: 'Cập nhật sản phẩm thành công.',
        product: { ...document.product[existingProductIndex], ...updatedProduct },
      });
    } else {
      // Nếu không có id -> thêm mới
      const newProductId = (document.product && document.product.length > 0)
        ? document.product[document.product.length - 1].id + 1
        : 1;

      const newProduct = {
        id: newProductId,
        name,
        price,
        inventory,
        sale,
        thuongHieu,
      };

      const result = await collection.updateOne({}, { $push: { product: newProduct } });

      if (result.modifiedCount === 0) {
        return res.status(500).json({ message: 'Không thể thêm sản phẩm.' });
      }

      return res.status(201).json({
        success: true,
        message: 'Thêm sản phẩm thành công.',
        product: newProduct,
      });
    }
  } catch (error) {
    console.error('Lỗi xử lý sản phẩm:', error);
    res.status(500).json({ success: false, message: `Lỗi server: ${error.message}` });
  }
};

export default addOrUpdateProductHandler;





