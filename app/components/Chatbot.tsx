"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react"; 
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MessageSquare, X, Send, ArrowRight } from "lucide-react";
import Image from "next/image"; // Re-imported Next.js Image component
import Magnetic from "./Magnetic";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);

  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "submitted" || status === "streaming";

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const suggestedPrompts = [
    "Tell me about the Seelai project.",
    "What is your tech stack?",
    "What is your design philosophy?",
  ];

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

  const handleSuggestionClick = (text: string) => {
    sendMessage({ text });
  };
  
  return (
    <AnimatePresence>
      {showChatbot && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-100" 
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
                <div className="p-4 border-b border-black/10 dark:border-white/10 flex justify-between items-center bg-[#F4F4F4] dark:bg-[#1C1D20] rounded-t-2xl shrink-0">
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
                    aria-label="Close chat"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-medium scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-800">
                  
                  {/* Welcome Screen (Empty State) */}
                  {messages.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col items-center mt-4 space-y-6"
                    >
                      {/* Avatar Profile Section using Next.js Image to fix ESLint warning */}
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden border border-black/50 dark:border-white/20 shadow-md bg-[#F4F4F4] dark:bg-[#1C1D20]">
                            <Image 
                              src="/img/image1.1.png" 
                              alt="Angelito's Avatar" 
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          {/* Online Indicator Badge */}
                          <span className="absolute bottom-0.5 right-0.5 block h-3.5 w-3.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-[#111111]"></span>
                        </div>
                        
                        <div>
                          <h4 className="text-base font-bold text-[#1C1D20] dark:text-[#ededed]">
                            Hi! I&apos;m Thirdy&apos;s AI
                          </h4>
                          <p className="mt-1 text-xs text-[#999D9E] max-w-50">
                            Ask me anything about his projects, skills, or portfolio.
                          </p>
                        </div>
                      </div>
                      
                      {/* Enhanced Suggestion Pills */}
                      <div className="flex flex-col gap-2.5 w-full px-1">
                        {suggestedPrompts.map((prompt, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            onClick={() => handleSuggestionClick(prompt)}
                            className="group relative flex items-center justify-between w-full p-3.5 text-xs text-left rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111111] hover:border-[#8B5CF6] hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all duration-300 text-[#1C1D20] dark:text-[#ededed] shadow-sm hover:shadow-md"
                          >
                            <span className="font-medium">{prompt}</span>
                            <ArrowRight 
                              size={14} 
                              className="text-[#999D9E] group-hover:text-[#8B5CF6] group-hover:translate-x-1 transition-all duration-300" 
                            />
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl flex gap-3 shadow-sm ${
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
                            className="w-6 h-6 rounded-full mt-0.5 shrink-0 object-cover shadow-sm border border-black dark:border-white/20 bg-white dark:bg-[#111111]" 
                          />
                        )}

                        <p className="leading-relaxed whitespace-pre-wrap">{getMessageText(m)}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-[#F4F4F4] dark:bg-[#1C1D20] p-3 rounded-2xl rounded-bl-sm border border-black/5 dark:border-white/5 flex gap-1 items-center shadow-sm">
                        <span className="w-1.5 h-1.5 bg-[#999D9E] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-[#999D9E] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-[#999D9E] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-1" />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-black/10 dark:border-white/10 bg-[#F4F4F4] dark:bg-[#1C1D20] shrink-0">
                  <div className="relative flex items-center shadow-sm rounded-full bg-white dark:bg-[#111111]">
                    <input
                      value={input} 
                      onChange={handleInputChange} 
                      placeholder="Type a message..."
                      className="w-full bg-transparent text-[#1C1D20] dark:text-[#ededed] border border-black/10 dark:border-white/10 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
                    />
                    <button 
                      type="submit" 
                      disabled={isLoading || !input.trim()} 
                      className="absolute right-2 p-2 bg-[#8B5CF6] text-white rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                      aria-label="Send message"
                    >
                      <Send size={16} className="ml-0.5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Button */}
          <Magnetic>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-14 h-14 bg-[#1C1D20] dark:bg-white text-white dark:text-[#1C1D20] rounded-full flex items-center justify-center shadow-2xl transition-all"
              aria-label="Toggle chat"
            >
              {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}