import { promises as fs } from 'fs';
import path from 'path';

const countFilePath = path.join(process.cwd(), 'count.json');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const fileData = await fs.readFile(countFilePath, 'utf-8');
            const data = JSON.parse(fileData);
            data.count += 1;
            await fs.writeFile(countFilePath, JSON.stringify(data), 'utf-8');
            res.status(200).json({ count: data.count });
        } catch (error) {
            res.status(500).json({ error: 'Failed to read or write count file' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}