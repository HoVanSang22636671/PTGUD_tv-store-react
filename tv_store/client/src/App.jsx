import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from "./components/Footer"
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MainPage from './pages/MainPage'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Admin from './pages/Amin'
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

        <Route path='/admin' element={<Admin />} />

        {/* Route không tìm thấy */}
      </Routes>


    </>
  )
}

export default App
