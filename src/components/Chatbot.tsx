import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageSquare, X, Send, Sparkles, RefreshCw, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      role: "assistant",
      content: "Hi! Welcome to Norq support. I'm your virtual acoustic advisor. Ask me anything about our wireless earbuds, pairing, specs, or ordering through Amazon & Walmart!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const history = [...messages, userMessage].map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok) {
        throw new Error("Chat service is currently unavailable.");
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.text || "I apologize, but I couldn't compute a proper response. Please try again.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Chatbot API error:", err);
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "Oops! I seem to be experiencing connection difficulties with my neural core. Please make sure your server is running and try again shortly.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "msg-welcome",
        role: "assistant",
        content: "Hi! Welcome to Norq support. I'm your virtual acoustic advisor. Ask me anything about our wireless earbuds, pairing, specs, or ordering through Amazon & Walmart!",
      },
    ]);
  };

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#2F80ED] text-white shadow-xl hover:bg-[#1a6ed2] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F80ED] focus:ring-offset-2 focus:ring-offset-[#111111]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle support chatbot"
          id="chatbot-trigger-btn"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[9999] w-[350px] sm:w-[380px] h-[500px] max-h-[calc(100vh-140px)] rounded-2xl border border-white/10 bg-[#161616] shadow-2xl overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#1e1e1e] border-b border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#2F80ED]/10 rounded-lg text-[#2F80ED]">
                  <Headphones size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white tracking-wide flex items-center gap-1.5 font-display">
                    Norq Acoustic Advisor
                    <Sparkles size={12} className="text-[#2F80ED] animate-pulse" />
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] text-gray-400 font-mono uppercase">Online & Ready</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Close chatbot"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#111111]/90">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-[#2F80ED] text-white rounded-br-none"
                        : "bg-[#222222] text-gray-200 border border-white/5 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#222222] border border-white/5 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-[#1e1e1e] border-t border-white/5 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about sound, battery, shipping..."
                className="flex-1 bg-[#121212] text-sm text-white placeholder-gray-500 rounded-xl px-4 py-2.5 border border-white/5 focus:outline-none focus:border-[#2F80ED] transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 rounded-xl bg-[#2F80ED] text-white hover:bg-[#1a6ed2] disabled:opacity-50 disabled:hover:bg-[#2F80ED] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
