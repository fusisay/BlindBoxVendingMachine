import "../components/Background.css";
import "./Posts.css";
import Header from "../layouts/Header.jsx";
import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../constants/axios.js";
import { useUserStore } from "../store/userStore.js";
import "./PostDetail.css"

export default function PostDetail() {
    const state = useUserStore((state) => state.userInfo);
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [replyToId, setReplyToId] = useState(null);
    const [replyToName, setReplyToName] = useState("");
    const navigate = useNavigate();

    async function fetchPostDetail() {
        try {
            const res = await axios.get(`/api/posts/${postId}`);
            console.log("res:", res.data);
            setPost(res.data);
            const ano_res = await axios.get(`/api/comments/post/${postId}`);
            setComments(ano_res.data || []);
            console.log("ano_res:", ano_res);
        } catch (err) {
            console.error("获取帖子详情失败:", err);
        }
    }

    // 初始加载
    useEffect(() => {
        fetchPostDetail();
    }, [postId]);

    // 发表评论
    const submitComment = async () => {
        if (!commentContent.trim()) return alert("请输入评论内容");
        try {
            await axios.post("/api/comments", {
                content: commentContent,
                postId: post.id,
                authorId: state?.user?.id,
                parentCommentId: replyToId,
            });
            setCommentContent("");
            setReplyToId(null);
            setReplyToName("");

            // 刷新评论列表
            await fetchPostDetail();
        } catch (err) {
            alert("评论失败");
            console.error(err);
        }
    };

    const renderComments = (list, level = 0) => {
        return list.map((c) => (
            <div
                key={c.id}
                style={{
                    marginLeft: level * 20,
                    borderBottom: "1px solid #ddd",
                    padding: "8px 0",
                }}
            >
                <b>{c.author?.name || "匿名"}</b>
                ：{c.content}
                <button
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                        setReplyToId(c.id);
                        setReplyToName(c.author?.name || "匿名");
                    }}
                >
                    回复
                </button>
                {c.replies && c.replies.length > 0 && renderComments(c.replies, level + 1)}
            </div>
        ));
    };

    if (!post) return <p>加载中...</p>;

    const delete_post = async () => {
        try {
            const res = await axios.delete(`/api/posts/${postId}/${state.user.id}`);
            if (res.status === 200) {
                alert("删除成功！");
                navigate('/posts');
            } else {
                alert("删除失败");
            }
        } catch (err) {
            console.error("删除帖子失败:", err);
            alert("删除失败：" + (err.response?.data?.message || "服务器错误"));
        }
    };


    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />

                    <div className="show_card">
                        <button className="delete" onClick={delete_post}>删除帖子</button>
                    <h2>{post.title}</h2>
                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="img"
                        />
                    )}
                    <p>{post.content}</p>
                    <hr />
                    <h3>评论区</h3>
                    {renderComments(comments)}

                    <div style={{ marginTop: 20 }}>
                        {replyToId && (
                            <div style={{ marginBottom: 8 }}>
                                回复 <b>{replyToName}</b>
                                <button
                                    style={{ marginLeft: 10 }}
                                    onClick={() => {
                                        setReplyToId(null);
                                        setReplyToName("");
                                    }}
                                >
                                    取消回复
                                </button>
                            </div>
                        )}
                        <textarea
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            rows={4}
                            style={{ width: "100%" }}
                            placeholder="写评论..."
                        />
                        <button onClick={submitComment} style={{ marginTop: 8 }}>
                            提交评论
                        </button>

                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
