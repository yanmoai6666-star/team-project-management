const express = require('express');
const app = express();
const PORT = 3000;

// 中间件
app.use(express.json());
app.use(express.static('.')); // 提供静态文件

// 标签数据
const labels = [
    { id: 1, name: 'bug', color: '#d73a4a', category: '问题类型', usage: '软件缺陷' },
    { id: 2, name: 'enhancement', color: '#a2eeef', category: '功能类型', usage: '功能增强' },
    { id: 3, name: 'documentation', color: '#0075ca', category: '文档类型', usage: '文档相关' },
    { id: 4, name: 'feature', color: '#1d76db', category: '功能类型', usage: '新功能' },
    { id: 5, name: 'priority-high', color: '#ff0000', category: '优先级', usage: '高优先级' }
];

// API路由
app.get('/api/labels', (req, res) => {
    res.json(labels);
});

app.get('/api/labels/:name', (req, res) => {
    const label = labels.find(l => l.name === req.params.name);
    if (!label) return res.status(404).json({ error: '标签未找到' });
    res.json(label);
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Team Project Management API',
        timestamp: new Date().toISOString()
    });
});

// 首页重定向
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`API端点: http://localhost:${PORT}/api/labels`);
});
