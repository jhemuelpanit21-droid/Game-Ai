import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("✅ Local AI Server is running");
});

// AI route (Ollama)
app.post("/ask", async (req, res) => {
  const question = req.body.question;

  if (!question) {
    return res.json({ answer: "No question provided." });
  }

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: `
You are a helpful game assistant.
- Never spoil main story events
- Give hints, side quests, easter eggs, and locations
- If asked about spoilers, give a vague hint only

User question: ${question}
        `,
        stream: false
      })
    });

    const data = await response.json();

    res.json({
      answer: data.response
    });

  } catch (err) {
    console.error("OLLAMA ERROR:", err);
    res.status(500).json({
      answer: "❌ Local AI is not running. Start Ollama."
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log("✅ Local AI Server running at http://localhost:" + PORT);
});
