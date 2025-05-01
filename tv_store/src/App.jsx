import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from "./components/Footer"
import Login from './components/Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    {/*  */}
    <Header/>
    <Footer/>
    {/* <Login/> */}
    </>
  )
}


export default App
