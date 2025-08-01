import "../components/Background.css"
import Header from "../layouts/Header.jsx";
import {useUserStore} from "../store/userStore.js";
import {useNavigate} from "react-router-dom";


export function Self() {
    const state = useUserStore.getState().userInfo;
    const navigate = useNavigate();

    function quit () {
        useUserStore.getState().clearUserInfo();
        alert("您已登出");
        navigate("/login");
    }
    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />
                    <div className="card">
                        <button onClick={quit}>退出</button>
                    </div>
                </div>
            </div>
        </div>
    )
}