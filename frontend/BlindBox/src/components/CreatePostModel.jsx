import React, { useState } from "react";
import axios from "../constants/axios";
import "./CreatePostModel.css";

export default function CreatePostModal({ onClose, onPostSuccess }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = async () => {
        if (!image) return null;

        const formData = new FormData();
        formData.append("file", image);

        const res = await axios.post("/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return res.data.files[0].url;
    };

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert("标题和内容不能为空！");
            return;
        }

        try {
            setLoading(true);
            let imageUrl = await handleImageUpload();

            await axios.post("/api/posts", {
                title,
                content,
                imageUrl,
                authorId: 1, // 测试先写死，后面从登录状态取
            });

            alert("发帖成功！");
            onPostSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            alert("发帖失败");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>发布新帖子</h2>
                <input
                    type="text"
                    placeholder="请输入标题"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="请输入内容"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <div className="modal-buttons">
                    <button onClick={handleSubmit} disabled={loading}>
                        {loading ? "发布中..." : "发布"}
                    </button>
                    <button onClick={onClose}>取消</button>
                </div>
            </div>
        </div>
    );
}
