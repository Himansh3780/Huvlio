export default function ApiHealth(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'OK',
      message: 'API is running',
      timestamp: new Date().toISOString()
    });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
