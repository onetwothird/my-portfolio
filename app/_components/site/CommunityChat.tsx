"use client";

import { FormEvent, useEffect, useState } from 'react';
import { MessageCircle, Send, UsersRound, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSound } from '../shared/SoundProvider';

type CommunityMessage = {
  id: string;
  nickname: string;
  avatarStyle?: string;
  content: string;
  createdAt: string;
};

const AVATAR_STYLES = [
  { id: 'notionists', label: 'Ink' },
  { id: 'adventurer', label: 'Sketch' },
  { id: 'lorelei', label: 'Line' },
  { id: 'bottts', label: 'Pixel' },
  { id: 'avataaars', label: 'Friendly' },
] as const;

function getAvatarUrl(nickname: string, avatarStyle = 'notionists') {
  return `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${encodeURIComponent(nickname)}&backgroundColor=f4f4f4`;
}

function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export default function CommunityChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [nickname, setNickname] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [avatarStyle, setAvatarStyle] = useState('notionists');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const { playHover, playClick } = useSound();

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/community-chat', { cache: 'no-store' });
      if (!response.ok) throw new Error('Unable to load messages');
      const data = (await response.json()) as { messages: CommunityMessage[] };
      setMessages(data.messages);
      setError('');
    } catch {
      setError('Chat is taking a short break.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedNickname = window.localStorage.getItem('communityNickname');
    if (savedNickname) {
      // Hydrate the client-only nickname after the browser storage is available.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNickname(savedNickname);
      setNicknameInput(savedNickname);
    }
    const savedAvatarStyle = window.localStorage.getItem('communityAvatarStyle');
    if (savedAvatarStyle && AVATAR_STYLES.some((avatar) => avatar.id === savedAvatarStyle)) {
      setAvatarStyle(savedAvatarStyle);
    }
    void loadMessages();
    const interval = window.setInterval(() => void loadMessages(), 12000);
    return () => window.clearInterval(interval);
  }, []);

  const saveNickname = (event: FormEvent) => {
    event.preventDefault();
    const cleanNickname = nicknameInput.trim().replace(/\s+/g, ' ').slice(0, 24);
    if (!cleanNickname) return;

    window.localStorage.setItem('communityNickname', cleanNickname);
    window.localStorage.setItem('communityAvatarStyle', avatarStyle);
    setNickname(cleanNickname);
    setNicknameInput(cleanNickname);
    setError('');
    playClick();
  };

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    const content = messageInput.trim();
    if (!nickname || !content || sending) return;

    setSending(true);
    setError('');
    try {
      const response = await fetch('/api/community-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, avatarStyle, content }),
      });
      const data = (await response.json()) as { message?: CommunityMessage; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error || 'Unable to send message');

      setMessages((currentMessages) => [...currentMessages, data.message as CommunityMessage].slice(-40));
      setMessageInput('');
      playClick();
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Unable to send message.');
    } finally {
      setSending(false);
    }
  };

  const visibleAvatars = messages.slice(-3);

  return (
    <div className="fixed bottom-6 left-6 md:bottom-12 md:left-12 z-100">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-20 left-0 flex w-[calc(100vw-3rem)] max-w-sm h-120 max-h-[78vh] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/95"
          >
            <header className="flex items-center justify-between border-b border-black/10 bg-[#F4F4F4]/90 p-4 dark:border-white/10 dark:bg-[#1C1D20]/90">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1C1D20] opacity-60 dark:bg-white" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#1C1D20] dark:bg-white" />
                </span>
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#1C1D20] dark:text-white">Community chat</h2>
                  <p className="mt-1 text-[10px] text-[#999D9E]">A small room for curious people.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { playClick(); setIsOpen(false); }}
                onMouseEnter={playHover}
                className="rounded-full p-1 text-[#999D9E] transition-colors hover:bg-black/5 hover:text-[#1C1D20] dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Close community chat"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </header>

            {!nickname ? (
              <form onSubmit={saveNickname} className="flex min-h-0 flex-1 flex-col justify-center gap-5 overflow-y-auto p-6 pb-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1C1D20] text-white shadow-lg dark:bg-white dark:text-[#1C1D20]">
                  <UsersRound size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1C1D20] dark:text-white">Choose a nickname</h3>
                  <p className="mx-auto mt-2 max-w-65 text-xs leading-relaxed text-[#999D9E]">Pick how you want to appear in the room. You can change it anytime on this device.</p>
                </div>
                <div className="flex justify-center gap-2">
                  {AVATAR_STYLES.map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => { setAvatarStyle(avatar.id); playClick(); }}
                      onMouseEnter={playHover}
                      className={`h-11 w-11 overflow-hidden rounded-full border-2 bg-white transition-transform hover:scale-105 dark:bg-[#1C1D20] ${avatarStyle === avatar.id ? 'border-[#1C1D20] ring-2 ring-black/10 dark:border-white dark:ring-white/10' : 'border-black/10 dark:border-white/10'}`}
                      aria-label={`Choose ${avatar.label} avatar`}
                      aria-pressed={avatarStyle === avatar.id}
                    >
                      <Image src={getAvatarUrl(nicknameInput || 'visitor', avatar.id)} alt="" width={44} height={44} className="h-full w-full" />
                    </button>
                  ))}
                </div>
                <input
                  value={nicknameInput}
                  onChange={(event) => setNicknameInput(event.target.value)}
                  maxLength={24}
                  autoComplete="nickname"
                  placeholder="e.g. curious-builder"
                  className="w-full rounded-full border border-black/10 bg-white px-4 py-3 text-sm text-[#1C1D20] outline-none transition-colors placeholder:text-[#999D9E] focus:border-black/40 dark:border-white/10 dark:bg-[#1C1D20] dark:text-white dark:focus:border-white/40"
                />
                <button type="submit" className="w-full rounded-full bg-[#1C1D20] px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-transform hover:scale-[1.02] dark:bg-white dark:text-[#1C1D20]">Enter room</button>
              </form>
            ) : (
              <>
                <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10">
                  {loading ? (
                    <p className="py-10 text-center text-xs text-[#999D9E]">Opening the room...</p>
                  ) : messages.length === 0 ? (
                    <div className="flex h-full min-h-70 flex-col items-center justify-center text-center">
                      <MessageCircle size={28} strokeWidth={1.3} className="text-[#999D9E]" />
                      <p className="mt-3 text-sm font-medium text-[#1C1D20] dark:text-white">The room is quiet.</p>
                      <p className="mt-1 text-xs text-[#999D9E]">Start the first conversation.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <article key={message.id} className="flex gap-3">
                          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-black/10 bg-white dark:border-white/10 dark:bg-[#1C1D20]">
                            <Image src={getAvatarUrl(message.nickname, message.avatarStyle)} alt={`${message.nickname} avatar`} width={32} height={32} className="h-full w-full" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="truncate text-xs font-semibold text-[#1C1D20] dark:text-white">{message.nickname}</span>
                              <time className="shrink-0 text-[10px] text-[#999D9E]">{formatTime(message.createdAt)}</time>
                            </div>
                            <p className="mt-1 wrap-break-word text-sm leading-relaxed text-[#55565A] dark:text-[#C8C8C8]">{message.content}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-black/10 bg-[#F4F4F4]/90 p-3 dark:border-white/10 dark:bg-[#1C1D20]/90">
                  {error && <p className="mb-2 px-2 text-[10px] text-red-500">{error}</p>}
                  <form onSubmit={sendMessage} className="relative flex items-center">
                    <input
                      value={messageInput}
                      onChange={(event) => setMessageInput(event.target.value)}
                      maxLength={280}
                      placeholder={`Message as ${nickname}`}
                      className="w-full rounded-full border border-black/10 bg-white py-3 pl-4 pr-12 text-sm text-[#1C1D20] outline-none transition-colors placeholder:text-[#999D9E] focus:border-black/30 dark:border-white/10 dark:bg-[#111111] dark:text-white dark:focus:border-white/30"
                    />
                    <button type="submit" disabled={sending || !messageInput.trim()} className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#1C1D20] text-white transition-transform hover:scale-105 disabled:opacity-40 dark:bg-white dark:text-[#1C1D20]" aria-label="Send community message">
                      <Send size={15} className="ml-0.5" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => { playClick(); setIsOpen((open) => !open); }}
        onMouseEnter={playHover}
        className="group flex items-center gap-2 rounded-full border border-white/40 bg-[#ababab]/90 px-3 py-2 text-white shadow-xl backdrop-blur-md transition-transform hover:scale-[1.03] dark:border-white/20 dark:bg-[#1C1D20]/90"
        aria-label="Open community chat"
      >
        <div className="flex -space-x-2">
          {visibleAvatars.length > 0 ? visibleAvatars.map((message, index) => (
            <span key={message.id} className="h-7 w-7 overflow-hidden rounded-full border-2 border-white/70 bg-white dark:border-[#1C1D20]" style={{ zIndex: 3 - index }}>
              <Image src={getAvatarUrl(message.nickname, message.avatarStyle)} alt="" width={28} height={28} className="h-full w-full" />
            </span>
          )) : (
            <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/70 bg-[#1C1D20] text-white dark:border-[#1C1D20]"><UsersRound size={13} /></span>
          )}
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-xs font-bold">{messages.length} {messages.length === 1 ? 'message' : 'messages'}</span>
          <span className="mt-1 text-[10px] text-white/70">community chat</span>
        </div>
        <MessageCircle size={16} className="ml-1 opacity-70 transition-opacity group-hover:opacity-100" />
      </button>
    </div>
  );
}
