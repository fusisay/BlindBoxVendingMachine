import "../components/Background.css"
import Header from "../layouts/Header.jsx";
import {useUserStore} from "../store/userStore.js";
import {useNavigate} from "react-router-dom";
import "./Self.css"
import SideBar from "../layouts/SideBar.jsx";
import {Avatars} from "../constants/avatar.js";
import {useState} from "react";
import axios from "../constants/axios.js";


export function Self() {
    const state = useUserStore((s) => s.userInfo); // ✅ 会响应式刷新
    const navigate = useNavigate();
    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState("");
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
    }

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("请填写所有字段");
            return;
        }

        if(oldPassword !== state.user.password) {
            alert("旧密码输入错误！");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("新密码与确认密码不一致");
            return;
        }

        const id = state.user.id;
        console.log(id);
        console.log(newPassword);
        try {
            const res = await axios.post('/api/user/update/password',{id:id,password:newPassword})
            if(res.data.success){
                console.log(res.data);
                useUserStore.getState().setUserInfo({user:{password: tempValue}});
                alert("修改密码成功！")
            }

        } catch (error) {
            console.error(error?.response?.data || error);
            alert(error?.response?.data?.message || "修改失败");
        }
        setEditingField(null);
        console.log(state);


    };


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
                    <main>
                    <div className="black_card">
                        <div className="white_card">
                            <SideBar/>
                            <div className="top_half">

                                <div className="avatar">
                                    <div className="avatar_icon">
                                        <img src={Avatars[state.user.avatar]} alt="logo" />
                                    </div>
                                    <p>点击下方图片更换头像!</p>
                                </div>

                                <form className="info" onSubmit={handleSubmit}>

                                    <div className="row">
                                        <label>用户名：{state.user.name}</label>
                                        {editingField === "name" ? (
                                            <>
                                                <input
                                                    value={tempValue}
                                                    onChange={(e) => setTempValue(e.target.value)}
                                                />
                                                <button
                                                    className="save"
                                                    onClick={async () =>  {
                                                        const id = state.user.id;
                                                        console.log(id);
                                                        try {
                                                            const res = await axios.post('/api/user/update/name',{id:id,name:tempValue})
                                                            if(res.data.success){
                                                                console.log(res.data);
                                                                useUserStore.getState().setUserInfo({user:{name: tempValue}});
                                                                alert("修改用户名成功！")
                                                            }

                                                        } catch (error) {
                                                            console.error(error?.response?.data || error);
                                                            alert(error?.response?.data?.message || "修改失败");
                                                        }
                                                        setEditingField(null);
                                                    }}
                                                >
                                                    保存
                                                </button>
                                                <button className="cancel" onClick={() => setEditingField(null)}>取消</button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="change"
                                                    onClick={() => {
                                                        setEditingField("name");
                                                        setTempValue(state.user.name);
                                                    }}
                                                >
                                                    修改用户名
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    <div className="row">
                                        <label>电话号码：{state.user.phone}</label>
                                        {editingField === "phone" ? (
                                            <>
                                                <input
                                                    value={tempValue}
                                                    onChange={(e) => setTempValue(e.target.value)}
                                                />
                                                <button
                                                    className="save"
                                                    onClick={async () => {
                                                        const id = state.user.id;
                                                        console.log(id);
                                                        try {
                                                            const res = await axios.post('/api/user/update/phone',{id:id,phone:tempValue})
                                                            if(res.data.success){
                                                                console.log(res.data);
                                                                useUserStore.getState().setUserInfo({user:{phone: tempValue}});
                                                                alert("修改电话成功！")
                                                            }

                                                        } catch (error) {
                                                            console.error(error?.response?.data || error);
                                                            alert(error?.response?.data?.message || "修改失败");
                                                        }
                                                        setEditingField(null);
                                                    }}
                                                >
                                                    保存
                                                </button>
                                                <button className="cancel" onClick={() => setEditingField(null)}>取消</button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="change"
                                                    onClick={() => {
                                                        setEditingField("phone");
                                                        setTempValue(state.user.phone);
                                                    }}
                                                >
                                                    修改电话
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    <div className="row">
                                        <label>地址：{state.user.address}</label>
                                        {editingField === "address" ? (
                                            <>
                                                <input
                                                    value={tempValue}
                                                    onChange={(e) => setTempValue(e.target.value)}
                                                />
                                                <button
                                                    className="save"
                                                    onClick={async () => {
                                                        const id = state.user.id;
                                                        console.log(id);
                                                        try {
                                                            const res = await axios.post('/api/user/update/address',{id:id,address:tempValue})
                                                            if(res.data.success){
                                                                console.log(res.data);
                                                                useUserStore.getState().setUserInfo({user:{address: tempValue}});
                                                                alert("修改地址成功！")
                                                            }

                                                        } catch (error) {
                                                            console.error(error?.response?.data || error);
                                                            alert(error?.response?.data?.message || "修改失败");
                                                        }
                                                        setEditingField(null);
                                                    }}
                                                >
                                                    保存
                                                </button>
                                                <button className="cancel" onClick={() => setEditingField(null)}>取消</button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="change"
                                                    onClick={() => {
                                                        setEditingField("address");
                                                        setTempValue(state.user.address);
                                                    }}
                                                >
                                                    修改地址
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    <div className="row">
                                        <label>密码：******</label>
                                        {editingField === "password" ? (
                                            <>
                                                <input
                                                    style={{ width: '100px' }}
                                                    type="password"
                                                    placeholder="旧密码"
                                                    value={oldPassword}
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                />
                                                <input
                                                    style={{ width: '100px' }}
                                                    type="password"
                                                    placeholder="新密码"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />
                                                <input
                                                    style={{ width: '100px' }}
                                                    type="password"
                                                    placeholder="确认新密码"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                                <button
                                                    className="save"
                                                    onClick={handleChangePassword}
                                                >
                                                    保存
                                                </button>
                                                <button className="cancel" onClick={() => setEditingField(null)}>取消</button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="change"
                                                    onClick={() => {
                                                        setEditingField("password");
                                                        setOldPassword("");
                                                        setNewPassword("");
                                                        setConfirmPassword("");
                                                    }}
                                                >
                                                    修改密码
                                                </button>
                                            </>
                                        )}

                                    </div>
                                </form>

                            </div>

                            <div className="bottom_half">
                                {Avatars.slice(1).map((img, idx) => (
                                    <img
                                        key={idx + 1}
                                        src={img}
                                        alt={`avatar-${idx + 1}`}
                                        width={150}
                                        height={150}
                                        onClick={async () => {
                                            const id = state.user.id;
                                            console.log(id);
                                            try {
                                                const res = await axios.post('/api/user/update/avatar',{id:id,avatar:idx + 1})
                                                if(res.data.success){
                                                    console.log(res.data);
                                                    useUserStore.getState().setUserInfo({user:{avatar: idx + 1}});
                                                    alert("修改头像成功！")
                                                }

                                            } catch (error) {
                                                console.error(error?.response?.data || error);
                                                alert(error?.response?.data?.message || "修改失败");
                                            }
                                        }}
                                    />
                                ))}

                            </div>
                            <button className="quit" onClick={quit}>退出</button>
                        </div>
                    </div>
                    </main>
                </div>
            </div>
        </div>
    )
}