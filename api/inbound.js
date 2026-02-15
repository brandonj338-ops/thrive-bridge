export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST required' });
  }

  try {
    const data = req.body || {};
    console.log('Inbound payload:', data);

    return res.status(200).json({
      status: 'ok',
      received: data
    });
  } catch (err) {
    console.error('Inbound error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
