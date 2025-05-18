import { onMessage } from "../shared/messenger";

onMessage(async (message) => {
  if (message.type === "SEND_TO_API") {
    try {
      const res = await fetch("https://openrouter.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_API_KEY",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message.payload }],
        }),
      });
      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "";
      return { response: reply };
    } catch (err) {
      return { error: err?.toString?.() || String(err) };
    }
  }
});
