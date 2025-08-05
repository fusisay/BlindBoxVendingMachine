import "../components/Background.css"
import Header from "../layouts/Header.jsx";
import "./Recharge.css"
import SideBar from "../layouts/SideBar.jsx";
import Currency from "../../public/筹码.png"
import {useUserStore} from "../store/userStore.js";
import axios from "../constants/axios.js";


export function Recharge() {
    const price = [6,30,68,128,328,648];
    const state = useUserStore((s) => s.userInfo);
    console.log(state);

    const recharge = async (p) => {
        const id = state?.user?.id;
        if (!id) {
            alert("用户信息未加载，无法充值！");
            return;
        }
        try {
            const res = await axios.post("/api/user/update/balance", {id: id, balance: p});
            if (res.data.success) {
                useUserStore.getState().setUserInfo({user: {balance: res.data.balance}})
                alert("充值成功！")
            }
        } catch (error) {
            console.error(error?.response?.data || error);
            alert(error?.response?.data?.message || "充值失败");
        }
    }

    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />
                    <main>
                        <div className="black_card">
                            <div className="white_card">
                                <SideBar/>
                                <div className="recharge-grid">
                                    {price.map((p, index) => (
                                        <div key={index} className="recharge-card" onClick={() => recharge(p)}>
                                            <img src={Currency} className="currency"/>
                                            <div className="amount">¥{p}</div>
                                            <div className="label">点击充值</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}