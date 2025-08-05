import "./SideBar.css"
import {useNavigate} from "react-router-dom";

export default function SideBar() {
    const navigate = useNavigate();

    return (
        <div className="SideBar">

            <button className="parallelogram-button" onClick={() => {navigate('/self');}}>
                <span className="button-text">个人信息</span>
            </button>

            <button className="parallelogram-button">
                <span className="button-text">我的盲盒</span>
            </button>

            <button className="parallelogram-button" onClick={() => { navigate('/recharge');}}>
                <span className="button-text" >进行充值</span>
            </button>



        </div>
    )
}