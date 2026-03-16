import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const database = client.db('indwebindex-count');
            const collection = database.collection('visits');

            // 查找文档
            let visit = await collection.findOne({ _id: 'visit_count' });

            if (!visit) {
                await collection.insertOne({ _id: 'visit_count', count: 1 });
                visit = { count: 1 };
            } else {
                const randomIncrement = Math.floor(Math.random() * 9) + 1;
                const result = await collection.findOneAndUpdate(
                    { _id: 'visit_count' },
                    { $inc: { count: randomIncrement } },
                    { returnDocument: 'after' }
                );
                visit = result;
            }

            res.status(200).json({ count: visit.value ? visit.value.count : visit.count });
        } catch (error) {
            console.error('MongoDB visit count failed:', error.message);
            res.status(200).json({ count: 0, error: 'Database connection failed' });
        }
        // Note: We no longer close the client connection here because it is shared/cached.
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}