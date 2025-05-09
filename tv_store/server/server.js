import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors'; // ✅ Thêm dòng này
import handler from './api/data.js';
import changePasswordHandler from './api/changePassword.js';
import updateCartHandler from './api/updateCart.js';
import deleteCartHandler from './api/deleteCart.js';
import addToCartHandler from './api/addToCart.js';
import addOrderNowHandler from './api/addOderNow.js';
import updateOrderStatusToCancelledHandler from './api/deleteOrder.js';
import updateUserInfoHandler from './api/updateInfo.js';
import addUserHandler from './api/addUser.js';
const app = express();

app.use(cors()); // ✅ Thêm dòng này: Cho phép tất cả origin gọi API
app.use(express.json());

app.get('/api/db.json', handler);
app.put('/api/change-password/:userId', changePasswordHandler);
app.put('/api/updatecart/:userId', updateCartHandler);
app.delete('/api/deletecart/:userId', deleteCartHandler);
app.post('/api/addtocart/:userId', addToCartHandler);
app.post('/api/addordernow/:userId', addOrderNowHandler);
app.put('/api/deleteorder/:userId', updateOrderStatusToCancelledHandler);
app.put('/api/updateinfo/:userId', updateUserInfoHandler);
app.post('/api/adduser', addUserHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy ở cổng ${PORT}`);
});
