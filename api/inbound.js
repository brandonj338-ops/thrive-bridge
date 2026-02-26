export default async function handler(req, res) {
  try {
    console.log("HEADERS:", req.headers);
    console.log("RAW BODY (parsed by Next.js):", req.body);

    const data = req.body;

    // Forward to Coordinator_00
    const coordinatorResponse = await fetch(
      "https://task-sync-32.preview.emergentagent.com/api/inbound",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const coordinatorResult = await coordinatorResponse.json();
    console.log("COORDINATOR RESPONSE:", coordinatorResult);

    return res.status(200).json({
      status: "ok",
      forwarded_to: "Coordinator_00",
      coordinator_result: coordinatorResult,
    });
  } catch (err) {
    console.error("Inbound error:", err);
    return res.status(500).json({ error: err.message });
  }
}
