import { turso } from '../../lib/turso';

export default async function handler(req, res) {
    console.log(`[API] Received ${req.method} request for visit-count (Turso)`);
    try {
        // 1. 确保表存在
        await turso.execute(`
            CREATE TABLE IF NOT EXISTS stats (
                id TEXT PRIMARY KEY,
                count INTEGER DEFAULT 0
            )
        `);

        // 2. 初始化数据（如果不存在）
        await turso.execute({
            sql: "INSERT OR IGNORE INTO stats (id, count) VALUES (?, ?)",
            args: ["visit_count", 0]
        });

        if (req.method === 'GET') {
            const result = await turso.execute({
                sql: "SELECT count FROM stats WHERE id = ?",
                args: ["visit_count"]
            });
            const count = result.rows[0]?.count || 0;
            console.log(`[API] Turso GET success, count: ${count}`);
            return res.status(200).json({ count });
        } 
        
        if (req.method === 'POST') {
            const increment = 1;
            console.log(`[API] Turso Incrementing visit_count by ${increment}...`);
            
            // 使用事务确保原子性
            const result = await turso.execute({
                sql: "UPDATE stats SET count = count + ? WHERE id = ? RETURNING count",
                args: [increment, "visit_count"]
            });
            
            const finalCount = result.rows[0]?.count || 0;
            console.log(`[API] Turso POST success, new count: ${finalCount}`);
            return res.status(200).json({ count: finalCount });
        }

        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    } catch (error) {
        console.error('[API] Error in visit-count (Turso):', error);
        return res.status(500).json({ count: 0, error: error.message || 'Internal Server Error' });
    }
}