import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AILearningMentor: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Hello! I am your AI Learning Mentor. Ask me anything about data structures, time complexity, invariants, or interview edge cases!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine current page context
  const getContextName = (): string => {
    const path = location.pathname;
    if (path.includes('visualizer')) return 'Interactive Visualizer';
    if (path.includes('notes')) return 'DSA Study Notes';
    if (path.includes('quiz')) return 'Quiz Assessment';
    if (path.includes('algorithms')) return 'DSA Roadmap';
    return 'Dashboard Learning Center';
  };

  const contextName = getContextName();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputQuery.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // AI Context-aware intelligent response generation
    setTimeout(() => {
      let aiResponseText = `Based on your current context (${contextName}):\n\n`;

      const qLower = text.toLowerCase();
      if (qLower.includes('complexity') || qLower.includes('time') || qLower.includes('space')) {
        aiResponseText += `• **Time Complexity**: Optimal O(N log N) for comparison sorts, O(V + E) for Graph BFS/DFS.\n• **Space Complexity**: O(V) for recursion stack or queue auxiliary memory.\n• **Interview Tip**: Always state best, average, and worst-case scenarios upfront!`;
      } else if (qLower.includes('edge case') || qLower.includes('pitfall') || qLower.includes('mistake')) {
        aiResponseText += `• **Common Edge Cases**:\n 1. Empty arrays / Single element\n 2. Duplicate entries\n 3. Integer overflow (use \`long\` or \`BigInt\`)\n 4. Disconnected graph components / Cycles`;
      } else if (qLower.includes('dry run') || qLower.includes('invariant') || qLower.includes('step')) {
        aiResponseText += `• **Loop Invariant**: At index \`i\`, the subarray \`[0...i-1]\` is guaranteed to be sorted.\n• **Dry Run Tip**: Use two pointers (\`left\` and \`right\`) to track boundaries step-by-step.`;
      } else {
        aiResponseText += `Great question! In ${contextName}, mastering pattern recognition (Two Pointers, Sliding Window, Monotonic Stack, BFS/DFS, DP) is key to acing technical rounds at Google, Amazon, and Microsoft. Let me know if you need code snippets or dry-run steps!`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-90 sm:w-96 glass-strong rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/30 bg-[#0d1117]/95 flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-indigo-950 via-purple-950 to-[#0d1117] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white flex items-center gap-1.5 font-mono">
                    AI Learning Mentor
                  </h3>
                  <p className="text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Context: {contextName}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Chips */}
            <div className="px-3 py-2 bg-black/40 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { label: 'Complexity', query: 'Explain Time & Space Complexity' },
                { label: 'Edge Cases', query: 'What are common edge cases?' },
                { label: 'Invariants', query: 'Explain loop invariants & dry run' },
                { label: 'Interview Tips', query: 'Top interview tips for this topic' },
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(chip.query)}
                  className="px-2.5 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 hover:bg-indigo-500/20 text-[10px] font-mono font-bold whitespace-nowrap transition-all cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`p-3 rounded-2xl text-xs max-w-[80%] space-y-1 ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white font-medium'
                        : 'bg-white/[0.04] border border-white/10 text-slate-200 leading-relaxed whitespace-pre-wrap'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div
                      className={`text-[9px] font-mono text-right ${
                        msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono italic">
                  <Bot className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  AI Mentor is analyzing context...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-white/10 bg-white/[0.02]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask AI Mentor anything..."
                  className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-2xl flex items-center justify-center cursor-pointer border border-white/20 hover:shadow-indigo-500/40 relative group"
        title="Open AI Learning Mentor"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0d1117] animate-ping" />
      </motion.button>
    </div>
  );
};

export default AILearningMentor;
