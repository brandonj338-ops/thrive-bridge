export default async function handler(req, res) {
  try {
    console.log("HEADERS:", req.headers);
    console.log("RAW BODY (parsed by Next.js):", req.body);

    const data = req.body;

    return res.status(200).json({ status: "ok", received: data });
  } catch (err) {
    console.error("Inbound error:", err);
    return res.status(500).json({ error: err.message });
  }
}
