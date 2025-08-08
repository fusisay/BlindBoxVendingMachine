import "../components/Background.css";
import "./Product.css";
import Header from "../layouts/Header.jsx";
import { useUserStore } from "../store/userStore.js";
import { useEffect, useState } from "react";
import axios from "../constants/axios.js";
import {useNavigate} from "react-router-dom";

export default function Product() {
    const navigate = useNavigate();

    const [blindBoxes, setBlindBoxes] = useState(null);

    const handleClick = (id) => {
        navigate(`/lottery/${id}`);
    };

    useEffect(() => {
        const fetchBlindBoxes = async () => {
            try {
                const res = await axios.get("/api/blindboxes");
                setBlindBoxes(res.data);
            } catch (error) {
                console.error("获取盲盒失败:", error);
            }
        };
        fetchBlindBoxes();
    }, []);

    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />
                    <main style={{ marginTop: 20 }}>
                        {!blindBoxes ? (
                            <p>加载盲盒中...</p>
                        ) : (
                            blindBoxes.map((box) => (
                                <div key={box.blindBoxId} className="blindbox-card" onClick={() => handleClick(box.blindBoxId)}>
                                    <img
                                        src={box.blindBoxImgUrl}
                                        alt={box.blindBoxName}
                                        className="blindbox-img"
                                    />
                                    <div className="blindbox-info">
                                        <h2>{box.blindBoxName}</h2>
                                        <p>{box.blindBoxDescription}</p>
                                        <p>价格：¥{box.blindBoxPrice}</p>

                                        <div className="products-list">
                                            <h4>包含商品：</h4>
                                            {box.products.length ? (
                                                box.products.map((prod) => (
                                                    <div key={prod.productId} className="product-card">
                                                        <img
                                                            src={prod.productImgUrl}
                                                            alt={prod.productName}
                                                            className="product-img"
                                                        />
                                                        <div className="product-info">
                                                            <p>{prod.productName}</p>
                                                            <p>价格：¥{prod.productPrice}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>暂无商品</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
