import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from "./components/Footer"
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MainPage from './pages/MainPage'
import ProductDetail from './pages/ProductDeTail'
import Login from './pages/Login'
import AccountPage from './pages/AccountPage'
import CartPage from './pages/CartPage'
import PaymentNowPage from './pages/PaymentNowPage'
import PaymentCartPage from './pages/PaymentCartPage'
import PaymentSuccess from './pages/PaymentSuccess'
import SupportPage from './pages/SupportPage'
import Admin from './pages/AdminPages/Admin'
import ChangeShippingInfo from './components/cart/ChangeShippingInfo'
function App() {
  return (
    <>

      <Routes>
        {/* Các route sử dụng MainPage làm layout */}
        <Route path="/" element={<MainPage />}>
          <Route index element={<HomePage />} />
          <Route path='/account' element={<AccountPage/>}/>
          {/* các route khác nằm trong layout MainPage */}
          <Route path="/cart" element={<CartPage />} />
          <Route path='/paymentnow/:id/:num' element={<PaymentNowPage/>}/>
          <Route path="/paymentcartpay" element={<PaymentCartPage />} />
          <Route path='/search' element={<SearchPage />} />
        </Route>

        {/* Route không dùng MainPage */}
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        {/* Route không tìm thấy */}
        <Route path="/instantShipping" element={<ChangeShippingInfo />} />
        <Route path="/supportPage" element={<SupportPage />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>


    </>
  )
}

export default App
