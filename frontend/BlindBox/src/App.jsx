
// import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home';

function App() {

  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
        </Routes>
    </div>
  )
}

export default App
