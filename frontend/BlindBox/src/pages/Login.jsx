import "../components/Background.css"
import Header from "../layouts/Header.jsx"
import {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Login.css"
import GIF from "../assets/登录.gif"

export default function Login() {
    const [user,setUser] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();


        setTimeout(()=> navigate("/home"));
    }





    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />
                    <main className="content">
                    <form className="login" onSubmit={handleSubmit}>
                        <h2 className="login_title">朋友，欢迎回来!</h2>
                        <div className="gif">
                            <img src={GIF} alt="login" />
                        </div>
                        <div className="row">
                        <label>用户名：</label>
                        <input
                            type="text"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            placeholder="请输入用户名"
                            required
                        />
                        </div>
                        <div className="row">
                        <label>密码：</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="请输入密码"
                            required
                        />
                        </div>
                        <button type="submit">
                            登录
                        </button>
                        <Link to="/register" className="toregister">还没有账号？注册一个</Link>
                    </form>
                   </main>
                </div>
            </div>
        </div>
    )
}

