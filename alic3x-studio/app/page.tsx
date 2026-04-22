"use client";

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState('');
  const isLoading = status === 'submitted' || status === 'streaming';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });
    setInput('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-1 h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col hidden md:flex animate-fade-up relative">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-[var(--mx-cyan)] to-[var(--mx-purple)] bg-clip-text text-transparent">
            Alic3X PRO
          </h1>
          <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">Studio Collaborator</p>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Recent Sessions</div>
          {/* Placeholder for history */}
          <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer text-sm text-white/80">
            Lyrical Analysis
          </div>
          <div className="p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-sm text-white/50">
            Beat Production
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex flex-1 flex-col relative animate-fade-up" style={{ animationDelay: '0.1s' }}>
        {/* Holographic Header */}
        <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center px-6 justify-between shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--mx-cyan)] to-transparent opacity-10 animate-gradient-x"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-2 h-2 rounded-full bg-[var(--mx-green)] animate-pulse shadow-[0_0_10px_var(--mx-green)]"></div>
            <span className="text-sm font-medium">Session Active</span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center mt-32 space-y-4 animate-float">
                <div className="w-24 h-24 rounded-full border border-white/20 bg-gradient-to-br from-[var(--mx-cyan)]/20 to-[var(--mx-purple)]/20 backdrop-blur flex items-center justify-center shadow-[0_0_30px_rgba(0,234,255,0.2)]">
                  <span className="text-4xl">A3X</span>
                </div>
                <h2 className="text-xl font-medium text-white/80">What are we creating today?</h2>
                <p className="text-white/40 max-w-sm text-sm">
                  Write lyrics, analyze beats, or brainstorm concepts. I am your AI co-producer.
                </p>
              </div>
            )}
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 shadow-lg backdrop-blur-sm ${
                  m.role === 'user' 
                    ? 'bg-white/10 text-white border border-white/20' 
                    : 'bg-gradient-to-br from-[var(--mx-cyan)]/10 to-[var(--mx-purple)]/10 border border-[var(--mx-cyan)]/30 text-white/90'
                }`}>
                  <div className="text-xs opacity-50 mb-1 uppercase tracking-wider">
                    {m.role === 'user' ? 'You' : 'Alic3X'}
                  </div>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {m.parts?.map((part, i) => part.type === 'text' ? <span key={i}>{part.text}</span> : null)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gradient-to-t from-black to-transparent shrink-0">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--mx-cyan)] to-[var(--mx-purple)] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center">
                <input
                  className="w-full bg-black/60 border border-white/20 text-white placeholder-white/40 rounded-2xl px-6 py-4 outline-none focus:border-[var(--mx-cyan)]/50 focus:ring-1 focus:ring-[var(--mx-cyan)]/50 backdrop-blur-xl transition-all"
                  value={input}
                  placeholder="Drop some bars, ideas, or questions..."
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors disabled:opacity-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--mx-cyan)]">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </form>
            <div className="text-center mt-3 text-xs text-white/30">
              Alic3X PRO powered by Grok • AI generated content may be inaccurate
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
