import {Link} from "react-router-dom";
import "./header.css";
import titleLogo from "../../public/小砂金.png";
import "tailwindcss";
import Search from "../../public/search.svg"
import Currency from "../../public/筹码.png"
import Add from "../../public/加号.svg"

export default function Header() {
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
                <Link to="/products" className="link">商品</Link>
                <Link to="/comments" className="link">玩家秀</Link>
            </div>
            <div className="search-box">
                <input className="search-text"/>
                <img src={Search} alt="search" className="search-icon" />
            </div>
            <div className="user">
                <div className="user-avatar">
                    <img src={titleLogo} alt="user-avatar" />
                </div>
                <Link to="/user" className="link">我的gergrgr</Link>
                <div className="account">
                    <div className="account-icon">
                        <img src={Currency} alt="account-icon" />
                    </div>
                    <div className="account-text">余额：111111111</div>
                    <div className="account-icon">
                        <Link to="/recharge"><img src={Add} alt="add-icon"  /></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}