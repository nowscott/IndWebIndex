const axios = require('axios');
const fs = require('fs');

axios.get('https://web.nowscott.top/.netlify/functions/notion')
    .then(response => {
        const data = response.data;
        const formattedJson = JSON.stringify(data, null, 4);
        
        try {
            fs.writeFileSync('temp.json', formattedJson); // 将数据保存为临时文件
        } catch (err) {
            console.error('Error writing JSON file:', err);
        }
    })
    .then(() => {
        try {
            // 将临时文件重命名为 data.json
            fs.renameSync('temp.json', 'data.json');
        } catch (err) {
            console.error('Error renaming file:', err);
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // 可以选择在这里执行适当的错误处理逻辑
    });
