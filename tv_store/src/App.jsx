import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Banner from './components/Banner'
import FilterBar from './components/FillterBar'
import Footer from './components/Footer'
function App() {
  return (
    <div>
      <Header />
      <div className="mt-3 max-w-screen-lg mx-auto min-h-[900px]">
        <Banner />
        <FilterBar />
      </div>
      <Footer />
    </div>
  )
}

export default App
