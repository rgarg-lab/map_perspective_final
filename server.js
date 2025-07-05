const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/summarize', async (req, res) => {
  const { headlines } = req.body;

  if (!headlines || !headlines.length) {
    return res.status(400).json({ error: "No headlines provided." });
  }

  const prompt = `Summarize the following news headlines in 2-3 lines:\n${headlines.join("\n")}`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const result = await geminiRes.json();
    console.log("🧠 Gemini Response:", JSON.stringify(result, null, 2));

    if (result.error) {
      return res.status(500).json({ error: result.error.message });
    }

    const summary = result.candidates?.[0]?.content?.parts?.[0]?.text || "No summary found.";
    res.json({ summary });

  } catch (err) {
    console.error("❌ Gemini API error:", err);
    res.status(500).json({ error: "Failed to summarize headlines." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
