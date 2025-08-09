import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import "./Header.css";
import titleLogo from "../../public/小砂金.png";
import "tailwindcss";
import Search from "../../public/search.svg";
import Currency from "../../public/筹码.png";
import Add from "../../public/加号.svg";
import {useUserStore} from "../store/userStore.js";
import {Avatars} from "../constants/avatar.js";

export default function Header() {
    const state = useUserStore((state) => state.userInfo);
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        if (!keyword.trim()) return;
        navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    };

    return (
        <header className="header">
            <div className="title">
                <div className="title-logo">
                    <img src={titleLogo} alt="logo" />
                </div>
                <div className="title-text">我来下注！</div>
            </div>
            <div className="a-list">
                <Link to="/home" className="link">首页</Link>
                <Link to="/product" className="link">商品</Link>
                <Link to="/posts" className="link">玩家秀</Link>
            </div>
            <div className="search-box">
                <input
                    className="search-text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="搜索盲盒..."
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <img
                    src={Search}
                    alt="search"
                    className="search-icon"
                    onClick={handleSearch}
                    style={{cursor: "pointer"}}
                />
            </div>
            { state ? (
                <div className="user">
                    <div className="user-avatar">
                        <img src={Avatars[state.user.avatar]} alt="user-avatar" />
                    </div>
                    <Link to="/self" className="link">{state.user.name}</Link>
                    <div className="account">
                        <div className="account-icon">
                            <img src={Currency} alt="account-icon" />
                        </div>
                        <div className="account-text">余额：{state.user.balance}</div>
                        <div className="account-icon">
                            <Link to="/recharge"><img src={Add} alt="add-icon" /></Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="not-login">
                    <Link to="/login" className="link">登录</Link>
                    <Link to="/register" className="link">注册</Link>
                </div>
            )}
        </header>
    )
}
