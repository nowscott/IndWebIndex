import { turso } from '../../lib/turso';
import { createHash } from 'node:crypto';

const VISIT_COOKIE = 'indwebindex_visited';

const readVisitCount = async () => {
    const result = await turso.execute({
        sql: "SELECT count FROM stats WHERE id = ?",
        args: ["visit_count"]
    });
    return Number(result.rows[0]?.count || 0);
};

const getRequestOrigin = req => {
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || (process.env.NODE_ENV === 'production' ? 'https' : 'http');
    return host ? `${String(protocol).split(',')[0]}://${String(host).split(',')[0]}` : null;
};

const getVisitorFingerprint = req => {
    const forwardedFor = req.headers['x-forwarded-for'];
    const address = Array.isArray(forwardedFor)
        ? forwardedFor[0]
        : String(forwardedFor || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
    const userAgent = req.headers['user-agent'] || 'unknown';
    const language = req.headers['accept-language'] || 'unknown';
    const salt = process.env.TURSO_AUTH_TOKEN || process.env.indwebindex_TURSO_AUTH_TOKEN || '';

    return createHash('sha256')
        .update(`${address}|${userAgent}|${language}|${salt}`)
        .digest('hex');
};

const hasVisitCookie = req => {
    return String(req.headers.cookie || '')
        .split(';')
        .some(cookie => cookie.trim().split('=')[0] === VISIT_COOKIE);
};

const setVisitCookie = res => {
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader(
        'Set-Cookie',
        `${VISIT_COOKIE}=1; Max-Age=86400; Path=/; HttpOnly; SameSite=Lax${secure}`
    );
};

export default async function handler(req, res) {
    console.log(`[API] Received ${req.method} request for visit-count (Turso)`);
    res.setHeader('Cache-Control', 'no-store');
    
    // 检查 Turso 客户端是否已配置
    if (!process.env.TURSO_DATABASE_URL && !process.env.indwebindex_TURSO_DATABASE_URL) {
        return res.status(200).json({ enabled: false, message: 'Turso database URL missing' });
    }
    if (!process.env.TURSO_AUTH_TOKEN && !process.env.indwebindex_TURSO_AUTH_TOKEN) {
        return res.status(200).json({ enabled: false, message: 'Turso auth token missing' });
    }

    if (req.method !== 'GET' && req.method !== 'POST') {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (req.method === 'POST') {
        const expectedOrigin = getRequestOrigin(req);
        if (!req.headers.origin || req.headers.origin !== expectedOrigin) {
            return res.status(403).json({ error: 'Invalid request origin' });
        }
    }

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

        await turso.execute(`
            CREATE TABLE IF NOT EXISTS visit_events (
                fingerprint TEXT NOT NULL,
                visit_date TEXT NOT NULL,
                created_at INTEGER NOT NULL,
                PRIMARY KEY (fingerprint, visit_date)
            )
        `);

        if (req.method === 'GET') {
            const count = await readVisitCount();
            console.log(`[API] Turso GET success, count: ${count}`);
            return res.status(200).json({ count });
        } 
        
        if (req.method === 'POST') {
            if (hasVisitCookie(req)) {
                const count = await readVisitCount();
                return res.status(200).json({ count, incremented: false });
            }

            const fingerprint = getVisitorFingerprint(req);
            const visitDate = new Date().toISOString().slice(0, 10);
            const retentionDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
                .toISOString()
                .slice(0, 10);
            const transaction = await turso.transaction('write');

            try {
                await transaction.execute({
                    sql: "DELETE FROM visit_events WHERE visit_date < ?",
                    args: [retentionDate]
                });

                const insertResult = await transaction.execute({
                    sql: `
                        INSERT OR IGNORE INTO visit_events (fingerprint, visit_date, created_at)
                        VALUES (?, ?, ?)
                    `,
                    args: [fingerprint, visitDate, Date.now()]
                });

                let count;
                if (insertResult.rowsAffected > 0) {
                    const updateResult = await transaction.execute({
                        sql: "UPDATE stats SET count = count + 1 WHERE id = ? RETURNING count",
                        args: ["visit_count"]
                    });
                    count = Number(updateResult.rows[0]?.count || 0);
                } else {
                    const countResult = await transaction.execute({
                        sql: "SELECT count FROM stats WHERE id = ?",
                        args: ["visit_count"]
                    });
                    count = Number(countResult.rows[0]?.count || 0);
                }

                await transaction.commit();
                setVisitCookie(res);
                console.log(`[API] Turso POST success, count: ${count}, incremented: ${insertResult.rowsAffected > 0}`);
                return res.status(200).json({
                    count,
                    incremented: insertResult.rowsAffected > 0
                });
            } catch (error) {
                await transaction.rollback();
                throw error;
            }
        }
    } catch (error) {
        console.error('[API] Error in visit-count (Turso):', error);
        // 如果数据库执行报错，也将功能标记为禁用，避免前端报错
        return res.status(200).json({ 
            enabled: false,
            count: 0, 
            error: 'Database operation failed',
            detail: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}
