import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await client.connect();
            const database = client.db('indwebindex-count');
            const collection = database.collection('visits');

            console.log("已连接到数据库");

            // 查找文档
            let visit = await collection.findOne({ _id: 'visit_count' });

            if (!visit) {
                console.log("未找到文档，插入初始文档");
                await collection.insertOne({ _id: 'visit_count', count: 1 });
                visit = { count: 1 };
            } else {
                // 增加一个随机的个位数
                const randomIncrement = Math.floor(Math.random() * 9) + 1;
                visit = await collection.findOneAndUpdate(
                    { _id: 'visit_count' },
                    { $inc: { count: randomIncrement } },
                    { returnDocument: 'after' }
                );
            }

            console.log('API 响应数据:', visit);
            res.status(200).json({ count: visit.value ? visit.value.count : visit.count });
        } catch (error) {
            console.error('读取或写入计数数据失败:', error.message);
            res.status(200).json({ message: '未能读取或写入计数数据，但这不是致命错误。', error: error.message });
        } finally {
            await client.close();
            console.log("数据库连接已关闭");
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`方法 ${req.method} 不被允许`);
    }
}