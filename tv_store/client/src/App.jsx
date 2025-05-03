import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from "./components/Footer"
import HomePage from './pages/HomePage'
import MainPage from './pages/MainPage'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
function App() {
  return (
    <>

      <Routes>
        {/* Các route sử dụng MainPage làm layout */}
        <Route path="/" element={<MainPage />}>
          <Route index element={<HomePage />} />
          {/* các route khác nằm trong layout MainPage */}
        </Route>

        {/* Route không dùng MainPage */}
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />

        {/* Route không tìm thấy */}
      </Routes>


    </>
  )
}

export default App
