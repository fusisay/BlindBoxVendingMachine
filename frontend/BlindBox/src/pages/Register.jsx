import "../components/Background.css"
import Header from "../layouts/Header.jsx"
import {useState} from "react";
import "./Register.css"
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [ck_password, setCK_password] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // 阻止默认提交行为
        setError("");
        setSuccess("");

        if (password !== ck_password) {
            setError("两次输入的密码不一致，请重新确认！");
            return;
        }

        // 你可以在这里加上进一步的校验逻辑，比如是否手机号合法、用户名是否重复等
        setSuccess("注册成功！");
        // 后续可以添加发送注册请求的逻辑

        setTimeout(navigate("/login"), 2000);
    };


    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />
                    <main className="main">
                        <form className="register" onSubmit={handleSubmit}>
                            <h2 className="reg_title">朋友，欢迎加入！</h2>

                            {error && <p className="error">{error}</p>}
                            {success && <p className="success">{success}</p>}


                            <div className="row">
                                <label>用户名：</label>
                                <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="想一个酷炫的名字吧"
                                required
                                />
                            </div>

                            <div className="row">
                                <label>手机号： </label>
                                <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="请输入你的手机号"
                                required
                                pattern="^1[3-9]\d{9}$"
                                />
                            </div>

                            <div className="row">
                                <label>地址：</label>
                                <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="这是邮寄的终点哦"
                                required
                                />
                            </div>

                            <div className="row">
                                <label>创建密码：</label>
                                <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="想一个好记又不简单的密码"
                                required
                                />
                            </div>

                            <div className="row">
                                <label>确认密码：</label>
                                <input
                                type="password"
                                value={ck_password}
                                onChange={(e) => setCK_password(e.target.value)}
                                placeholder="确认你的密码"
                                required
                                />
                            </div>

                            <button type="submit">注册</button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
}