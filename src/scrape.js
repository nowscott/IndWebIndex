const axios = require('axios');
const fs = require('fs');
// 发起 HTTP 请求并获取数据

axios.get('https://web.nowscott.top/.netlify/functions/notion')
  .then(response => {
    // 处理并解析返回的数据
    const data = response.data;
    // 格式化 JSON 数据
    const formattedJson = JSON.stringify(data, null, 4);
    try {
      // 将数据保存为 JSON 文件
      fs.writeFileSync('data.json', formattedJson);
    } catch (err) {
      console.error('Error writing JSON file:', err);
    }
  }).catch(error => {
    console.error('Error fetching data:', error);
  });
