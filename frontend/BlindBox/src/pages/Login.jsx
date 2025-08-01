import "../components/Background.css"
import Header from "../layouts/Header.jsx"
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Login.css"
import GIF from "../assets/登录.gif"
import axios from "../constants/axios.js";
import { useUserStore } from "../store/userStore.js";

export default function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const setUserInfo = useUserStore((state) => state.setUserInfo);

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/user/login', { username, password });
        if (res.data.success) {
            console.log(res.data.data);
            setUserInfo(res.data.data);// 保存到全局
            useUserStore.getState().setUserInfo({avatar:1});
            console.log(useUserStore.getState().userInfo)
            alert('登陆成功！');
            navigate('/'); // 登录后跳转主页
        } else {
            alert('登录失败：' + res.data.message);
        }


    }





    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />
                    <main className="content">
                    <form className="login" onSubmit={handleLogin}>
                        <h2 className="login_title">朋友，欢迎回来!</h2>
                        <div className="gif">
                            <img src={GIF} alt="login" />
                        </div>
                        <div className="row">
                        <label>用户名：</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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

