import { isVisitTrackingEnabled, recordPageView } from '../../lib/visitStats';

const getRequestOrigin = req => {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || (process.env.NODE_ENV === 'production' ? 'https' : 'http');
  return host ? `${String(protocol).split(',')[0]}://${String(host).split(',')[0]}` : null;
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const expectedOrigin = getRequestOrigin(req);
  if (!req.headers.origin || req.headers.origin !== expectedOrigin) {
    return res.status(403).end('Invalid request origin');
  }
  if (!isVisitTrackingEnabled()) return res.status(204).end();

  try {
    await recordPageView();
    return res.status(204).end();
  } catch (error) {
    console.error('[API] Visit activity error:', error);
    return res.status(204).end();
  }
}
