"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react"; 
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import Image from "next/image"; 
import Magnetic from "./Magnetic";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);

  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "submitted" || status === "streaming";

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== "undefined") {
      const viewportHeight = window.innerHeight;
      
      if (latest > viewportHeight * 0.7) {
        setShowChatbot(true);
      } else {
        setShowChatbot(false);
        setIsOpen(false); 
      }
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getMessageText = (m: (typeof messages)[number]) =>
    m.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <AnimatePresence>
      {showChatbot && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50000"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-20 right-0 w-[90vw] md:w-96 h-125 max-h-[80vh] bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b border-black/10 dark:border-white/10 flex justify-between items-center bg-[#F4F4F4] dark:bg-[#1C1D20] rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8B5CF6]"></span>
                    </span>
                    <h3 className="text-sm font-bold font-mono tracking-widest uppercase text-[#1C1D20] dark:text-[#ededed] mt-0.5">
                      Ask about Angelito!
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-[#999D9E] hover:text-black dark:hover:text-white transition-colors"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-medium">
                  {messages.length === 0 && (
                    <div className="text-center text-[#999D9E] mt-10">
                      <p>Hi! I&apos;m Angelito&apos;s AI assistant.</p>
                      <p className="mt-2 text-xs">Ask me about his tech stack, Seelai, or other projects.</p>
                    </div>
                  )}
                  
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl flex gap-3 ${
                        m.role === 'user' 
                          ? 'bg-[#8B5CF6] text-white rounded-br-sm' 
                          : 'bg-[#F4F4F4] dark:bg-[#1C1D20] text-[#1C1D20] dark:text-[#ededed] rounded-bl-sm border border-black/5 dark:border-white/5'
                      }`}>
                        
                        {m.role === 'assistant' && (
                          <Image 
                            src="/img/image1.1.png" 
                            alt="Thirdy AI" 
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full mt-0.5 shrink-0 object-cover shadow-sm border border-[#8B5CF6]/20 bg-white" 
                          />
                        )}

                        <p className="leading-relaxed whitespace-pre-wrap">{getMessageText(m)}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#F4F4F4] dark:bg-[#1C1D20] p-3 rounded-2xl rounded-bl-sm border border-black/5 dark:border-white/5 flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-[#999D9E] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-[#999D9E] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-[#999D9E] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t border-black/10 dark:border-white/10 bg-[#F4F4F4] dark:bg-[#1C1D20]">
                  <div className="relative flex items-center">
                    <input
                      value={input} 
                      onChange={handleInputChange} 
                      placeholder="Type a message..."
                      className="w-full bg-white dark:bg-[#111111] text-[#1C1D20] dark:text-[#ededed] border border-black/10 dark:border-white/10 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#8B5CF6] transition-colors"
                    />
                    <button 
                      type="submit" 
                      disabled={isLoading || !input.trim()} 
                      className="absolute right-2 p-2 bg-[#8B5CF6] text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <Magnetic>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-14 h-14 bg-[#1C1D20] dark:bg-white text-white dark:text-[#1C1D20] rounded-full flex items-center justify-center shadow-xl transition-all"
            >
              {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}