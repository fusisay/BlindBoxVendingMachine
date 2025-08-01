
// import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {

  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </Routes>
    </div>
  )
}

export default App
