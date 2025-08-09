
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
import Posts from "./pages/Posts.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import SearchResult from "./pages/SearchResult.jsx";

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
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/:postId' element={<PostDetail />} />
            <Route path="/search" element={<SearchResult />} />
        </Routes>
    </div>
  )
}

export default App
