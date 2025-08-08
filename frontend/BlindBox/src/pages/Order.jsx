import Header from "../layouts/Header.jsx";
import SideBar from "../layouts/SideBar.jsx";
import "../components/Background.css"
import "./Order.css"
import {useUserStore} from "../store/userStore.js";
import axios from "../constants/axios.js";
import { useState} from "react";


export default function Order() {
    const state = useUserStore((state) => state.userInfo);
    const [order, setOrder] = useState(null);
    const [fetched, setFetched] = useState(false); // ✅ 是否已经加载过
    const id = state.user.id;

    if (!fetched && id) {
        axios('/api/orders/get', { params: { id } })
            .then((res) => {
                setOrder(res.data);
                setFetched(true);  // ✅ 防止重复加载
            })
            .catch(console.error);
    }

    const pendingOrders = order?.filter(o => o.orderStatus === 'pending') || [];
    const shippedOrders = order?.filter(o => o.orderStatus === 'shipped') || [];
    const deliveredOrders = order?.filter(o => o.orderStatus === 'delivered') || [];







    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />
                    <main>
                        <div className="black_card">
                            <div className="white_card">
                                <SideBar/>

                                {order && (
                                    <div className="order-section-row">
                                        {/* Pending */}
                                        <section className="order-group">
                                            <h3>🕒 待处理</h3>
                                            {pendingOrders.map((o) => (
                                                <div key={o.orderId} className="order-card">
                                                    <img src={o.product.productImgUrl} alt={o.product.productName} />
                                                    <div className="order-info">
                                                        <h4>{o.product.productName}</h4>
                                                        <p>¥{o.product.productPrice} × {o.quantity}</p>
                                                    </div>
                                                    <button className="change_status" onClick={async () => {
                                                        const res = await axios.put(`/api/orders/${o.orderId}/status`,{status:"shipped"})
                                                        if (res.status === 200) {
                                                            console.log("状态修改成功！",res.data)
                                                        }
                                                    }}>点击发货</button>
                                                </div>
                                            ))}
                                        </section>

                                        {/* Shipped */}
                                        <section className="order-group">
                                            <h3>🚚 已发货</h3>
                                            {shippedOrders.map((o) => (
                                                <div key={o.orderId} className="order-card">
                                                    <img src={o.product.productImgUrl} alt={o.product.productName} />
                                                    <div className="order-info">
                                                        <h4>{o.product.productName}</h4>
                                                        <p>¥{o.product.productPrice} × {o.quantity}</p>
                                                    </div>
                                                    <button className="change_status" onClick={async () => {
                                                        const res = await axios.put(`/api/orders/${o.orderId}/status`,{status:"delivered"})
                                                        if (res.status === 200) {
                                                            console.log("状态修改成功！",res.data)
                                                        }
                                                    }}>确认收货</button>
                                                </div>
                                            ))}
                                        </section>

                                        {/* Delivered */}
                                        <section className="order-group">
                                            <h3>📦 已送达</h3>
                                            {deliveredOrders.map((o) => (
                                                <div key={o.orderId} className="order-card">
                                                    <img src={o.product.productImgUrl} alt={o.product.productName} />
                                                    <div className="order-info">
                                                        <h4>{o.product.productName}</h4>
                                                        <p>¥{o.product.productPrice} × {o.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </section>
                                    </div>
                                )}


                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}