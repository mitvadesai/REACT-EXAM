import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'
import Footer from './components/Footer'
import Login from './components/login'
import Register from './components/register'
import ViewProduct from './components/ViewProduct'
import Addtocart from './components/Addtocart'

function App() {

  return (
    <>
    <Header />
      <Routes>
      <Route path='/signup' element={<Register />} />
      <Route path='/signin' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/edit/:id' element={<EditProduct />} />
        <Route path='/view/:id' element={<ViewProduct />} />
        <Route path='/cart/:id' element={<Addtocart />} />
        <Route path='/cart' element={<Addtocart />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
