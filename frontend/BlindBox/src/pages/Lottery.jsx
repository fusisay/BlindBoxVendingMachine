import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../constants/axios.js";
import Header from "../layouts/Header.jsx";
import "./Lottery.css";
import Img from "../../public/砂金1.png"
import {useUserStore} from "../store/userStore.js";

export function Lottery() {
    const state = useUserStore((state) => state.userInfo);
    const navigate = useNavigate();
    const { blindBoxId } = useParams();
    const [blindBox, setBlindBox] = useState(null);
    const [prize, setPrize] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false); // 控制小窗口
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        async function fetchBlindBox() {
            try {
                const res = await axios.get(`/api/blindboxes/${blindBoxId}`);
                setBlindBox(res.data);
            } catch (e) {
                alert(`Failed to fetch blindbox: ${e}`);
            }
        }
        if (blindBoxId) fetchBlindBox();
    }, [blindBoxId]);

    const handleDraw = async () => {
        if (!blindBox?.products?.length ) return;
        if(state?.user?.balance < blindBox?.blindBoxPrice){
            alert("余额不足，请充值！")
            navigate('/recharge')
            return;
        }

        setLoading(true);

        const res = await axios.post('/api/user/update/balance', {id:state?.user?.id,balance:-blindBox?.blindBoxPrice})
        console.log(res)
        if (res.status === 200) {
            useUserStore.getState().setUserInfo({user:{balance:res.data.balance}})
        }

        setTimeout(async () => {
            const randomIndex = Math.floor(Math.random() * blindBox.products.length);
            const selectedPrize = blindBox.products[randomIndex];
            setPrize(selectedPrize);
            const response = await axios.post('/api/orders',{userId:state?.user?.id,productId:selectedPrize?.productId})
            if(response.status !== 200){
                alert("订单创建失败！")
            }
            setLoading(false);
            setShowModal(true); // 显示小窗口
    },2000)


    }


    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />

                    <div className="lottery-content">
                        <div className="left">
                            <img src={Img} alt="unloading"/>
                        </div>
                        <div className="right">
                            <h1 className="lottery-title">&gt;{blindBox?.blindBoxName} 抽奖</h1>
                            <div className="details" onClick={()=> {setShowDetail(true);}}>ⓘ抽取规则</div>
                        <p className="lottery-desc">{blindBox?.blindBoxDescription}</p>
                            <img src={blindBox?.blindBoxImgUrl} alt="unloading"/>
                        <p className="lottery-price">价格：¥{blindBox?.blindBoxPrice}</p>

                        <button
                            className="draw-button"
                            onClick={handleDraw}
                            disabled={loading}
                        >
                            {loading ? ("抽奖中···"):("点击抽奖")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
            {/*查看规则弹窗*/}
            {showDetail && (
                <div className="modal-overlay">
                <div className="modal">
                <h2>抽取规则</h2>
                <p>本抽盒机所抽得概率均等，所有解释权归创始人所有。</p>
                <button className="close-button" onClick={() => setShowDetail(false)}>
                    关闭
                </button>
                </div>
                </div>
                )}

    {/* 抽中奖品弹窗 */}
            {showModal && prize && (
                <div className="modal-overlay">
                    <div className="modal">
                        <img
                            src={prize.productImgUrl}
                            alt={prize.productName}
                            className="prize-img"
                        />
                        <h2>恭喜你抽中了！</h2>
                        <h3>{prize.productName}</h3>
                        <p>{prize.productDescription}</p>
                        <p className="prize-price">价值：¥{prize.productPrice}</p>
                        <button className="close-button" onClick={() => setShowModal(false)}>
                            关闭
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
