import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for the AI Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid messages format" });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({ error: "Gemini API Key is not configured on the server." });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Format messages history into a prompt
      const systemInstruction = `You are the friendly, helpful AI voice and chat assistant for Norq, a premium Canadian wireless earbuds brand.
Our company, Norq, is based in Canada and designs high-quality wireless earbuds.
Key business information about Norq:
- Phone: +1 236-979-2212
- Email: er.yogeshupreti@gmail.com
- Available on Amazon and Walmart.
- Features: Hi-Fi Sound, Bluetooth 5.3, Active Noise Reduction, 40-hour total battery life, fast USB-C charging, comfortable secure-fit ergonomic design, built-in dual microphones, IPX7 water resistance.
- Brand vibe: Clean, premium, minimalist, affordable pricing, superb quality, reliable customer support in Canada.
- Website design and development: Developed by iWebNext (https://iwebnext.com).

Always stay in character as the Norq Assistant. Be polite, direct, concise, and helpful. Suggest troubleshooting steps if users ask about charging, Bluetooth pairing, or battery life. Offer to direct them to Amazon and Walmart to purchase. Do not make up facts. Keep answers reasonably short (1-3 sentences) so they look great in a floating chat widget.`;

      // Build context from history
      let conversationPrompt = "This is a chat between a user and the Norq AI Assistant. Follow the system instruction closely.\n\n";
      for (const msg of messages) {
        conversationPrompt += `${msg.role === 'user' ? 'User' : 'Norq Assistant'}: ${msg.content}\n`;
      }
      conversationPrompt += "\nNorq Assistant: ";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: conversationPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text || "I'm sorry, I couldn't generate a response." });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: error.message || "An error occurred during response generation." });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
