
// import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {Self} from "./pages/Self.jsx";
import {Recharge} from "./pages/Recharge.jsx";
import Product from "./pages/Product.jsx";
import Order from "./pages/Order.jsx";
import {Lottery} from "./pages/Lottery.jsx";

function App() {

  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/self' element={<Self />} />
            <Route path='/recharge' element={<Recharge />} />
            <Route path='/product' element={<Product />} />
            <Route path='/order' element={<Order />} />
            <Route path="/lottery/:blindBoxId" element={<Lottery />} />
        </Routes>
    </div>
  )
}

export default App
