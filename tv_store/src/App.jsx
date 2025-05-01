import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

import ProductDeTail from './pages/ProductDeTail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ProductDeTail/>
    </div>
  )
}

export default App
