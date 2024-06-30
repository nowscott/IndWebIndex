import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await client.connect();
            const database = client.db('indwebindex-count');
            const collection = database.collection('visits');

            console.log("Connected to database");

            // 查找文档
            let visit = await collection.findOne({ _id: 'visit_count' });

            if (!visit) {
                console.log("No document found, inserting initial document");
                await collection.insertOne({ _id: 'visit_count', count: 1 });
                visit = { count: 1 };
            } else {
                // 更新计数
                visit = await collection.findOneAndUpdate(
                    { _id: 'visit_count' },
                    { $inc: { count: 1 } },
                    { returnDocument: 'after' }
                );
            }

            console.log('API response data:', visit);
            res.status(200).json({ count: visit.value ? visit.value.count : visit.count });
        } catch (error) {
            console.error('读取或写入计数数据失败:', error.message);
            res.status(200).json({ message: '未能读取或写入计数数据，但这不是致命错误。', error: error.message });
        } finally {
            await client.close();
            console.log("Database connection closed");
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`方法 ${req.method} 不被允许`);
    }
}