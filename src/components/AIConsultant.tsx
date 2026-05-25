import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';
import { Sparkles, Send, ShieldAlert, Bot, HelpCircle, User, Loader2 } from 'lucide-react';

interface AIConsultantProps {
  currentPkgId?: string;
}

const PRESET_PROMPTS = [
  'Bantu buat rencana seminar bisnis dalam ruangan untuk 150 orang dengan budget sekitar Rp 60.000.000.',
  'Saya mendambakan pesta ulang tahun outdoor yang romantis nan megah di bawah malam bertabur bintang.',
  'Tolong buatkan rekomendasi dekorasi elegan hitam emas untuk agenda penghargaan eksklusif saya.',
  'Apakah ada alternatif penanganan hujan jika saya memesan paket outdoor Celestial Rooftop?'
];

export default function AIConsultant({ currentPkgId }: AIConsultantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'ai',
      text: 'Selamat datang di Ruang Konsultasi Elit Eleganza Events Organizer. Saya **Aurelia**, asisten pribadi Anda untuk merancang momen penting nan mewah. \n\nCeritakan jenis perayaan impian Anda, anggaran yang disediakan, atau tanyakan pilihan tempat terbaik (Indoor/Outdoor). Bagaimanakah saya bisa membantu memuliakan acara Anda hari ini?',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Send message flow
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    // Clear main input if used
    if (!customText) {
      setInputMessage('');
    }

    const newMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
    setErrorStatus(null);

    try {
      const response = await fetch('/api/gemini/consult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, newMessage],
          userPreferences: {
            currentSelectedPackageId: currentPkgId || 'unselected',
          }
        })
      });

      if (!response.ok) {
        throw new Error('Sistem sedang menyeimbangkan respon dari asisten premium kami. Silakan coba sebentar lagi.');
      }

      const data = await response.json();
      
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || 'Terjadi gangguan jaringan saat bertukar data dengan Aurelia.');
    } finally {
      setIsLoading(false);
    }
  };

  // Convert custom bold markup and linebreaks beautifully for rendering
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Basic bullet mapping
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const textContent = line.replace(/^[-*]\s+/, '');
        return (
          <li key={idx} className="ml-5 list-disc text-gray-300 font-light my-1.5 text-xs sm:text-sm leading-relaxed">
            {parseInLineStyles(textContent)}
          </li>
        );
      }
      
      // Basic numbered list mapping
      const numberedMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numberedMatch) {
        return (
          <li key={idx} className="ml-5 list-decimal text-gray-300 font-light my-1.5 text-xs sm:text-sm leading-relaxed">
            {parseInLineStyles(numberedMatch[2])}
          </li>
        );
      }

      // Check for Header H3/H4
      if (line.trim().startsWith('###')) {
        return (
          <h4 key={idx} className="text-[#D4AF37] font-serif font-semibold text-sm sm:text-base mt-4 mb-2">
            {parseInLineStyles(line.replace(/^###\s+/, ''))}
          </h4>
        );
      }
      if (line.trim().startsWith('##')) {
        return (
          <h3 key={idx} className="text-[#D4AF37] font-serif font-semibold text-base sm:text-lg mt-5 mb-2 border-b border-[#D4AF37]/10 pb-1">
            {parseInLineStyles(line.replace(/^##\s+/, ''))}
          </h3>
        );
      }

      return (
        <p key={idx} className="text-gray-200 font-light text-xs sm:text-sm leading-relaxed mb-2.5">
          {parseInLineStyles(line)}
        </p>
      );
    });
  };

  const parseInLineStyles = (phrase: string) => {
    // Elegant regex scanning of **bold text**
    const parts = phrase.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-[#D4AF37] tracking-wide">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <section id="consultant-section" className="py-24 bg-black text-white relative">
      <div className="absolute inset-0 bg-radial-vignette opacity-85 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#D4AF37] font-mono text-xs tracking-[0.3em] uppercase block mb-3">
            ✨ EXCLUSIVE PRIVILEGE ✨
          </span>
          <h2 className="text-3xl md:text-5xl font-light font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-[#D4AF37] to-amber-200 mb-4">
            AI Event Designer Lounge
          </h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-gray-400 font-light max-w-2xl mx-auto text-sm md:text-base">
            Konsultasikan ide unik Anda bersama Aurelia, penasihat premium berbasis AI kami. Dapatkan penataan ruang kustom, mitigasi cuaca, dan proposal perkiraan harga terstruktur secara instan.
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#070707] border border-gray-900 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          
          {/* Left panel: Info & Presets: 4 cols */}
          <div className="lg:col-span-4 bg-[#0a0a0a] p-6 sm:p-8 border-r border-gray-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-600 to-[#D4AF37] flex items-center justify-center text-black">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white">Aurelia AI</h3>
                  <span className="text-[10px] tracking-wide text-amber-500 uppercase font-mono block">Premium Planner Advisor</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                Gunakan asisten kecerdasan buatan kami untuk merumuskan konsep katering bintang lima, pencahayaan megah, tata tertib upacara, dan modifikasi layout panggung terbaik demi acara Anda.
              </p>

              {/* Preset suggestion prompt box */}
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] font-semibold block mb-3 flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Inspirasi Pertanyaan Anda :
                </span>
                <div className="space-y-2.5">
                  {PRESET_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isLoading}
                      className="w-full text-left p-3.5 bg-black/60 border border-gray-900 rounded-sm hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all duration-300 text-[11px] text-gray-300 font-light leading-relaxed cursor-pointer disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-950 pt-5 text-center lg:text-left text-[10px] text-gray-500 font-mono tracking-wide leading-relaxed">
              🔐 ENCRYPTED PRIVATE CONSULTANCY<br />
              ELEGANZA EVENTS SYSTEM v3.5
            </div>
          </div>

          {/* Right panel: Chat Box: 8 cols */}
          <div className="lg:col-span-8 flex flex-col h-[600px] bg-black">
            
            {/* Thread Bar */}
            <div className="px-6 py-4 border-b border-gray-900/60 bg-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="text-xs tracking-wider text-[#D4AF37] uppercase font-mono">Live Session Private Lounge</span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">24/7 VIP Concierge</span>
            </div>

            {/* Chat Messages Log */}
            <div
              ref={scrollRef}
              className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-transparent scroll-smooth"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    {/* Badge Icon */}
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                      msg.sender === 'user' ? 'bg-zinc-800 text-gold-300' : 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30'
                    }`}>
                      {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>

                    {/* Bubble Content */}
                    <div className="flex flex-col">
                      <div className={`p-4 rounded-sm ${
                        msg.sender === 'user' 
                          ? 'bg-[#18181b] border border-gray-800 rounded-tr-none' 
                          : 'bg-[#0b0b0b] border border-[#D4AF37]/20 rounded-tl-none'
                      }`}>
                        {renderMessageContent(msg.text)}
                      </div>
                      <span className={`text-[10px] text-gray-500 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp}
                      </span>
                    </div>

                  </div>
                </div>
              ))}

              {/* Waiting Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/20">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-[#0b0b0b] border border-gray-900 p-4 rounded-sm flex items-center gap-2 text-xs text-gray-400 font-light">
                      <Loader2 className="h-4 w-4 animate-spin text-[#D4AF37]" />
                      Aurelia sedang merangkai konsep istimewa...
                    </div>
                  </div>
                </div>
              )}

              {/* Error log alert */}
              {errorStatus && (
                <div className="p-4 bg-red-950/20 border border-red-900/40 rounded-sm text-xs text-red-300 flex items-start gap-2.5">
                  <ShieldAlert className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Tautan Terputus</strong>
                    {errorStatus}
                  </div>
                </div>
              )}
            </div>

            {/* Form Input Message */}
            <div className="p-4 border-t border-gray-900 bg-black/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="relative flex items-center"
              >
                <input
                  id="chat-input-text"
                  type="text"
                  placeholder="Ketik detail rencana / pertanyaan Anda di sini..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-[#0a0a0a] border border-gray-800 text-white pl-4 pr-16 py-4 text-xs sm:text-sm outline-none rounded-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all disabled:opacity-50 placeholder-gray-600"
                />
                
                <button
                  id="btn-send-chat"
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="absolute right-3 p-2 bg-[#D4AF37] hover:bg-amber-500 text-black rounded-sm transition-all disabled:opacity-30 disabled:hover:bg-[#D4AF37] flex items-center justify-center h-10 w-10 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4 stroke-[2.5]" />
                </button>
              </form>
              <div className="text-[10px] text-gray-500 text-center mt-2.5">
                Konsultasikan agenda Anda: Seminar Internasional, Pesta Ulang Tahun, Gala Dinner, atau Rekomendasi Al-Fresco.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
