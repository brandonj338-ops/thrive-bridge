export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Receive inbound email data from Zapier
    const payload = req.body;

    // 2. Send it to Coordinator_00 inside Emergent
    const emergentResponse = await fetch(process.env.EMERGENT_AGENT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.EMERGENT_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const agentOutput = await emergentResponse.json();

    // 3. Return the agent's reply back to Zapier
    return res.status(200).json({
      outbound_subject: agentOutput.outbound_subject,
      outbound_body: agentOutput.outbound_body
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}