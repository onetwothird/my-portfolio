"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { isTextUIPart } from "ai";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MessageSquare, X, Send, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Magnetic from "./Magnetic";
import ReactMarkdown from "react-markdown";

// Extracts the plain-text content of a message from its parts.
function getMessageText(m: UIMessage) {
  return m.parts
    .filter(isTextUIPart)
    .map((p) => p.text)
    .join("");
}

// Reveals `fullText` a few characters at a time to create a typewriter effect.
// Speeds up automatically when the backlog grows (e.g. a big chunk arrives at
// once) so long replies never look like they're lagging behind the stream.
function useTypewriter(fullText: string, active: boolean, speed = 18) {
  const [revealedLength, setRevealedLength] = useState(0);
  const fullTextRef = useRef(fullText);

  // Keep the ref in sync with the latest text. This only ever happens in an
  // effect, never during render.
  useEffect(() => {
    fullTextRef.current = fullText;
  }, [fullText]);

  useEffect(() => {
    if (!active) return;

    const id = setInterval(() => {
      setRevealedLength((prev) => {
        const target = fullTextRef.current;
        if (prev >= target.length) return prev;

        const backlog = target.length - prev;
        const step = backlog > 60 ? 4 : backlog > 20 ? 2 : 1;

        return Math.min(target.length, prev + step);
      });
    }, speed);

    return () => clearInterval(id);
  }, [active, speed]);

  // Messages that don't animate (e.g. from the user) just show their full
  // text immediately — no state needed for that case.
  if (!active) return fullText;

  return fullText.slice(0, revealedLength);
}

function ChatBubble({
  message,
  isStreaming,
}: {
  message: UIMessage;
  isStreaming: boolean;
}) {
  const isUser = message.role === "user";
  const fullText = getMessageText(message);
  const typedText = useTypewriter(fullText, !isUser);
  const displayText = isUser ? fullText : typedText;
  
  // Show cursor if it's the AI, and it's either actively streaming or still typing out
  const showCursor = !isUser && (isStreaming || typedText.length < fullText.length);
  
  // Append a block character for the cursor so it stays perfectly inline with the Markdown
  const textWithCursor = displayText + (showCursor ? " ▍" : "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] p-3 rounded-2xl flex gap-3 shadow-sm ${
          isUser
            ? "bg-[#1C1D20] dark:bg-white text-white dark:text-[#1C1D20] rounded-br-sm"
            : "bg-[#F4F4F4] dark:bg-[#1C1D20] text-[#1C1D20] dark:text-[#ededed] rounded-bl-sm border border-black/5 dark:border-white/5"
        }`}
      >
        {!isUser && (
          <Image
            src="/img/image1.1.png"
            alt="Thirdy AI"
            width={24}
            height={24}
            className="w-6 h-6 rounded-full mt-0.5 shrink-0 object-cover shadow-sm border border-black/10 dark:border-white/20 bg-white dark:bg-[#111111]"
          />
        )}

        <div className="flex-1 overflow-hidden">
          {isUser ? (
            <p className="leading-relaxed whitespace-pre-wrap">{displayText}</p>
          ) : (
            <div className="text-sm space-y-2 wrap-break-word">
              <ReactMarkdown
                components={{
                  // Custom styling for the Markdown elements
                  ul: ({ children }) => <ul className="list-disc ml-5 space-y-1 my-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal ml-5 space-y-1 my-2">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  strong: ({ children }) => <strong className="font-bold text-black dark:text-white">{children}</strong>,
                  p: ({ children }) => <p className="leading-relaxed whitespace-pre-wrap mb-2 last:mb-0">{children}</p>,
                }}
              >
                {textWithCursor}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-start"
    >
      <div className="bg-[#F4F4F4] dark:bg-[#1C1D20] px-4 py-3.5 rounded-2xl rounded-bl-sm border border-black/5 dark:border-white/5 flex gap-3 items-center shadow-sm w-fit">
        <Image
          src="/img/image1.1.png"
          alt="Thirdy AI"
          width={24}
          height={24}
          className="w-6 h-6 rounded-full shrink-0 object-cover shadow-sm border border-black/10 dark:border-white/20 bg-white dark:bg-[#111111]"
        />
        <div className="flex gap-1.5 items-center px-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#1C1D20] dark:bg-[#ededed]"
              animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showChatbot, setShowChatbot] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);

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
  }, [messages, isLoading]);

  useEffect(() => {
    const footer = document.getElementById("contact");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverFooter(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleSuggestionClick = (text: string) => {
    if (isLoading) return;
    sendMessage({ text });
  };

  // Show the "Thinking..." indicator only while waiting for the first chunk
  // of the response, i.e. the last message is still the user's.
  const isThinking =
    isLoading && messages.length > 0 && messages[messages.length - 1].role === "user";

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
                className="absolute bottom-20 right-0 w-[90vw] md:w-96 h-124 max-h-[80vh] bg-white dark:bg-[#111111] border border-black/10 dark:border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b border-black/10 dark:border-white/10 flex justify-between items-center bg-[#F4F4F4] dark:bg-[#1C1D20] rounded-t-2xl shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1C1D20] dark:bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1C1D20] dark:bg-white"></span>
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
                <div
                  data-lenis-prevent="true"
                  className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-medium scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-800"
                >
                  {/* Welcome Screen (Empty State) */}
                  <AnimatePresence>
                    {messages.length === 0 && (
                      <motion.div
                        key="welcome"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center mt-4 space-y-6"
                      >
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

                        {/* Suggested Prompts */}
                        <div className="flex flex-col gap-2.5 w-full px-1">
                          {suggestedPrompts.map((prompt, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.1 }}
                              onClick={() => handleSuggestionClick(prompt)}
                              className="group relative flex items-center justify-between w-full p-3.5 text-xs text-left rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111111] hover:border-black/30 dark:hover:border-white/30 hover:bg-black/2 dark:hover:bg-white/5 transition-all duration-300 text-[#1C1D20] dark:text-[#ededed] shadow-sm hover:shadow-md"
                            >
                              <span className="font-medium">{prompt}</span>
                              <ArrowRight
                                size={14}
                                className="text-[#999D9E] group-hover:text-[#1C1D20] dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                              />
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message Bubbles */}
                  {messages.map((m, index) => {
                    const isLastMessage = index === messages.length - 1;
                    const isStreaming = isLoading && m.role === "assistant" && isLastMessage;

                    return <ChatBubble key={m.id} message={m} isStreaming={isStreaming} />;
                  })}

                  {/* Thinking Animation State */}
                  <AnimatePresence>{isThinking && <ThinkingIndicator />}</AnimatePresence>

                  <div ref={messagesEndRef} className="h-1" />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-black/10 dark:border-white/10 bg-[#F4F4F4] dark:bg-[#1C1D20] shrink-0">
                  <div className="relative flex items-center shadow-sm rounded-full bg-white dark:bg-[#111111]">
                    <input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Type a message..."
                      className="w-full bg-transparent text-[#1C1D20] dark:text-[#ededed] border border-black/10 dark:border-white/10 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="absolute right-2 p-2 bg-[#1C1D20] dark:bg-white text-white dark:text-[#1C1D20] rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} className="ml-0.5" />
                      )}
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
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                isOverFooter
                  ? "bg-white text-[#1C1D20]" 
                  : "bg-[#1C1D20] dark:bg-white text-white dark:text-[#1C1D20]" 
              }`}
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