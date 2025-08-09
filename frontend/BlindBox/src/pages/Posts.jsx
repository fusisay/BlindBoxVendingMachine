import "../components/Background.css";
import "./Posts.css";
import Header from "../layouts/Header.jsx";
import { useEffect, useState } from "react";
import axios from "../constants/axios.js";
import { useNavigate } from "react-router-dom";
import CreatePostModal from "../components/CreatePostModel.jsx";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [createPost, setCreatePost] = useState(false);

    const fetchPosts = () => {
        axios.get("/api/posts")
            .then(res => setPosts(res.data))
            .catch(err => console.error("获取帖子失败:", err));
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="background">
            <div className="mask">
                <div className="container">
                    <Header />
                    <div className="content">
                        <button className="post_button" onClick={() => {setCreatePost(true);}}>我要发帖</button>

                    {posts.length === 0 ? (
                        <p>暂无帖子</p>
                    ) : (
                        <div className="post-list">
                            {posts.map(post => (
                                <div
                                    key={post.id}
                                    className="post-item"
                                    onClick={() => {
                                        console.log("post",post);
                                        console.log("id:",post.id);
                                        navigate(`/posts/${post.id}`);}}
                                >
                                    <h3>{post.title}</h3>
                                    {post.imageUrl && (
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="post-thumb"
                                        />
                                    )}
                                    <p>{post.content.length > 10 ? post.content.slice(0, 10) + "..." : post.content}</p>
                                    <small>
                                        作者：{post.author?.name || "匿名"} |{" "}
                                        {new Date(post.createdAt).toLocaleString()}
                                    </small>
                                </div>
                            ))}
                        </div>
                    )}
                        {/* ✅ 这里插入发帖弹窗 */}
                        {createPost && (
                            <CreatePostModal
                                onClose={() => setCreatePost(false)}
                                onPostSuccess={fetchPosts}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
