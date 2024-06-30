import { promises as fs } from 'fs';
import path from 'path';

const countFilePath = path.join(process.cwd(), 'count.json');

export default async function handler(req, res) {
  console.log('API 处理程序被调用');
  
  if (req.method === 'GET') {
    try {
      console.log('正在读取计数文件...');
      const fileData = await fs.readFile(countFilePath, 'utf-8');
      console.log('计数文件读取成功:', fileData);
      
      const data = JSON.parse(fileData);
      data.count += 1;
      console.log('将计数更新为:', data.count);
      
      await fs.writeFile(countFilePath, JSON.stringify(data), 'utf-8');
      console.log('计数文件更新成功');
      
      res.status(200).json({ count: data.count });
    } catch (error) {
      console.error('读取或写入计数文件失败:', error);
      res.status(500).json({ error: '读取或写入计数文件失败' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`方法 ${req.method} 不被允许`);
  }
}