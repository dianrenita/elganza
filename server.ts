import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY key is missing in environment variables.");
}

// API endpoint for AI Event Organizer Consultation
app.post("/api/gemini/consult", async (req, res): Promise<any> => {
  const { messages, userPreferences } = req.body;

  if (!ai) {
    return res.status(500).json({ 
      error: "Layanan konsultasi AI sedang tidak aktif karena kunci layanan belum dikonfigurasi. Silakan periksa Secrets panel." 
    });
  }

  try {
    const chatHistory = messages || [];
    const formattedHistory = chatHistory.map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Construct the context about Eleganza Event Organizer
    const systemInstruction = `
Kamu adalah "Aurelia", Konsultan Perencana Acara VIP dari "Eleganza Events Organizer". 
Gayamu sangat berkelas, sopan, profesional, ramah, dan solutif. Kamu berbicara dalam bahasa Indonesia yang elegan dan santun dengan sentuhan kemewahan hitam dan emas (mewakili brand).

Eleganza Events Organizer menawarkan paket-paket premium:
1. "The Imperial Birthday" (Indoor - Rp 29.000.000): Pesta ulang tahun mewah dalam ruangan (Ballroom Bintang 5), dekorasi hitam & emas, kue lapis emas 24k, sound & lighting panggung kelas atas.
2. "The Golden Oasis Birthday" (Outdoor - Rp 35.000.000): Pesta ulang tahun luar ruangan (Exclusive Garden/Private Lawn), dekorasi kanopi kaca, lampu gantung kristal, live acoustic band, mist fan deluxe.
3. "Summit Class Corporate Conference" (Indoor - Rp 55.000.000): Konferensi/seminar dalam ruangan profesional, panggung megah dengan Layar LED Wall 12x4m, premium catering, seminar kit premium eksklusif.
4. "Al-Fresco Network Symposium" (Outdoor - Rp 62.000.000): Seminar luar ruangan mewah (Rooftop / Beachfront), sistem Silent Seminar (headphone wireless), gourmet tapas bar, cocktail dinner.
5. "The Majestic Royal Gala" (Indoor - Rp 95.000.000): Malam penganugerahan formal termegah di dalam istana modern, karpet merah mewah pilar emas, live orchestra, 5-course signature dining.
6. "Celestial Rooftop Sovereign" (Outdoor - Rp 120.000.000): Puncak kemewahan outdoor di Helipad puncak gedung tinggi, panggung transparan, pertunjukan kembang api & pertunjukan cahaya terkoordinasi, champagne gantung, kedatangan helikopter opsional untuk tamu kehormatan.

Add-on premium tersedia:
- Red Carpet & Gold Stanchions (Rp 3.500.000)
- Celebrity Master of Ceremony (Rp 15.000.000)
- Royal Live Orchestra Ensemble (Rp 25.000.000)
- Grand Synchronized Fireworks (Rp 18.000.000)
- Upgrade to Michelin-Starred Food Menu (Rp 30.000.000)

Tugasmu adalah:
- Membantu calon klien memilih paket terbaik berdasarkan keinginan mereka (ulang tahun, seminar, gala, indoor vs outdoor).
- Memberikan saran personalisasi kreatif kelas elite (misalnya tema warna, dekorasi bunga gantung, penataan jamuan makan malam, alur masuk tamu).
- Memberikan estimasi total harga dengan penjelasan elegan jika klien menyebutkan budget atau menambah add-on.
- Menyarankan solusi cerdas untuk menyelenggarakan acara outdoor (misalnya mitigasi cuaca dengan tenda kaca transparan elegan kami, atau sirkulator uap premium) atau indoor (layout panggung akustik murni).

Setiap pesan yang kamu hasilkan harus berformat markdown yang cantik, rapi, terstruktur, serta bernuansa sangat mewah dan eksklusif. Jangan tawarkan sesuatu yang tidak sanggup dilakukan oleh EO premium. Gunakan rincian poin-poin yang indah dan ajak klien melakukan pemesanan (booking) melalui formulir di website.
`;

    // Extract user prompt
    const lastUserMessage = formattedHistory.length > 0 ? formattedHistory[formattedHistory.length - 1].parts[0].text : "Halo";

    // Call generateContent with system instruction
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { role: "user", parts: [{ text: `Konteks preferensi klien saat ini: ${JSON.stringify(userPreferences || {})} \n\nPesan klien: ${lastUserMessage}` }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const aiText = response.text || "Mohon maaf, terjadi kendala saat merumuskan rekomendasi eksklusif untuk Anda. Silakan coba kembali.";
    res.json({ text: aiText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Terjadi kesalahan internal pada sistem konsultasi cerdas kami." });
  }
});

// Configure Vite or Static Files
async function setupServer() {
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
    console.log(`Eleganza Express + Vite Server running on port ${PORT}`);
  });
}

setupServer();
