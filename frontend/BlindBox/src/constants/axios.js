// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7001', // 改成你后端实际端口
    timeout: 5000,
});

export default instance;
