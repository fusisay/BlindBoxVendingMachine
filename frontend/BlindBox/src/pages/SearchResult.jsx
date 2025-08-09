import Header from "../layouts/Header.jsx";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useState} from "react";
import axios from "../constants/axios.js";
import "./SearchResult.css"
import "./Product.css"


export default  function SearchResult() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const [result, setResult] = useState([]);
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/lottery/${id}`);
    };

    useEffect(() => {
        if (keyword) {
            axios.get("/api/blindboxes/search", { params: { keyword } })
                .then(res => setResult(res.data))
                .catch(err => console.error("搜索失败", err));
        }
    }, [keyword]);
console.log(result);

    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />
                    <div className="main">
                        <h2 className="search_res">搜索结果：{keyword}</h2>
                        <div className="contents" style={{ marginTop: 20 }}>
                            {!result ? (
                                <p>加载盲盒中...</p>
                            ) : (
                                result.map((box) => (
                                    <div key={box.blindBoxId} className="blindbox-card" onClick={() => handleClick(box.blindBoxId)}>
                                        <button className="draw">点击抽盒</button>
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}