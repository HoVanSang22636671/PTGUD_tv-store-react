import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from "./components/Footer"
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MainPage from './pages/MainPage'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Admin from './pages/AdminPages/Admin'
import Dashboard from './components/AdminComponents/Dashboard'
import ProductManagement from './components/AdminComponents/ProductManagement'
import OrderManagement from './components/AdminComponents/OrderManagement'
import CustomerManagement from './components/AdminComponents/CustomerManagement'


function App() {
  return (
    <>

      <Routes>
        {/* Các route sử dụng MainPage làm layout */}
        <Route path="/" element={<MainPage />}>
          <Route index element={<HomePage />} />
          <Route path='/search' element={<SearchPage />} />
          {/* các route khác nằm trong layout MainPage */}
        </Route>

        {/* Route không dùng MainPage */}
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} /> {/* Dashboard mặc định */}
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
        </Route>
        {/* Route không tìm thấy */}
      </Routes >


    </>
  )
}

export default App
