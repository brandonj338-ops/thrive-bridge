export default async function handler(req, res) {
  try {
    const rawText = await req.text();
    console.log("RAW BODY:", rawText);

    console.log("HEADERS:", req.headers);

    const data = JSON.parse(rawText);
    console.log("PARSED JSON:", data);

    return res.status(200).json({ status: "ok", received: data });
  } catch (err) {
    console.error("Inbound error:", err);
    return res.status(500).json({ error: err.message });
  }
}
