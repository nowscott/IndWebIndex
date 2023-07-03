const axios = require('axios');
const fs = require('fs');

// 发起 HTTP 请求并获取数据
axios.get('https://web.nowscott.top/.netlify/functions/notion')
  .then(response => {
    // 处理并解析返回的数据
    const data = response.data;

    // 将数据保存为 JSON 文件
    const jsonData = JSON.stringify(data);
    fs.writeFile('data.json', jsonData, (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('Data saved as JSON file');
      }
    });
  }).catch(error => {
    console.error('Error fetching data:', error);
  });