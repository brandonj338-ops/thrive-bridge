export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST required" });
  }

  try {
    const data = req.body || {};
    console.log("Inbound payload:", data);

    // ⭐ FORWARD TO COORDINATOR_00 (REAL ENDPOINT)
    const coordinatorResponse = await fetch(
      "https://coordinator-core.preview.emergentagent.com/api/inbound",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const coordinatorData = await coordinatorResponse.json();
    console.log("Coordinator response:", coordinatorData);

    // ⭐ RETURN COORDINATOR RESPONSE TO ZAPIER
    return res.status(200).json({
      status: "forwarded",
      coordinator: coordinatorData,
    });

  } catch (err) {
    console.error("Inbound error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
